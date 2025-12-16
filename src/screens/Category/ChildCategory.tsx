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
  Input,
  Select,
} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types'; // adjust if your navigator naming differs
import {useCategoeryProduct} from '../../hooksQuery/Home/query';
import {
  allProducts,
  getChildCategoryProducts,
  getSingleProduct,
} from '../../QueryStore/Services/Home';
import FullScreenLoader from '../../components/FullScreenLoader';
import {Themes} from '../../utils/Colors';
import {Header} from '../../components/common/Header';

type Props = RootStackScreenProps<'ProductPage'>;

const WIDTH = Dimensions.get('screen').width;

export const ChildCategory: FC<Props> = ({navigation, route}: any) => {
  const {categoryId, categoryName} = route.params || {};
  const [loading, setLoading]: any = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters]: any = useState({
    purity: '',
    gender: '',
    min_price: '',
    max_price: '',
    sort: '',
    price_range: '',
  });

  useEffect(() => {
    setLoading(true);
    const query: any = {category_id: categoryId};

    if (filters.purity) query.purity = filters.purity;
    if (filters.gender) query.gender = filters.gender;
    if (filters.min_price) query.min_price = filters.min_price;
    if (filters.max_price) query.max_price = filters.max_price;
    if (filters.sort) query.sort = filters.sort;
    getChildCategoryProducts({query})
      .then((res: any) => {
        setProducts(res?.products || []);
      })
      .catch((err: any) => {
        console.log('Child category product err', err);
        setProducts([]); // prevent undefined
      })
      .finally(() => setLoading(false));
  }, [categoryId, filters]);

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
  // filter -> purity-14, 18, 22, 24, min_price, max_price, sort- asc, desc, gender- male, female
  return (
    <>
      <Header heading={categoryName} />
      <Box bg="white" flex={1}>
        {loading && <FullScreenLoader />}

        {/* <HStack
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
        </HStack> */}

        <VStack px={3} py={2} bg="#fafafa" space={2}>
          <HStack justifyContent="space-between">
            {/* Purity Filter */}
            <Box w="24%" style={styles.filterOuter}>
              <Select
                style={styles.filterBox}
                selectedValue={filters.purity}
                placeholder="Purity    ▼"
                placeholderTextColor="#7a2b2b"
                dropdownIcon={<></>}
                borderWidth={0}
                variant="unstyled"
                onValueChange={(val: any) =>
                  setFilters((prev: any) => ({...prev, purity: val}))
                }>
                <Select.Item label="Purity    ▼" value="" />
                <Select.Item label="14K" value="14" />
                <Select.Item label="18K" value="18" />
                <Select.Item label="22K" value="22" />
                <Select.Item label="24K" value="24" />
              </Select>
            </Box>

            {/* Gender Filter */}
            <Box w="24%" style={styles.filterOuter}>
              <Select
                style={styles.filterBox}
                selectedValue={filters.gender}
                placeholder="Gender     ▼"
                placeholderTextColor="#7a2b2b"
                dropdownIcon={<></>}
                borderWidth={0}
                variant="unstyled"
                onValueChange={(val: any) =>
                  setFilters((prev: any) => ({...prev, gender: val}))
                }>
                <Select.Item label="Gender     ▼" value="" />
                <Select.Item label="Male" value="male" />
                <Select.Item label="Female" value="female" />
              </Select>
            </Box>

            {/* Sort Filter */}
            <Box w="24%" style={styles.filterOuter}>
              <Select
                style={styles.filterBox}
                selectedValue={filters.sort}
                placeholder="Sort    ▼"
                placeholderTextColor="#7a2b2b"
                dropdownIcon={<></>}
                borderWidth={0}
                variant="unstyled"
                onValueChange={(val: any) =>
                  setFilters((prev: any) => ({...prev, sort: val}))
                }>
                <Select.Item label="Sort    ▼" value="" />
                <Select.Item label="Low to High" value="asc" />
                <Select.Item label="High to Low" value="desc" />
              </Select>
            </Box>

            {/* Price Range Filter */}
            <Box w="24%" style={styles.filterOuter}>
              <Select
                style={styles.filterBox}
                selectedValue={filters.price_range}
                placeholder="Price    ▼"
                placeholderTextColor="#7a2b2b"
                dropdownIcon={<></>}
                borderWidth={0}
                variant="unstyled"
                onValueChange={(val: string) => {
                  const [min, max] = val.split('-');
                  setFilters((prev: any) => ({
                    ...prev,
                    min_price: min,
                    max_price: max,
                    price_range: val,
                  }));
                }}>
                <Select.Item label="Price    ▼" value="" />
                <Select.Item label="₹0 - ₹25,000" value="0-25000" />
                <Select.Item label="₹25,000 - ₹50,000" value="25000-50000" />
                <Select.Item label="₹50,000 - ₹1,00,000" value="50000-100000" />
                <Select.Item
                  label="₹1,00,000 - ₹1,000,000,000"
                  value="100000-1000000000"
                />
              </Select>
            </Box>
          </HStack>
        </VStack>

        <Box p={3} paddingBottom={130}>
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
    </>
  );
};

const styles = StyleSheet.create({
  filterOuter: {
    marginRight: 5,
    marginBottom: 8,
  },
  filterBox: {
    borderRadius: 30,
    height: 30,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff2f2',
    color: '#7a2b2b',
    borderColor: '#7a2b2b',
    borderWidth: 1,
  },
});
