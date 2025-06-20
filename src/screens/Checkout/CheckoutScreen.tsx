import React, {FC, useEffect, useState} from 'react';
import {Box, Button, HStack, Text, Image, ScrollView} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RootStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {store} from '../../store';
import {Axios} from '../../lib/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePaymentGetWayKeys} from '../../hooksQuery/Home/mutation';
import {showMessage} from 'react-native-flash-message';
import {View} from 'react-native';
import {FormInput} from '../../components/common/FormInput';
import axios from 'axios';

type Props = RootStackScreenProps<'Checkout'>;

export const CheckoutScreen: FC<Props> = ({navigation, route}: any) => {
  const [paymentAddress, setPaymentAddress]: any = useState({});
  const [checkPincode, setCheckPinCode] = useState('');
  const getCurrentAddressHandler = async () => {
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
        setPaymentAddress(result?.data?.data?.billing);
      }
    } catch (error) {
      console.log('errorerror', error);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getCurrentAddressHandler();
    });
  }, [navigation]);

  const paymentDetails: any = usePaymentGetWayKeys();
  const paymentButtonHandler = async () => {
    if (!paymentAddress?.city) {
      showMessage({
        message: 'Please update your address then process to pay.',
        type: 'danger',
      });
      return;
    }
    const userId: any = await AsyncStorage.getItem('accessToken');
    paymentDetails
      ?.mutateAsync({
        query: {
          u_id: JSON.parse(userId)?.userId,
          payment_method: 'CCAvenue',
          payment_method_title: 'CCAvenue',
        },
      })
      ?.then((res: any) => {
        navigation.navigate('PaymentScreen', {
          id: res?.data?.data?.id,
          order_key: res?.data?.data?.order_key,
        });
      })
      ?.catch((err: any) => console.log('errorrror', err));
  };

  const checkButtonHandler = async () => {
    try {
      const response = await axios.post(
        'https://test.sequel247.com/api/checkServiceability',
        {
          token: '18eb319e3d90c05ab195ddce9efb2064',
          pin_code: checkPincode,
        },
      );
      if (response?.data?.status === 'true') {
        showMessage({
          type: 'success',
          message: response?.data?.message,
        });
      } else {
        showMessage({
          type: 'danger',
          message: response?.data?.errorInfo?.pin_code
            ? response?.data?.errorInfo?.pin_code
            : response?.data?.message,
        });
      }
      setCheckPinCode('');
      console.log('responseresponse', response?.data?.errorInfo);
    } catch (err) {
      console.log('errerr', err);
    }
  };

  return (
    <ScrollView flex={1} bg={'#ffffff'} showsVerticalScrollIndicator={false}>
      <ScreenHeader heading={'Checkout'} />
      <Box bg={'#f3f3f3'} p={5}>
        {paymentAddress?.city && (
          <>
            <HStack>
              <Ionicons name="location" size={20} color="black" />
              <Text fontWeight={'600'} fontSize={'md'}>
                {' '}
                Address
              </Text>
            </HStack>
            <Text mb={3} fontSize={'sm'} fontWeight={'500'} color={'#000'}>
              {`${paymentAddress?.address_1}, ${paymentAddress?.address_2}, ${paymentAddress?.city}, ${paymentAddress?.state}, ${paymentAddress?.postcode}`}
            </Text>
          </>
        )}
        <HStack>
          <Ionicons name="person" size={20} color="black" />
          <Text fontWeight={'600'} fontSize={'md'}>
            {' '}
            Receiver
          </Text>
        </HStack>
        <Text mb={3} fontSize={'sm'} fontWeight={'500'} color={'#000'}>
          {`${paymentAddress?.first_name} ${paymentAddress?.last_name}`}
        </Text>

        <View>
          <FormInput
            placeholder={'Enter Deivery Pincod'}
            value={checkPincode}
            onChangeText={(text: any) => setCheckPinCode(text)}
            label={'Delivery'}
          />
          <Button
            onPress={checkButtonHandler}
            style={{
              position: 'absolute',
              top: 25,
              right: 25,
            }}
            size={'sm'}
            w={'20%'}
            alignSelf={'center'}
            _text={{fontWeight: '500', fontSize: 'sm'}}>
            Check
          </Button>
        </View>

        <HStack>
          <Ionicons name="call" size={20} color="black" />
          <Text fontWeight={'600'} fontSize={'md'}>
            {' '}
            Contact No.
          </Text>
        </HStack>
        <Text mb={3} fontSize={'sm'} fontWeight={'500'} color={'#000'}>
          {`+91 ${paymentAddress?.phone}`}
        </Text>
        <Button
          onPress={() => navigation.navigate('Address', {paymentAddress})}
          size={'sm'}
          w={'20%'}
          alignSelf={'center'}
          _text={{fontWeight: '500', fontSize: 'sm'}}>
          Edit
        </Button>
      </Box>
      <Box px={5} mt={5}>
        <Text fontSize={'md'} fontWeight={'600'} color={'#000'}>
          Order 1 - Fast Delivery
        </Text>
        {/* <Text fontSize={'sm'} fontWeight={'600'} color={Colors.textColor}>
          Delivery by{' '}
          <Text color={'primary.400'}>Fri, 16 Jun - Sat, 17 Jun</Text>
        </Text> */}
        {route.params?.cardItemList?.map((item: any) => (
          <HStack my={3}>
            <Image
              source={{uri: item?.image}}
              w={'35%'}
              h={120}
              alt={'no img'}
              bg={'#fff'}
              resizeMode={'contain'}
            />
            <Box w={'65%'}>
              <Text p={2} fontSize={'md'} fontWeight={'500'} color={'#000'}>
                {item?.name}
              </Text>
              <Box p={0} position={'absolute'} bottom={0} left={0} right={0}>
                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
                    {`₹${(item?.quantity * item?.price)?.toFixed(2)}`}
                  </Text>
                  <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
                    {`X${item?.quantity}`}
                  </Text>
                </HStack>

                <HStack alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
                    {`₹${(
                      route?.params?.totalAmount -
                      item?.quantity * item?.price
                    )?.toFixed(2)}`}
                  </Text>
                  <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
                    {`Making Charges`}
                  </Text>
                </HStack>
              </Box>
            </Box>
          </HStack>
        ))}
        {/* <HStack mb={2} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
            Shipping Charges
          </Text>
          <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
            ₹100
          </Text>
        </HStack> */}
        {/* <HStack mb={2} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
            Apply Coupon
          </Text>
          <Text
            fontSize={'xs'}
            fontWeight={'600'}
            color={Colors.primary}
            onPress={() => navigation.navigate('Coupon')}>
            {'Enter Code to Claim Coupon >'}
          </Text>
        </HStack> */}
        <HStack mb={2} alignItems={'center'} justifyContent={'space-between'}>
          <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
            Bag Total
          </Text>
          <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
            {`₹${route?.params?.totalAmount}`}
          </Text>
        </HStack>
        {/* <Text fontSize={'lg'} fontWeight={'600'} color={'#000'}>
          Payment Option
        </Text>
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <HStack alignItems={'center'}>
            <FontAwesome5 name="credit-card" size={24} color={Colors.primary} />
            <Text ml={3} fontSize={'sm'} fontWeight={'600'} color={'#000'}>
              Debit/Credit Cards
            </Text>
          </HStack>
          <Checkbox.Group
            onChange={setGroupValues}
            value={groupValues}
            accessibilityLabel="choose numbers">
            <Checkbox
              value={'1'}
              my={2}
              colorScheme={'black'}
              _checked={{bg: 'black'}}>
              {''}
            </Checkbox>
          </Checkbox.Group>
        </HStack>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottomWidth={0.5}
          borderBottomColor={Colors.textColor}
          borderTopWidth={0.5}
          borderTopColor={Colors.textColor}>
          <HStack alignItems={'center'}>
            <MaterialCommunityIcons
              name="cash-multiple"
              size={24}
              color={Colors.primary}
            />
            <Text ml={3} fontSize={'sm'} fontWeight={'600'} color={'#000'}>
              Cash On Delivery
            </Text>
          </HStack>
          <Checkbox.Group
            onChange={setGroupValues}
            value={groupValues}
            accessibilityLabel="choose numbers">
            <Checkbox
              value={'7'}
              my={2}
              colorScheme={'black'}
              _checked={{bg: 'black'}}>
              {''}
            </Checkbox>
          </Checkbox.Group>
        </HStack>
        <HStack
          alignItems={'center'}
          justifyContent={'space-between'}
          borderBottomWidth={0.5}
          borderBottomColor={Colors.textColor}
          borderTopWidth={0.5}
          borderTopColor={Colors.textColor}>
          <HStack alignItems={'center'}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={Colors.primary}
            />
            <Text ml={3} fontSize={'sm'} fontWeight={'600'} color={'#000'}>
              UPI
            </Text>
          </HStack>
          <Checkbox.Group
            onChange={setGroupValues}
            value={groupValues}
            accessibilityLabel="choose numbers">
            <Checkbox
              value={'5'}
              my={2}
              colorScheme={'black'}
              _checked={{bg: 'black'}}>
              {''}
            </Checkbox>
          </Checkbox.Group>
        </HStack>
        <HStack
          mt={5}
          alignItems={'center'}
          alignSelf={'center'}
          justifyItems={'center'}>
          <Text fontSize={'sm'} fontWeight={'600'} color={'#000'}>
            More payment option{' '}
          </Text>
          <ChevronDownIcon />
        </HStack> */}
      </Box>
      <Button
        m={5}
        _text={{fontWeight: '600', fontSize: 'md'}}
        onPress={paymentButtonHandler}>
        {`Pay (₹${route?.params?.totalAmount})`}
      </Button>
    </ScrollView>
  );
};
