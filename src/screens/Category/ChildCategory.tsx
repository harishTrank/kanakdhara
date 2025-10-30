import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  VStack,
  HStack,
  Text,
  Image,
  Pressable,
  Center,
} from 'native-base';
import {Dimensions} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types'; // adjust if your navigator naming differs
import {useCategoeryProduct} from '../../hooksQuery/Home/query';
import {
  allProducts,
  getChildCategoryProducts,
  getSingleProduct,
} from '../../QueryStore/Services/Home';
import FullScreenLoader from '../../components/FullScreenLoader';

type Props = RootStackScreenProps<'ProductPage'>;

const WIDTH = Dimensions.get('screen').width;

export const ChildCategory: FC<Props> = ({navigation, route}: any) => {
  const {categoryId, categoryName} = route.params || {};
  const [loading, setLoading]: any = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    getChildCategoryProducts({
      query: {category_id: categoryId},
    })
      .then((res: any) => {
        setProducts(res?.products || []);
      })
      .catch((err: any) => {
        console.log('Child category product err', err);
        setProducts([]); // prevent undefined
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  const handleProductDetailNavigation = (itemId: any) => {
    setLoading(true);
    getSingleProduct({
      body: {
        include: itemId,
      },
      query: {
        id: itemId,
      },
    })
      .then((res: any) => {
        navigation.navigate('ProductDetail', {item: res?.data});
      })
      .catch((err: any) => console.log('err', err))
      .finally(() => setLoading(false));
  };

  const renderProductCard = ({item}: any) => {
    return (
      <Pressable
        onPress={() => handleProductDetailNavigation(item?.id)}
        style={{
          width: (WIDTH - 48) / 2,
          marginBottom: 14,
          borderRadius: 12,
          overflow: 'hidden',
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#f2eaea',
        }}>
        <VStack>
          <Box height={140}>
            <Image
              source={
                item?.image
                  ? {uri: item.image}
                  : {uri: 'https://via.placeholder.com/300'}
              }
              alt={item.name}
              width="100%"
              height="100%"
              resizeMode="cover"
            />
          </Box>

          <Box p={3}>
            <Text fontSize="md" fontWeight="600" numberOfLines={2}>
              {item.name}
            </Text>
            <Text mt={2} fontWeight="700" color="#7a2b2b">
              {item.price
                ? `₹ ${item.price}`
                : item.regular_price
                ? `₹ ${item.regular_price}`
                : 'View price'}
            </Text>
          </Box>
        </VStack>
      </Pressable>
    );
  };

  return (
    <Box bg="white" flex={1}>
      {loading && <FullScreenLoader />}
      <HStack
        alignItems="center"
        p={4}
        borderBottomWidth={1}
        borderColor="#eee">
        <Pressable onPress={() => navigation.goBack()}>
          <Text color="#555">Back</Text>
        </Pressable>
        <VStack ml={4}>
          <Text fontSize="lg" fontWeight="700">
            {categoryName}
          </Text>
          <Text fontSize="xs" color="#777">
            {products.length} items
          </Text>
        </VStack>
      </HStack>

      <Box p={3}>
        {products.length === 0 ? (
          <Center mt={20}>
            <Text>No products found for this category.</Text>
          </Center>
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={renderProductCard}
            keyExtractor={(p: any) => `${p.id}`}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Box>
    </Box>
  );
};
