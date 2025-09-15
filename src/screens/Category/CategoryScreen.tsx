import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import {Box, FlatList, HStack, Pressable, Text, VStack} from 'native-base';
import {Dimensions, View, NativeScrollEvent} from 'react-native';
import {RootBottomTabScreenProps} from '../../navigation/types';
import {HomeHeader} from '../Home/components/HomeHeader';
import {useCategoeryProduct} from '../../hooksQuery/Home/query';
import {TopSellingRenderItem} from '../Home/components/TopSellingListComponent';
import {getAllCategories} from '../../QueryStore/Services/Home';

type Props = RootBottomTabScreenProps<'Category'>;

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

// heights
const CATEGORY_HEADER_HEIGHT = 50;
const SUBCATEGORY_SECTION_HEIGHT = HEIGHT / 2;

export const CategoryScreen: FC<Props> = ({navigation, route}: any) => {
  const [categoryList, setCategoryList]: any = useState([]);
  const [buttonClickFlag, setButtonClickFlag]: any = useState(false);
  const [select, setSelect] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<
    number | null
  >(null);
  const refFlatList = useRef<any>(null);
  const isUserScroll = useRef(true);
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(
    null,
  );
  const leftFlatListRef = useRef<any>(null);

  const allCategoriesApi: any = useCategoeryProduct({
    query: {
      per_page: 250,
      page: 1,
      sort: 'default',
    },
  });

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getAllCategories()
        .then((res: any) => {
          setCategoryList(res.data);
          setButtonClickFlag(false);
        })
        .catch(() => {});
    });
  }, [navigation]);

  // build right list (category header + subcategories)
  const rightData = useMemo(() => {
    const result: any[] = [];
    const top = categoryList.filter((c: any) => c.parent === 0);
    top.forEach((cat: any) => {
      result.push({...cat, type: 'category'});
      const subs = categoryList.filter((c: any) => c.parent === cat.id);
      subs.forEach((sub: any) => {
        result.push({...sub, type: 'subcategory', parent: cat.id});
      });
    });
    return result;
  }, [categoryList]);

  // build left list
  const leftData = useMemo(() => {
    const result: any[] = [];
    const top = categoryList.filter((c: any) => c.parent === 0);
    top.forEach((cat: any) => {
      result.push({...cat, type: 'category'});
      if (expandedCategoryId === cat.id) {
        const subs = categoryList.filter((c: any) => c.parent === cat.id);
        subs.forEach((sub: any) => {
          result.push({...sub, type: 'subcategory'});
        });
      }
    });
    return result;
  }, [categoryList, expandedCategoryId]);

  /** real getItemLayout for right list */
  const getRightItemLayout = useCallback((data: any, index: number) => {
    const item = data[index];
    const length =
      item.type === 'category'
        ? CATEGORY_HEADER_HEIGHT
        : SUBCATEGORY_SECTION_HEIGHT;
    // compute offset up to index
    const offset = data
      .slice(0, index)
      .reduce(
        (sum: number, it: any) =>
          sum +
          (it.type === 'category'
            ? CATEGORY_HEADER_HEIGHT
            : SUBCATEGORY_SECTION_HEIGHT),
        0,
      );
    return {length, offset, index};
  }, []);

  /** scroll exactly to index on right list */
  const scrollToIndex = useCallback(
    (
      itemId: any,
      index: number,
      type: 'category' | 'subcategory' = 'category',
      parentId?: number,
    ) => {
      isUserScroll.current = false;
      setSelect(itemId);
      if (type === 'category') {
        setSelectedCategoryId(itemId);
        setSelectedSubcategoryId(null);
      } else {
        // subcategory clicked
        setSelectedCategoryId(parentId ?? null);
        setSelectedSubcategoryId(itemId);
      }

      if (refFlatList.current) {
        try {
          // compute offset manually to always get perfect scroll
          const offset = rightData
            .slice(0, index)
            .reduce(
              (sum: number, it: any) =>
                sum +
                (it.type === 'category'
                  ? CATEGORY_HEADER_HEIGHT
                  : SUBCATEGORY_SECTION_HEIGHT),
              0,
            );
          refFlatList.current.scrollToOffset({
            offset,
            animated: true,
          });
        } catch {}
      }

      setButtonClickFlag(true);
    },
    [rightData],
  );

  // auto-scroll to param id
  useEffect(() => {
    if (
      route.params?.itemid &&
      !allCategoriesApi?.isLoading &&
      !allCategoriesApi?.isFetching &&
      !buttonClickFlag
    ) {
      setTimeout(() => {
        const idx = rightData.findIndex(
          (cat: any) => cat.id === route.params?.itemid,
        );
        if (idx >= 0) {
          scrollToIndex(route.params?.itemid, idx);
        }
      }, 500);
    }
  }, [
    allCategoriesApi,
    route.params?.itemid,
    buttonClickFlag,
    rightData,
    scrollToIndex,
  ]);

  /** sync left list highlight while scrolling right list */
  const handleProductScroll = useCallback(
    (event: {nativeEvent: NativeScrollEvent}) => {
      if (!isUserScroll.current) return;
      const scrollY = event.nativeEvent.contentOffset.y;

      // find current index by cumulative height
      let cumulative = 0;
      let currentIndex = 0;
      for (let i = 0; i < rightData.length; i++) {
        const h =
          rightData[i].type === 'category'
            ? CATEGORY_HEADER_HEIGHT
            : SUBCATEGORY_SECTION_HEIGHT;
        if (scrollY < cumulative + h) {
          currentIndex = i;
          break;
        }
        cumulative += h;
      }

      const currentItem = rightData[currentIndex];
      if (!currentItem) return;

      if (currentItem.type === 'subcategory') {
        const parentId = currentItem.parent ?? null;
        setSelectedCategoryId(parentId);
        setSelectedSubcategoryId(currentItem.id);
        if (parentId && expandedCategoryId !== parentId) {
          setExpandedCategoryId(parentId);
          const topList = categoryList.filter((c: any) => c.parent === 0);
          const parentTopIndex = topList.findIndex(
            (t: any) => t.id === parentId,
          );
          if (parentTopIndex >= 0) {
            setTimeout(() => {
              leftFlatListRef.current?.scrollToIndex({
                index: parentTopIndex,
                animated: true,
                viewPosition: 0,
              });
            }, 80);
          }
        }
        if (select !== parentId) {
          setSelect(parentId);
          setSelectedCategoryId(parentId);
          setSelectedSubcategoryId(null);
        }
      } else {
        setSelectedCategoryId(currentItem.id);
        setSelectedSubcategoryId(null);
        if (expandedCategoryId !== currentItem.id) {
          setExpandedCategoryId(null);
        }
        const topList = categoryList.filter((c: any) => c.parent === 0);
        const topIndex = topList.findIndex((t: any) => t.id === currentItem.id);
        if (topIndex >= 0) {
          leftFlatListRef.current?.scrollToIndex({
            index: topIndex,
            animated: true,
            viewPosition: 0,
          });
        }
        if (select !== currentItem.id) {
          setSelect(currentItem.id);
        }
      }
    },
    [rightData, categoryList, select, expandedCategoryId],
  );

  /** left item */
  const renderLeftItem = ({item, index}: any) => {
    if (item.type === 'category') {
      const isSelected = selectedCategoryId === item.id;
      return (
        <Pressable
          onPress={() => {
            setExpandedCategoryId(prev => (prev === item.id ? null : item.id));
            const idx = rightData.findIndex(
              (r: any) => r.id === item.id && r.type === 'category',
            );
            if (idx >= 0) {
              scrollToIndex(item.id, idx, 'category');
            }
            leftFlatListRef.current?.scrollToIndex({
              index,
              animated: true,
              viewPosition: 0,
            });
          }}
          bg={isSelected ? '#dbeafe' : 'white'}
          borderRightColor={isSelected ? 'primary.400' : 'white'}
          borderRightWidth={isSelected ? 3 : 0}
          alignItems={'center'}
          mb={2}
          p={2}>
          <Text fontWeight="500" fontSize="sm" color="#4A4A4A">
            {item.name}
          </Text>
        </Pressable>
      );
    } else {
      const isSelected = selectedSubcategoryId === item.id;
      return (
        <Pressable
          onPress={() => {
            const idx = rightData.findIndex(
              (r: any) => r.id === item.id && r.type === 'subcategory',
            );
            if (idx >= 0) {
              const parentId =
                categoryList.find((c: any) => c.id === item.id)?.parent ??
                undefined;
              scrollToIndex(item.id, idx, 'subcategory', parentId);
            }
          }}
          bg={isSelected ? '#eef6ff' : '#fafafa'}
          borderLeftWidth={3}
          borderLeftColor={isSelected ? 'primary.400' : '#ddd'}
          alignItems={'flex-start'}
          mb={1}
          p={2}
          pl={5}>
          <Text fontSize="xs" color="#555">
            {item.name}
          </Text>
        </Pressable>
      );
    }
  };

  /** right item */
  const renderProductItem = ({item}: any) => {
    if (item.type === 'category') {
      return (
        <View
          style={{height: CATEGORY_HEADER_HEIGHT, justifyContent: 'center'}}>
          <HStack justifyContent={'space-between'}>
            <Text
              fontWeight={'700'}
              fontSize={'md'}
              color={'black'}
              textTransform={'capitalize'}>
              {item?.name}
            </Text>
          </HStack>
        </View>
      );
    } else {
      return (
        <View style={{height: SUBCATEGORY_SECTION_HEIGHT}}>
          <HStack justifyContent={'space-between'} my={3}>
            <Text
              fontWeight={'600'}
              fontSize={'sm'}
              color={'black'}
              textTransform={'capitalize'}>
              {item?.name}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('ProductPage', {itemId: item?.id})
              }>
              <Text
                fontWeight={'500'}
                fontSize={'sm'}
                color={'primary.400'}
                textDecorationLine={'underline'}>
                View All
              </Text>
            </Pressable>
          </HStack>

          <FlatList
            data={allCategoriesApi?.data?.data
              ?.filter((filterItem: any) =>
                filterItem?.categories?.some(
                  (someItem: any) =>
                    someItem?.name?.toLowerCase() === item?.name?.toLowerCase(),
                ),
              )
              ?.slice(0, 4)}
            renderItem={({item: p}: any) =>
              TopSellingRenderItem(p, navigation, HEIGHT * 0.13, WIDTH * 0.3)
            }
            numColumns={2}
            keyExtractor={(p: any) => `${p.id}${Math.random()}`}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={null}
          />
        </View>
      );
    }
  };

  return (
    <Box bg={'white'} flex={1}>
      <HomeHeader />
      <HStack w={'100%'} flex={1}>
        <Box
          bg={'white'}
          w={'30%'}
          h={HEIGHT}
          borderRightWidth={1}
          borderRightColor={'#f0f5f9'}>
          <FlatList
            ref={leftFlatListRef}
            data={leftData}
            renderItem={renderLeftItem}
            keyExtractor={(item: any, idx) => `${item.id}-${idx}`}
            showsVerticalScrollIndicator={false}
            getItemLayout={(data: any, index: any) => {
              const item = data[index];
              const length =
                item.type === 'category'
                  ? CATEGORY_HEADER_HEIGHT
                  : CATEGORY_HEADER_HEIGHT; // left list rows are small
              const offset = index * length;
              return {length, offset, index};
            }}
          />
        </Box>

        <VStack bg={'white'} w={'70%'} p={3}>
          <FlatList
            data={rightData}
            renderItem={renderProductItem}
            keyExtractor={(item: any, idx) => `${item.type}-${item.id}-${idx}`}
            showsVerticalScrollIndicator={false}
            getItemLayout={getRightItemLayout}
            ref={refFlatList}
            onScroll={handleProductScroll}
            scrollEventThrottle={16}
            onScrollBeginDrag={() => {
              isUserScroll.current = true;
            }}
            onMomentumScrollEnd={() => {
              isUserScroll.current = true;
            }}
          />
        </VStack>
      </HStack>
    </Box>
  );
};
