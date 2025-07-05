import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Text,
  Pressable,
  Spinner,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {Colors} from '../../utils/Colors';
import {SortModal} from './components/SortModal';
import {CategoryModel} from './components/CategoryModel';
import {PriceRangeModal} from './components/PriceRangeModel';
import {FilterModal} from './components/FilterModal';
import {categoeryProduct} from '../../QueryStore/Services/Home';
import {useGetAllCategories} from '../../hooks/useGetAllCategories';
import FullScreenLoader from '../../components/FullScreenLoader';

// --- Best Practice: Define a type for your data structure ---
interface Product {
  id: number;
  name: string;
  images: {src: string}[];
  variationProduct: {price: string}[];
  // Add other properties as needed
}

type Props = RootStackScreenProps<'ProductPage'>;

export const ProductPageScreen: FC<Props> = ({route, navigation}: any) => {
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isPriceModalVisible, setPriceModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortValue, setSortValue] = useState<string>('default');
  const [categoryValue, setCategoryValue] = useState<any>(route.params?.itemId);
  const [priceRange, setPriceRange] = useState<{max: string; min: string}>({
    max: '',
    min: '',
  });

  const {categoryList} = useGetAllCategories();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (route.params?.itemId) {
      setCategoryValue(route.params.itemId);
    }
  }, [route.params?.itemId]);
  const fetchDataHandler = useCallback(() => {
    setIsLoading(true);
    let query: any = {
      category: categoryValue,
      per_page: 200,
      page: 1,
      sort: sortValue,
    };

    if (priceRange?.max && priceRange?.max !== "") {
      query.max_price = priceRange?.max;
    }
    if (priceRange?.min && priceRange?.min !== "") {
      query.min_price = priceRange?.min;
    }
    categoeryProduct({
      query,
    })
      .then((res: any) => {
        setProducts(res?.data || []);
      })
      .catch((err: any) => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryValue, sortValue, priceRange]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);
  const renderProductItem = useCallback(
    ({item}: {item: Product}) => {
      return (
        <Pressable
          w="32%"
          mb={2}
          onPress={() => navigation.navigate('ProductDetail', {item})}>
          <Box
            bg={'gray.100'}
            alignItems={'center'}
            justifyContent={'center'}
            p={3}
            borderRadius="md">
            <Image
              source={{uri: item?.images?.[0]?.src}}
              size={'md'}
              alt={item.name || 'Product Image'}
              resizeMode="contain"
            />
          </Box>
          <Text
            fontWeight={'500'}
            fontSize={'sm'}
            color={'black'}
            numberOfLines={1}
            mt={1}>
            {item?.name}
          </Text>
          <Text fontWeight={'400'} fontSize={'xs'} color={'black'}>
            {item?.variationProduct?.[0]?.price
              ? `₹${item.variationProduct[0].price}`
              : 'Price not available'}
          </Text>
        </Pressable>
      );
    },
    [navigation],
  );
  const ListHeader = () => {
    if (isLoading || products.length === 0) {
      return null;
    }
    const firstProduct = products[0];
    return (
      <Pressable
        mb={5}
        onPress={() =>
          navigation.navigate('ProductDetail', {item: firstProduct})
        }>
        <Image
          source={{uri: firstProduct?.images?.[0]?.src}}
          h={300}
          w={'100%'}
          alt={firstProduct.name || 'Product Image'}
          bg={'gray.100'}
          resizeMode={'contain'}
        />
        <Text
          fontWeight={'600'}
          fontSize={'md'}
          color={'black'}
          numberOfLines={1}
          mt={1}>
          {firstProduct?.name}
        </Text>
        <Text
          fontWeight={'500'}
          fontSize={'sm'}
          color={'black'}
          numberOfLines={1}>
          {firstProduct?.variationProduct?.[0]?.price
            ? `₹${firstProduct.variationProduct[0].price}`
            : ''}
        </Text>
      </Pressable>
    );
  };

  const ListEmpty = () => {
    if (isLoading) {
      return null;
    }
    return (
      <Box flex={1} alignItems="center" justifyContent="center" mt="40%">
        <Text fontWeight={'600'} fontSize={'md'} color={'gray.500'}>
          No products found in this category.
        </Text>
      </Box>
    );
  };

  return (
    <Box flex={1} bg={'white'}>
      <ScreenHeader heading={'Products'} />
      <FullScreenLoader loading={false} />

      <HStack
        alignItems={'center'}
        justifyContent={'space-around'}
        px={4}
        py={4}
        borderBottomWidth={1}
        borderBottomColor="gray.200">
        <Pressable onPress={() => setSortModalVisible(true)} hitSlop={10}>
          <HStack alignItems={'center'} space={1}>
            <Text fontWeight={'600'} fontSize={'sm'} color={Colors.textColor}>
              Sort
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </HStack>
        </Pressable>
        <Pressable onPress={() => setCategoryModalVisible(true)} hitSlop={10}>
          <HStack alignItems={'center'} space={1}>
            <Text fontWeight={'600'} fontSize={'sm'} color={Colors.textColor}>
              Category
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </HStack>
        </Pressable>
        <Pressable onPress={() => setPriceModalVisible(true)} hitSlop={10}>
          <HStack alignItems={'center'} space={1}>
            <Text fontWeight={'600'} fontSize={'sm'} color={Colors.textColor}>
              Price Range
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </HStack>
        </Pressable>
      </HStack>

      {isLoading && products.length === 0 ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <FlatList
          data={products.slice(1)}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          contentContainerStyle={{paddingHorizontal: 12, paddingTop: 12}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={ListEmpty}
          showsVerticalScrollIndicator={false}
        />
      )}

      <SortModal
        sort={isSortModalVisible}
        onCloseSort={() => setSortModalVisible(false)}
        sortValue={sortValue}
        setSortValue={setSortValue}
      />
      <CategoryModel
        category={isCategoryModalVisible}
        onCloseCategory={() => setCategoryModalVisible(false)}
        categoryValue={categoryValue}
        selectedCategory={setCategoryValue}
        categoryList={categoryList}
      />
      <PriceRangeModal
        price={isPriceModalVisible}
        onClosePrice={() => setPriceModalVisible(false)}
        setPriceRange={setPriceRange}
      />
    </Box>
  );
};
