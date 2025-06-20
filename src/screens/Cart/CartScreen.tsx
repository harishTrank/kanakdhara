import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Text,
  FlatList,
  HStack,
  Image,
  Pressable,
  Button,
} from 'native-base';
import {View} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import {Colors} from '../../utils/Colors';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {useAllProducts} from '../../hooksQuery/Home/query';
import {TopSellingRenderItem} from '../Home/components/TopSellingListComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cartListApi, getSingleProduct} from '../../QueryStore/Services/Home';
import {TouchableOpacity} from 'react-native';
import {useUpdateToCart} from '../../hooksQuery/Home/mutation';
import {showMessage} from 'react-native-flash-message';

type Props = RootStackScreenProps<'Cart'>;

const searchArray = ['Fast Delivery', 'Best Quality', 'Trending item', 'New'];

export const CartScreen: FC<Props> = ({navigation}: any) => {
  const [totalAmount, setTotalAmount]: any = useState('');
  const [cardItemList, setCartItemList]: any = useState([]);
  const cartListHandler = async () => {
    const userId: any = await AsyncStorage.getItem('accessToken');
    cartListApi({
      query: {
        user_id: JSON.parse(userId)?.userId,
      },
    })
      .then((res: any) => {
        setTotalAmount(res.total);
        setCartItemList(res.cart_data);
      })
      .catch((err: any) => console.log('errr', err));
  };

  const updateToCartApiCall: any = useUpdateToCart();
  const updateToCartHandler = async (itemId: any, quantity: any) => {
    updateToCartApiCall
      ?.mutateAsync({
        query: {
          cart_item_key: itemId,
          quantity: `${quantity}`,
        },
      })
      .then((res: any) => {
        cartListHandler();
      })
      ?.catch((err: any) =>
        showMessage({
          message: 'Something went wrong when we add this product.',
          type: 'danger',
        }),
      );
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      cartListHandler();
    });
  }, [navigation]);

  const getParticularItem = (itemId: any) => {
    getSingleProduct({
      body: {
        include: itemId,
      },
    })
      .then((res: any) => {
        navigation.navigate('ProductDetail', {item: res?.data?.[0]});
      })
      .catch((err: any) => console.log('err', err));
  };

  const renderItem: any = ({item, index}: any) => {
    return (
      <Pressable key={item} onPress={() => getParticularItem(item?.id)}>
        <HStack
          mt={index === 0 ? 5 : 0}
          mb={5}
          shadow={2}
          bg={'#fff'}
          w={'90%'}
          alignSelf={'center'}>
          <Box bg={'#FFF'} w={'35%'}>
            <Image
              source={{uri: item?.image}}
              w={'100%'}
              h={120}
              alt={'no img'}
              resizeMode={'contain'}
            />
          </Box>
          <Box w={'62%'} ml={3}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <Text fontWeight={'600'} fontSize={'md'} color={'black'}>
                {item?.name?.length > 20
                  ? `${item?.name?.slice(0, 20)}..`
                  : item?.name}
              </Text>
              {/* <Checkbox.Group
                mr={-3}
                onChange={setGroupValues}
                value={groupValues}
                accessibilityLabel="choose numbers">
                <Checkbox
                  value={String(item)}
                  my={2}
                  colorScheme={'black'}
                  _checked={{bg: 'black'}}>
                  {''}
                </Checkbox>
              </Checkbox.Group> */}
            </HStack>
            <HStack flexWrap={'wrap'}>
              {searchArray.map(m => (
                <Text
                  fontWeight={'500'}
                  fontSize={8}
                  color={Colors.textColor}
                  px={2}
                  py={1}
                  mr={1}
                  mt={1}
                  borderColor={Colors.textColor}
                  borderRadius={100}
                  borderWidth={1}>
                  {m}
                </Text>
              ))}
            </HStack>
            <HStack
              alignItems={'center'}
              justifyContent={'space-between'}
              my={2}>
              <Text fontWeight={'600'} fontSize={'md'}>
                {`₹${item?.price * item?.quantity}`}
              </Text>
              <HStack
                py={0}
                borderRadius={5}
                alignItems={'center'}
                justifyContent={'space-between'}
                bg={'#FFF'}
                mr={3}
                w={'40%'}>
                <TouchableOpacity
                  onPress={() =>
                    updateToCartHandler(
                      item?.cart_item_key,
                      Number(item.quantity) - 1,
                    )
                  }>
                  <Text fontWeight={'600'} fontSize={'xl'} px={3}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text fontWeight={'600'} fontSize={'md'}>
                  {item?.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    updateToCartHandler(
                      item?.cart_item_key,
                      Number(item.quantity) + 1,
                    )
                  }>
                  <Text fontWeight={'600'} fontSize={'xl'} px={3}>
                    +
                  </Text>
                </TouchableOpacity>
              </HStack>
            </HStack>
          </Box>
        </HStack>
      </Pressable>
    );
  };

  const topSellingList: any = useAllProducts({
    query: {
      per_page: 5,
      page: 1,
      sort: 'default',
    },
  });

  return (
    <Box flex={1} bg={'#ffffff'}>
      <ScreenHeader heading={'Your Cart'} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cardItemList}
        renderItem={renderItem}
        keyExtractor={(item: any) => String(item.id)}
      />
      <View>
        <Text color={'#000'} fontWeight={'600'} fontSize={'md'} py={0} px={5}>
          You may also like
        </Text>
        <FlatList
          data={topSellingList?.data?.data}
          renderItem={({item}: any) => TopSellingRenderItem(item, navigation)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          my={5}
        />
      </View>
      <Box p={5} shadow={5}>
        {totalAmount && Number(totalAmount) !== 0 && (
          <Button
            _text={{fontWeight: '600', fontSize: 'md'}}
            onPress={() =>
              navigation.navigate('Checkout', {cardItemList, totalAmount})
            }>
            {`Checkout (₹${totalAmount})`}
          </Button>
        )}
      </Box>
    </Box>
  );
};
