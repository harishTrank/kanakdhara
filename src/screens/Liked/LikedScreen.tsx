import React, {FC, useEffect, useRef, useState} from 'react';
import {Box, Button, FlatList, Image, Text} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, Dimensions, View} from 'react-native';
import {DrawerStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {useAddTocart} from '../../hooksQuery/Home/mutation';
import {getSingleProduct} from '../../QueryStore/Services/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

type Props = DrawerStackScreenProps<'Liked'>;

const {height, width}: any = Dimensions.get('window');

export const LikedScreen: FC<Props> = ({navigation}: any) => {
  const [wishListData, setWishListData]: any = useState([]);
  const getProductDataUsingId = (itemId: any) => {
    getSingleProduct({
      body: {
        include: itemId,
      },
    })
      .then((response: any) =>
        setWishListData((oldData: any) =>
          [...oldData, ...response?.data].filter(
            (value, index, self) =>
              index === self.findIndex((t: any) => t.id === value.id),
          ),
        ),
      )
      ?.catch((error: any) => console.log('error', error));
  };

  const getWishListIdFromStorage = async () => {
    const getList = await AsyncStorage.getItem('wishList');
    const parsedList: any[] = getList ? JSON.parse(getList) : [];
    parsedList.map((mapItem: any) => {
      getProductDataUsingId(mapItem);
    });
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getWishListIdFromStorage();
    });
  }, [navigation]);

  // add to cart handler
  const addToCartApiCall: any = useAddTocart();
  const addToCartHandler = async (itemId: any) => {
    if (!addToCartApiCall?.isFetching) {
      const userId: any = await AsyncStorage.getItem('accessToken');
      const body: any = {
        user_id: JSON.parse(userId)?.userId,
        id: itemId,
        quantity: '1',
      };
      console.log('body', body);
      addToCartApiCall
        ?.mutateAsync({body})
        .then((res: any) => {
          console.log('res', res);
          showMessage({
            message: res?.message,
            type: 'success',
          });
        })
        ?.catch((err: any) =>
          showMessage({
            message: 'Something went wrong when we add this product.',
            type: 'danger',
          }),
        );
    }
  };

  const removeFromWishList = async (itemId: any) => {
    setWishListData((oldValue: any) =>
      oldValue.filter((itemFilter: any) => itemFilter.id !== itemId),
    );
    const getList = await AsyncStorage.getItem('wishList');
    const parsedList: any[] = getList ? JSON.parse(getList) : [];
    await AsyncStorage.setItem(
      'wishList',
      JSON.stringify(parsedList.filter((item: any) => item !== itemId)),
    );
  };

  const renderItem = ({item, index}: any) => {
    return (
      <View
        style={{
          height: height * 0.37,
          width: width * 0.48,
        }}>
        <Box bg={'#FFF'}>
          <Image
            source={{uri: item?.images?.[0]?.src}}
            w={'100%'}
            h={150}
            resizeMode={'contain'}
            alt={'no img'}
          />
          <TouchableOpacity
            style={{position: 'absolute', top: 0, right: 0, padding: 12}}
            onPress={() => removeFromWishList(item?.id)}>
            <AntDesign
              name="closecircle"
              size={20}
              color={'rgba(31,31,31,0.82)'}
            />
          </TouchableOpacity>
        </Box>
        <Text
          my={1}
          ml={2}
          fontWeight={'600'}
          fontSize={'sm'}
          color={'black'}
          w={width * 0.4}
          numberOfLines={1}>
          {item?.name}
        </Text>
        <Text
          ml={2}
          fontWeight={'500'}
          fontSize={'sm'}
          color={'black'}
          numberOfLines={1}>
          {`₹${item?.price}`}
        </Text>

        <Button
          onPress={() => addToCartHandler(item?.id)}
          _text={{fontWeight: '600', fontSize: 'sm'}}
          m={2}>
          Move to Cart
        </Button>
      </View>
      // </Box>
    );
  };

  // useEffect(() => {
  //   console.log("wishListDatawishListData", wishListData)
  // }, [wishListData])

  return (
    <Box flex={1} bg={'#fff'}>
      <ScreenHeader heading={'Wishlist'} />
      <Box mr={5} flex={1}>
        <FlatList
          data={wishListData}
          renderItem={renderItem}
          keyExtractor={item => String(item)}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
};
