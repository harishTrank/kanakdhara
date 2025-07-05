import React, {FC, useEffect, useState} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Select,
  Text,
} from 'native-base';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {
  Dimensions,
  TouchableOpacity,
  Share,
  View,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {RootStackScreenProps} from '../../navigation/types';
import {Header} from '../../components/common/Header';
import {Colors} from '../../utils/Colors';
import {Home} from '../../components/svg';
import {getDecimalPart} from '../../utils/userUtils';
import FastImage from 'react-native-fast-image';
import {useAddTocart} from '../../hooksQuery/Home/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {getSingleProduct} from '../../QueryStore/Services/Home';
import {TopSellingRenderItem} from '../Home/components/TopSellingListComponent';
import axios from 'axios';
import {store} from '../../store';
import {Axios} from '../../lib/Axios';

type Props = RootStackScreenProps<'ProductDetail'>;

const WIDTH = Dimensions.get('screen').width;

export const ProductDetailScreen: FC<Props> = ({navigation, route}: any) => {
  const addToCartApiCall: any = useAddTocart();
  const [relatedList, setRealtedList]: any = useState([]);
  const [toggleWishList, setToggleWishList]: any = useState(false);
  const [estimateDate, setEstimateDate]: any = useState({});

  const estimateDateGet = async () => {
    try {
      const {userId} = store.getState().auth;
      const formData = new FormData();
      formData.append('user_id', userId);
      const result = await Axios.post('myprofile', formData, {
        headers: {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      });
      if (result.data.status === '1') {
        const response = await axios.post(
          'https://test.sequel247.com/api/shipment/calculateEDD',
          {
            origin_pincode: '590001',
            destination_pincode: result?.data?.data?.billing?.postcode,
            pickup_date: new Date(),
            token: '7f95ea03824896aed84914ef6ec57a31',
          },
        );
        setEstimateDate(response?.data?.data);
      }
    } catch (error) {
      console.log('errorerror', error);
    }
  };

  useEffect(() => {
    estimateDateGet();
  }, []);
  // wishlist case
  const wishListHandler = async (itemId: any) => {
    try {
      const getList = await AsyncStorage.getItem('wishList');
      const parsedList: any[] = getList ? JSON.parse(getList) : [];
      if (parsedList.includes(itemId)) {
        setToggleWishList(false);
        const updatedList = parsedList.filter((item: any) => item !== itemId);
        await AsyncStorage.setItem('wishList', JSON.stringify(updatedList));
      } else {
        setToggleWishList(true);
        parsedList.push(itemId);
        await AsyncStorage.setItem('wishList', JSON.stringify(parsedList));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const wishListToggle = async (itemId: any) => {
    const getList = await AsyncStorage.getItem('wishList');
    const parsedList: any[] = getList ? JSON.parse(getList) : [];
    if (parsedList.includes(itemId)) {
      setToggleWishList(true);
    } else {
      setToggleWishList(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setRealtedList([]);
      route?.params?.item?.related_ids?.map((relatedId: any) => {
        getSingleProduct({
          body: {
            include: relatedId,
          },
        })
          .then((response: any) => {
            if (response?.data) {
              setRealtedList((oldItem: any) => [...oldItem, ...response?.data]);
            }
          })
          .catch((error: any) => console.log(error, 'error'));
      });
      // wishlist manager
      wishListToggle(route?.params?.item?.id);
    });
  }, [navigation]);

  const addToCartHandler = async () => {
    if (!addToCartApiCall?.isFetching) {
      const userId: any = await AsyncStorage.getItem('accessToken');
      const body: any = {
        user_id: JSON.parse(userId)?.userId,
        id: route?.params?.item?.id,
        quantity: '1',
        variation_id: route?.params?.item?.variationProduct?.[0]?.ID,
      };
      addToCartApiCall
        ?.mutateAsync({body})
        .then((res: any) => {
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

  const shareLink = async () => {
    try {
      const result = await Share.share({
        message: route.params?.item?.permalink,
      });
      if (result.action === Share.sharedAction) {
        console.log('Link shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Sharing dismissed');
      }
    } catch (error: any) {
      console.error('Error sharing link:', error.message);
    }
  };

  return (
    <Box flex={1} bg={'#fff'}>
      <ScrollView flex={1} bg={'#fff'} showsVerticalScrollIndicator={false}>
        <Header />
        <Box flex={1} bg={'#fff'}>
          <SwiperFlatList
            autoplay={false}
            autoplayLoop={false}
            index={0}
            showPagination
            paginationDefaultColor={'#808080'}
            paginationActiveColor={Colors.primary}
            paginationStyleItemActive={{
              width: 6,
              height: 6,
              borderRadius: 100,
              marginTop: 5,
            }}
            paginationStyleItemInactive={{
              width: 6,
              height: 6,
              borderRadius: 100,
              marginTop: 5,
            }}
            data={route?.params?.item?.images}
            renderItem={({item}: any) => (
              <Box bg={'#FFF'} w={WIDTH} alignItems={'center'}>
                <FastImage
                  source={{uri: item?.src, priority: FastImage.priority.normal}}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: '70%',
                    height: 350,
                  }}
                />
              </Box>
            )}
          />
        </Box>
        <Box>
          <HStack
            px={5}
            py={2}
            justifyContent={'space-between'}
            alignItems={'center'}>
            <Box>
              <Text fontWeight={'600'} fontSize={'lg'}>
                {route?.params?.item?.name}
              </Text>
              <HStack>
                <Text fontWeight={'500'} fontSize={'sm'} color={'#000'}>
                  {`₹${Number(
                    route?.params?.item?.variationProduct?.[0]?.price,
                  )?.toFixed(2)}   `}
                </Text>
                {/* <Text
                  fontWeight={'500'}
                  fontSize={'sm'}
                  color={'#000'}
                  textDecorationLine={'line-through'}>
                  {`₹${route?.params?.item?.regular_price}`}
                </Text> */}
                {/* <Text
                  fontWeight={'600'}
                  fontSize={'sm'}
                  color={'rgb(57,148,21)'}>
                  {'  '}
                  {`${getDecimalPart(
                    route?.params?.item?.regular_price,
                    route?.params?.item?.sale_price,
                  )}% off`}
                </Text> */}
              </HStack>
            </Box>
            <TouchableOpacity onPress={shareLink}>
              <Entypo name="share" size={18} color="black" />
            </TouchableOpacity>
          </HStack>
        </Box>

        {/*Harish*/}
        <View style={styles.mainBox}>
          {route?.params?.item?.default_attributes?.map(
            (item: any, index: any) => {
              return (
                <View key={index} style={styles.childBox}>
                  <Text fontWeight={'500'} fontSize={'sm'} color={'#000'}>
                    {item?.name || ''}
                  </Text>
                  <Text fontWeight={'500'} fontSize={'sm'} color={'#000'}>
                    {item?.option || ''}
                  </Text>
                </View>
              );
            },
          )}
        </View>

        {estimateDate?.estimated_delivery && (
          <View>
            <Text px={5} py={3} fontWeight={'600'} fontSize={'md'}>
              Estimate Delivery Date
            </Text>
            <Text px={5} fontWeight={'800'} color={'green.900'} fontSize={'md'}>
              {estimateDate?.estimated_delivery}
            </Text>
          </View>
        )}

        <Text px={5} py={3} fontWeight={'600'} fontSize={'md'}>
          Product Details
        </Text>
        <Text
          px={5}
          fontWeight={'500'}
          color={Colors.textColor}
          fontSize={'sm'}>
          product details
        </Text>
        {relatedList && relatedList.length !== 0 && (
          <>
            <Text px={5} py={3} fontWeight={'600'} fontSize={'md'}>
              Related Product
            </Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={relatedList}
              renderItem={({item}: any) =>
                TopSellingRenderItem(item, navigation)
              }
            />
          </>
        )}
      </ScrollView>
      <HStack
        bg={'#ffffff'}
        shadow={5}
        p={5}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Home width={25} height={25} color={Colors.lightBlack} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => wishListHandler(route?.params?.item?.id)}>
          <>
            {toggleWishList ? (
              <Ionicons name="heart" size={28} color={'red'} />
            ) : (
              <Ionicons
                name="heart-outline"
                size={28}
                color={Colors.lightBlack}
              />
            )}
          </>
        </TouchableOpacity>
        <Button
          variant={'solid'}
          w={'75%'}
          size={'lg'}
          _text={{fontSize: 'lg', fontWeight: '600'}}
          onPress={addToCartHandler}>
          Add to Cart
        </Button>
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    paddingHorizontal: 15,
  },
  childBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
