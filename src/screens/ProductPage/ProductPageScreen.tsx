import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Text,
  Pressable,
} from 'native-base';
import {TouchableOpacity, View} from 'react-native';
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
import {getDecimalPart} from '../../utils/userUtils';
import FullScreenLoader from '../../components/FullScreenLoader';

type Props = RootStackScreenProps<'ProductPage'>;

export const ProductPageScreen: FC<Props> = ({route, navigation}: any) => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState(false);
  const [category, setCategory] = useState(false);
  const [price, setPrice] = useState(false);
  const [loading, setLoading]: any = useState(true);

  const [sortValue, setSortValue]: any = useState('default');
  const [categoryValue, setCategoryValue]: any = useState(undefined);
  const {categoryList}: any = useGetAllCategories();
  const [currentResponse, setCurrentResponse]: any = useState([]);

  const [priceRange, setPriceRange]: any = useState({
    max: '',
    min: '',
  });

  useEffect(() => {
    if (route.params?.itemId) {
      setTimeout(() => {
        setCategoryValue(route.params?.itemId);
      }, 500);
    }
  }, [route.params?.itemId]);

  const fetchDataHandler = () => {
    setLoading(true);
    setCategory(false);
    categoeryProduct({
      query: {
        category: categoryValue,
        per_page: 200,
        page: 1,
        sort: sortValue,
        max_price: priceRange.max,
        min_price: priceRange.min,
      },
    })
      .then((res: any) => {
        setCurrentResponse(res?.data);
        setLoading(false);
      })
      .catch((err: any) => setLoading(false));
  };

  useEffect(() => {
    fetchDataHandler();
  }, [categoryValue, sortValue, priceRange]);

  const renderProductItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          width: '32%',
          marginBottom: 5,
          marginLeft: 3,
        }}
        onPress={() => navigation.navigate('ProductDetail', {item})}>
        <Box bg={'#'} alignItems={'center'} justifyContent={'center'} p={3}>
          <Image
            source={{uri: item?.images?.[0]?.src}}
            size={'md'}
            alt={'no img'}
          />
        </Box>
        <Text
          fontWeight={'500'}
          fontSize={'sm'}
          color={'black'}
          numberOfLines={1}>
          {item?.slug}
        </Text>
        <Text fontWeight={'400'} fontSize={'xs'} color={'black'}>
          {`₹${item?.variationProduct?.[0]?.price}`}
          {/* <Text textDecorationLine={'line-through'}>{`₹${item?.regular_price}`}</Text> */}
          {/* <Text color={'#3b8126'} fontWeight={'600'}>
            {' '}
            {`${getDecimalPart(
              item?.regular_price,
              item?.sale_price,
            )}% off`}
          </Text> */}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Box flex={1} bg={'white'}>
      <ScreenHeader heading={'Products'} />
      <FullScreenLoader loading={loading} />
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        mx={5}
        pb={5}>
        <TouchableOpacity onPress={() => setSort(true)}>
          <HStack alignItems={'center'}>
            <Text fontWeight={'600'} fontSize={'sm'} color={Colors.textColor}>
              Sort{' '}
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory(true)}>
          <HStack alignItems={'center'}>
            <Text fontWeight={'600'} fontSize={'sm'} color={'#9C9C9C'}>
              Category{' '}
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPrice(true)}>
          <HStack alignItems={'center'}>
            <Text fontWeight={'600'} fontSize={'sm'} color={Colors.textColor}>
              Price Range{' '}
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </HStack>
        </TouchableOpacity>
        {/* <Pressable onPress={() => setOpen(true)}>
          <HStack alignItems={'center'}>
            <Text fontWeight={'600'} fontSize={'sm'} color={Colors.textColor}>
              Filter{' '}
            </Text>
            <FontAwesome name="sliders" size={18} color={Colors.textColor} />
          </HStack>
        </Pressable> */}
      </HStack>
      {/*  Banner  */}
      <SortModal
        setSortValue={setSortValue}
        sort={sort}
        onCloseSort={() => setSort(false)}
        sortValue={sortValue}
      />
      <CategoryModel
        category={category}
        onCloseCategory={() => setCategory(false)}
        categoryValue={categoryValue}
        selectedCategory={setCategoryValue}
        categoryList={categoryList}
      />
      <PriceRangeModal
        setPriceRange={setPriceRange}
        onClosePrice={() => setPrice(false)}
        price={price}
      />

      {currentResponse?.[0]?.images?.[0]?.src && loading == false && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {currentResponse && currentResponse?.length > 0 && (
            <Pressable
              onPress={() =>
                navigation.navigate('ProductDetail', {
                  item: currentResponse?.[0],
                })
              }>
              <Image
                source={{uri: currentResponse?.[0]?.images?.[0]?.src}}
                h={300}
                w={'90%'}
                alt={'no img'}
                bg={'#FFF'}
                resizeMode={'contain'}
                alignSelf={'center'}
              />
              <Text
                fontWeight={'600'}
                fontSize={'md'}
                color={'black'}
                numberOfLines={1}
                mt={1}
                mx={5}>
                {currentResponse?.[0]?.slug}
              </Text>
              <Text
                fontWeight={'500'}
                fontSize={'sm'}
                color={'black'}
                numberOfLines={1}
                mx={5}
                mb={5}>
                {`₹${currentResponse?.[0]?.variationProduct?.[0]?.price}`}{' '}
              </Text>
            </Pressable>
          )}

          <FlatList
            data={currentResponse}
            renderItem={renderProductItem}
            numColumns={3}
            mx={5}
          />
        </ScrollView>
      )}

      {!currentResponse && loading == false && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            fontWeight={'600'}
            fontSize={'sm'}
            color={'red.800'}
            style={{
              marginBottom: 50,
            }}>
            This category have no products yet!
          </Text>
        </View>
      )}
      <FilterModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};
