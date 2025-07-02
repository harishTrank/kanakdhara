import React, {useEffect, useState} from 'react';
import {Box, Button, Image, Text, ScrollView} from 'native-base';
import {ScreenHeader} from '../../../components/common/ScreenHeader';
import {Linking, View} from 'react-native';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

export const PurchaseHistoryScreen: any = ({navigation, route}: any) => {
  const docket_number =
    route.params?.item?.meta_data[route.params?.item?.meta_data.length - 1]
      ?.value;
  const [apiResponse, setApiResponse]: any = useState({});

  const apiFechingCall = async () => {
    try {
      const response = await axios.post(
        `https://test.sequel247.com/api/track`,
        {
          token: '18eb319e3d90c05ab195ddce9efb2064',
          docket: docket_number,
        },
      );
      setApiResponse(response?.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    apiFechingCall();
  }, [docket_number]);

  const openLink = () => {
    const url = `https://test.sequel247.com/track/${docket_number}`;
    Linking.openURL(url).catch((err: any) =>
      console.error("Couldn't load page", err),
    );
  };

  const cancelOrderApi = async () => {
    try {
      const response = await axios.post(
        'https://test.sequel247.com/api/cancel',
        {
          token: '18eb319e3d90c05ab195ddce9efb2064',
          docket: docket_number,
          cancelReason: 'Pickup not ready',
        },
      );
      showMessage({
        message: 'Order cancelled successfully.',
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Box flex={1} bg={'#fff'}>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <ScreenHeader heading={'Order History'} />
        {route.params?.item?.line_items?.map((item: any) => (
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.05,
              shadowRadius: 3.84,
              elevation: 5,
              backgroundColor: '#FFF',
              margin: 10,
              borderRadius: 10,
            }}>
            <Box bg={'#FFF'}>
              <Image
                source={{uri: item?.image?.src}}
                w={180}
                h={180}
                resizeMode={'contain'}
                alt={'no img'}
                alignSelf={'center'}
                my={3}
              />
            </Box>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
                paddingBottom: 5,
              }}>
              <Text
                mt={2}
                textAlign={'center'}
                fontWeight={'400'}
                fontSize={'md'}
                width="70%"
                color={'black'}>
                {item?.name}
              </Text>
              <Text
                mt={2}
                textAlign={'right'}
                fontWeight={'600'}
                fontSize={'sm'}
                color={'black'}>
                {`x${item?.quantity}\n${item?.subtotal}`}
              </Text>
            </View>
          </View>
        ))}
        <Text px={5} mt={5} fontWeight={'600'} fontSize={'md'} color={'black'}>
          Estimated Delivery
        </Text>
        <Text px={5} fontWeight={'800'} fontSize={'lg'} color={'black'}>
          {apiResponse?.data?.estimated_delivery}
        </Text>
        <Text px={5} mt={5} fontWeight={'600'} fontSize={'md'} color={'black'}>
          Delivered Address
        </Text>
        <Text px={5} fontWeight={'500'} fontSize={'sm'} color={'black'}>
          {`${route.params?.item?.billing?.address_1}, ${route.params?.item?.billing?.address_2}, ${route.params?.item?.billing?.city}, ${route.params?.item?.billing?.state}, ${route.params?.item?.billing?.postcode}`}
        </Text>
        <Text mt={2} px={5} fontWeight={'600'} fontSize={'md'} color={'black'}>
          Receiver
        </Text>
        <Text mb={2} px={5} fontWeight={'500'} fontSize={'sm'} color={'black'}>
          {route.params?.item?.billing?.first_name || ''}{' '}
          {route.params?.item?.billing?.last_name || ''}
        </Text>
        <Text px={5} fontWeight={'600'} fontSize={'md'} color={'black'}>
          Contact Details
        </Text>
        <Text mb={5} px={5} fontWeight={'500'} fontSize={'sm'} color={'black'}>
          +91 {route.params?.item?.billing?.phone} |{' '}
          {route.params?.item?.billing?.email}
        </Text>
        <Text px={5} fontWeight={'600'} fontSize={'md'} color={'black'}>
          Tracking ID
        </Text>
        <Text mb={5} px={5} fontWeight={'500'} fontSize={'sm'} color={'black'}>
          {
            route.params?.item?.meta_data[
              route.params?.item?.meta_data.length - 1
            ]?.value
          }
        </Text>
        <Text px={5} fontWeight={'600'} fontSize={'md'} color={'black'}>
          Estimated Delivery
        </Text>
        <Text px={5} fontWeight={'500'} fontSize={'sm'} color={'black'}>
          ₹{route?.params?.item?.total}
        </Text>
        <Button
          // position={'absolute'}
          // bottom={0}
          // right={0}
          // left={0}
          _text={{fontWeight: '600', fontSize: 'sm'}}
          onPress={openLink}
          backgroundColor={'green.400'}
          m={5}>
          Track Here
        </Button>
        <Button
          // position={'absolute'}
          // bottom={0}
          // right={0}
          // left={0}
          _text={{fontWeight: '600', fontSize: 'sm'}}
          onPress={cancelOrderApi}
          m={5}>
          Cancel order
        </Button>
      </ScrollView>
      <Button
        // position={'absolute'}
        // bottom={0}
        // right={0}
        // left={0}
        _text={{fontWeight: '600', fontSize: 'sm'}}
        m={5}>
        Download Invoice
      </Button>
      {/* route.params?.item?.status */}
    </Box>
  );
};
