import React, {FC, useState, useEffect, useRef, useCallback} from 'react'; // Import useRef and useCallback
import {Box, FlatList, HStack, Pressable, Text, VStack} from 'native-base';
import {Dimensions, View, NativeScrollEvent} from 'react-native'; // Import NativeScrollEvent for typing

import {RootBottomTabScreenProps} from '../../navigation/types';
import {HomeHeader} from '../Home/components/HomeHeader';
import {useCategoeryProduct} from '../../hooksQuery/Home/query';
import {TopSellingRenderItem} from '../Home/components/TopSellingListComponent';
import {Colors} from '../../utils/Colors';
import {getAllCategories} from '../../QueryStore/Services/Home';

type Props = RootBottomTabScreenProps<'Category'>;

const HEIGHT = Dimensions.get('screen').height;
const WIDTH = Dimensions.get('screen').width;

export const CategoryScreen: FC<Props> = ({navigation, route}: any) => {
  const [categoryList, setCategoryList]: any = useState([]);
  const [buttonClickFlag, setButtonClickFlag]: any = useState(false);
  const [select, setSelect] = useState('');
  const [refFlatList, setRefFlatList]: any = useState(null);

  // --- NEW: Ref to track scroll type ---
  // This ref helps us know if the scroll was triggered by the user swiping
  // or by our code when a category is clicked.
  const isUserScroll = useRef(true);

  const allCategoriesApi: any = useCategoeryProduct({
    query: {
      per_page: 200,
      page: 1,
      sort: 'default',
    },
  });

  const scrollToIndex = (item: string, index: number) => {
    // --- MODIFIED: Set flag before programmatic scroll ---
    // When we scroll programmatically, we set this to false so the onScroll handler doesn't
    // try to update the selection while the animation is running.
    isUserScroll.current = false;

    setSelect(item);
    refFlatList.scrollToIndex({
      animated: true,
      index: index,
    });

    // Also update the buttonClickFlag for your existing logic
    setButtonClickFlag(true);
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getAllCategories()
        .then((res: any) => {
          setCategoryList(res.data);
          setButtonClickFlag(false);
        })
        .catch((err: any) => {});
    });
  }, [navigation]);

  useEffect(() => {
    if (
      route.params?.itemid &&
      !allCategoriesApi?.isLoading &&
      !allCategoriesApi?.isFetching &&
      !buttonClickFlag
    ) {
      setTimeout(() => {
        // Here we call the full scrollToIndex function to ensure the flags are set correctly
        scrollToIndex(route.params?.itemid, route.params?.index);
      }, 500);
    }
  }, [
    allCategoriesApi,
    route.params?.itemid,
    route.params?.index,
    buttonClickFlag,
  ]);

  // --- NEW: The scroll handler for the product list ---
  const handleProductScroll = useCallback(
    (event: {nativeEvent: NativeScrollEvent}) => {
      // If the scroll was not initiated by the user, ignore it.
      if (!isUserScroll.current) {
        return;
      }

      const scrollPosition = event.nativeEvent.contentOffset.y;
      const itemHeight = HEIGHT / 2; // This must match the length in getItemLayout

      // Use Math.round to select the item that is covering the most of the top of the screen
      const currentIndex = Math.round(scrollPosition / itemHeight);

      // Check if the calculated index is valid and different from the current selection
      if (
        categoryList[currentIndex] &&
        select !== categoryList[currentIndex].id
      ) {
        setSelect(categoryList[currentIndex].id);
      }
    },
    [categoryList, select], // Dependencies: re-create this function if these change
  );

  const renderItem = ({item, index}: any) => {
    return (
      <Pressable
        onPress={() => {
          // This now calls the modified scrollToIndex function
          scrollToIndex(item.id, index);
        }}
        bg={select === item.id ? '#f3f3f3' : 'white'}
        borderRightColor={select === item.id ? 'primary.400' : 'white'}
        borderRightWidth={select === item.id ? 2 : 0}
        alignItems={'center'}
        mb={2}
        p={2}
        mt={index === 0 ? 3 : 0}>
        <Text
          fontWeight={'500'}
          fontSize={'sm'}
          color={'#4A4A4A'}
          textTransform={'capitalize'}>
          {item.name}
        </Text>
      </Pressable>
    );
  };

  const renderProductItem = ({item, index}: any) => {
    return (
      <View style={{height: HEIGHT / 2}}>
        <HStack justifyContent={'space-between'} my={3}>
          <Text
            fontWeight={'600'}
            fontSize={'md'}
            color={'black'}
            textTransform={'capitalize'}>
            {/* Displaying the category name in the header */}
            {item?.name}
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('ProductPage', {itemId: item?.id});
            }}>
            <Text
              fontWeight={'500'}
              fontSize={'sm'}
              color={'primary.400'}
              textDecorationLine={'underline'}>
              View All{' '}
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
          renderItem={({item}: any) =>
            TopSellingRenderItem(item, navigation, HEIGHT * 0.13, WIDTH * 0.3)
          }
          numColumns={2}
          keyExtractor={(item: any) => `${item.id}${Math.random()}`}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  height: HEIGHT / 2.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.iconColor,
                    fontSize: 12,
                  }}>
                  There is no item in that category.
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  };
  return (
    <Box bg={'white'} flex={1}>
      <HomeHeader />
      <HStack w={'100%'}>
        <Box
          bg={'white'}
          w={'30%'}
          h={HEIGHT}
          borderRightWidth={1}
          borderRightColor={'#f0f5f9'}>
          <FlatList
            data={categoryList}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            style={{
              marginBottom: HEIGHT * 0.25,
            }}
          />
        </Box>
        <VStack bg={'white'} w={'70%'} p={3}>
          <Box mb={200}>
            <FlatList
              data={categoryList}
              renderItem={renderProductItem}
              keyExtractor={(item: any) => item.id}
              showsVerticalScrollIndicator={false}
              getItemLayout={(data, index) => ({
                length: HEIGHT / 2,
                offset: (HEIGHT / 2) * index,
                index,
              })}
              ref={setRefFlatList}
              // --- NEW: Attach scroll handlers to the product list ---
              onScroll={handleProductScroll}
              // This is crucial. It tells React Native to fire the onScroll event frequently.
              scrollEventThrottle={16}
              // When the user starts dragging, we know it's a user scroll.
              onScrollBeginDrag={() => {
                isUserScroll.current = true;
              }}
            />
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
};
