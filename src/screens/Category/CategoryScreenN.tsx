import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Pressable,
  Text,
  VStack,
  Image,
  ScrollView,
  Center,
} from 'native-base';
import {Dimensions, View, ImageBackground} from 'react-native';
import {RootBottomTabScreenProps} from '../../navigation/types';
import {HomeHeader} from '../Home/components/HomeHeader';
import {getAllCategories} from '../../QueryStore/Services/Home';
import {useFocusEffect} from '@react-navigation/native';
import FullScreenLoader from '../../components/FullScreenLoader';

type Props = RootBottomTabScreenProps<'Category'>;

const WIDTH = Dimensions.get('screen').width;

export const CategoryScreenN: FC<Props> = ({navigation}: any) => {
  const [categoryList, setCategoryList]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const [expandedParentId, setExpandedParentId] = useState<number | null>(null);
  const [expandedCategotyId, setExpandedCategoryId] = useState<number | null>(
    null,
  );
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setLoading(true);
    getAllCategories()
      .then((res: any) => {
        setCategoryList(res.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useFocusEffect(
    useCallback(() => {
      setExpandedParentId(null);
    }, []),
  );

  const parentCategories = useMemo(
    () => categoryList.filter((c: any) => c.parent === 0),
    [categoryList],
  );

  const getChildren = useCallback(
    (parentId: number) =>
      categoryList.filter((c: any) => c.parent === parentId),
    [categoryList],
  );

  const scrollToParent = (index: number) => {
    scrollRef.current?.scrollTo({
      y: index * 150,
      animated: true,
    });
  };

  const renderCategoryTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 12, paddingVertical: 10}}>
      {parentCategories.map((cat: any, index: number) => {
        const isActive = expandedCategotyId === cat.id;
        return (
          <Pressable
            key={cat.id}
            onPress={() => {
              setExpandedCategoryId(cat.id);
              scrollToParent(index);
            }}
            style={{
              height: 50,
              borderWidth: 1,
              borderColor: isActive ? '#7a2b2b' : '#ddd',
              backgroundColor: isActive ? '#fff2f2' : '#fff',
              borderRadius: 24,
              paddingHorizontal: 18,
              paddingVertical: 10,
              marginRight: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              fontSize="md"
              fontWeight="600"
              color={isActive ? '#7a2b2b' : '#333'}>
              {cat.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );

  // Beige card UI like in screenshot
  const renderParentCard = (parent: any, index: number) => {
    const children = getChildren(parent.id);
    const isOpen = expandedParentId === parent.id;

    return (
      <VStack key={parent.id} mb={5} mx={3}>
        <Pressable
          onPress={() => setExpandedParentId(isOpen ? null : parent.id)}>
          <Box
            position="relative"
            bg="#d8c7ae"
            borderRadius={20}
            overflow="hidden"
            height={120}
            justifyContent="center">
            <Text
              position="absolute"
              left={5}
              fontSize="xl"
              fontWeight="700"
              color="#111">
              {parent.name}
            </Text>

            {/* Image merged on right */}
            {parent?.image?.src && (
              <Image
                source={
                  parent?.image?.src
                    ? {uri: parent.image.src}
                    : {uri: 'https://via.placeholder.com/150'}
                }
                alt={parent.name}
                position="absolute"
                right={0}
                top={0}
                bottom={0}
                width="35%"
                resizeMode="cover"
              />
            )}
          </Box>
        </Pressable>

        {isOpen && children?.length > 0 && (
          <Box
            mt={3}
            bg="white"
            borderRadius={16}
            borderWidth={1}
            borderColor="#e6cccc"
            p={3}
            shadow={1}>
            <FlatList
              data={children}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
              keyExtractor={(it: any) => `child-${it.id}`}
              renderItem={({item}: any) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('ChildCategory', {
                      categoryId: item.id,
                      categoryName: item.name,
                    })
                  }
                  style={{
                    width: (WIDTH - 56) / 2,
                    borderRadius: 12,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderColor: '#f0e8e5',
                  }}>
                  <VStack>
                    <Box height={110}>
                      <Image
                        source={
                          item?.image?.src
                            ? {uri: item.image.src}
                            : {uri: 'https://via.placeholder.com/300'}
                        }
                        alt={item.name}
                        width="100%"
                        height="100%"
                        resizeMode="cover"
                      />
                    </Box>
                    <Box p={3}>
                      <Text
                        fontSize="md"
                        fontWeight="600"
                        color="#7a2b2b"
                        textAlign="center">
                        {item.name}
                      </Text>
                    </Box>
                  </VStack>
                </Pressable>
              )}
            />
          </Box>
        )}
      </VStack>
    );
  };

  return (
    <Box bg="white" flex={1}>
      <HomeHeader />
      {renderCategoryTabs()}
      {loading && <FullScreenLoader />}
      <ScrollView ref={scrollRef}>
        <VStack mt={4} pb={20}>
          {parentCategories.length === 0 ? (
            <Center my={10}>
              <Text>Loading categories...</Text>
            </Center>
          ) : (
            parentCategories.map((p: any, idx: number) =>
              renderParentCard(p, idx),
            )
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};
