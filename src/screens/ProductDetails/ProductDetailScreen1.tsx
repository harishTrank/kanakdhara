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
import {Dimensions, TouchableOpacity, Share} from 'react-native';
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

type Props = RootStackScreenProps<'ProductDetail'>;

const WIDTH = Dimensions.get('screen').width;

const PurityTextBox = ({title, onPress, purityTextSelected}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text
        fontWeight={'500'}
        fontSize={'sm'}
        color={title === purityTextSelected ? Colors.primary : Colors.textColor}
        py={1}
        px={2}
        mr={3}
        borderRadius={100}
        borderWidth={1}
        borderColor={
          title === purityTextSelected ? Colors.primary : Colors.textColor
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const ProductDetailScreen: FC<Props> = ({navigation, route}: any) => {
  const [service, setService] = useState('12');
  const addToCartApiCall: any = useAddTocart();
  const [purityTextSelected, setPurityTextSelected]: any = useState('24 Karat');
  const [relatedList, setRealtedList]: any = useState([]);
  const [toggleWishList, setToggleWishList]: any = useState(false);

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
            setRealtedList((oldItem: any) => [...oldItem, ...response?.data]);
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
          <Box bg={'#f3f3f3'} py={3}>
            <Text
              fontWeight={'600'}
              fontSize={'md'}
              color={Colors.black}
              mx={5}
              mb={3}>
              Available Offer
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Box ml={5} mr={3}>
                <HStack
                  bg={'white'}
                  px={3}
                  py={2}
                  borderRadius={5}
                  alignItems={'center'}>
                  <Image
                    source={require('../../assets/icons/offer.png')}
                    w={8}
                    h={8}
                    resizeMode={'contain'}
                    alt={'no img'}
                  />
                  <Text
                    ml={2}
                    fontWeight={'500'}
                    fontSize={'md'}
                    lineHeight={18}
                    color={Colors.textColor}>
                    {'20 % off on\nmaking charges'}
                  </Text>
                </HStack>
              </Box>
              <Box mr={3}>
                <HStack
                  bg={'white'}
                  px={3}
                  py={2}
                  borderRadius={5}
                  alignItems={'center'}>
                  <Image
                    source={require('../../assets/icons/mastercard.png')}
                    w={8}
                    h={8}
                    resizeMode={'contain'}
                    alt={'no img'}
                  />
                  <Text
                    ml={2}
                    fontWeight={'500'}
                    fontSize={'md'}
                    lineHeight={18}
                    color={Colors.textColor}>
                    {'1000 Cashback\non Mastercard'}
                  </Text>
                </HStack>
              </Box>
              <Box mr={3}>
                <HStack
                  bg={'white'}
                  px={3}
                  py={2}
                  borderRadius={5}
                  alignItems={'center'}>
                  <Image
                    source={require('../../assets/icons/visa.png')}
                    w={8}
                    h={8}
                    resizeMode={'contain'}
                    alt={'no img'}
                  />
                  <Text
                    ml={2}
                    fontWeight={'500'}
                    fontSize={'md'}
                    lineHeight={18}
                    color={Colors.textColor}>
                    {'1000 Cashback\non Visa'}
                  </Text>
                </HStack>
              </Box>
            </ScrollView>
          </Box>
        </Box>
        <Text px={5} py={3} fontWeight={'600'} fontSize={'md'}>
          Select Purity
        </Text>
        <HStack mx={5}>
          <PurityTextBox
            title={'24 Karat'}
            onPress={() => setPurityTextSelected('24 Karat')}
            purityTextSelected={purityTextSelected}
          />
          <PurityTextBox
            title={'22 Karat'}
            onPress={() => setPurityTextSelected('22 Karat')}
            purityTextSelected={purityTextSelected}
          />
          <PurityTextBox
            title={'18 Karat'}
            onPress={() => setPurityTextSelected('18 Karat')}
            purityTextSelected={purityTextSelected}
          />
          <PurityTextBox
            title={'14 Karat'}
            onPress={() => setPurityTextSelected('14 Karat')}
            purityTextSelected={purityTextSelected}
          />
        </HStack>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          mx={5}
          my={3}>
          <Text fontWeight={'600'} fontSize={'md'}>
            Select Size
          </Text>
          {/* <Text
            fontWeight={'600'}
            fontSize={'sm'}
            color={'primary.400'}
            textDecorationLine={'underline'}>
            Size Guide
          </Text> */}
        </HStack>
        <Select
          selectedValue={service}
          w={'90%'}
          alignSelf={'center'}
          bg={'#f3f3f3'}
          accessibilityLabel="Choose a size"
          placeholder="Choose a size"
          _selectedItem={{
            bg: 'primary.400',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setService(itemValue)}>
          <Select.Item label="9 cm" value="9" />
          <Select.Item label="10 cm" value="10" />
          <Select.Item label="11 cm" value="11" />
          <Select.Item label="12 cm" value="12" />
          <Select.Item label="13 cm" value="13" />
          <Select.Item label="14 cm" value="14" />
        </Select>
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
