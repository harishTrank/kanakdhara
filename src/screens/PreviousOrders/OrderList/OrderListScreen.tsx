import React, {FC, useEffect, useState} from 'react';
import {Box, FlatList, HStack, Image, Pressable, Text} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

import {DrawerStackScreenProps} from '../../../navigation/types';
import {ScreenHeader} from '../../../components/common/ScreenHeader';
import {Colors} from '../../../utils/Colors';
import {orderListApi} from '../../../QueryStore/Services/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

type Props = DrawerStackScreenProps<'OrderList'>;

export const OrderListScreen: FC<Props> = ({navigation}) => {
  const [currentResponse, setCurrentResponse]: any = useState([]);
  const [limitValue, setLimitValue]: any = useState(10);
  const renderItem = ({item, index}: any) => {
    return (
      <HStack
        alignItems={'center'}
        bg={'white'}
        mb={5}
        w={'91%'}
        alignSelf={'center'}
        mt={index === 0 ? 3 : 0}
        shadow={3}
        borderRadius={10}>
        <Box bg={'#FFF'} w={'30%'}>
          <Image
            source={
              item?.line_items?.[0]?.image?.src
                ? {uri: item?.line_items?.[0]?.image?.src}
                : require('../../../assets/logo.png')
            }
            w={'100%'}
            h={90}
            resizeMode={'contain'}
            alt={'no img'}
          />
        </Box>
        <Pressable
          w={'70%'}
          onPress={() => navigation.navigate('PurchaseHistory', {item})}>
          <Text
            my={1}
            ml={2}
            fontWeight={'600'}
            fontSize={'md'}
            color={'black'}
            numberOfLines={1}>
            {item?.line_items?.[0]?.name || ''}
          </Text>
          <HStack px={2} justifyContent={'space-between'} w={'100%'}>
            <Text
              fontWeight={'400'}
              fontSize={'sm'}
              color={'black'}
              numberOfLines={1}>
              Order Value: ₹{item?.total}{' '}
            </Text>
            <Entypo
              name="chevron-small-right"
              size={24}
              color={Colors.textColor}
            />
          </HStack>

          <HStack px={2} justifyContent={'space-between'} w={'100%'}>
            <Text
              fontWeight={'400'}
              fontSize={'sm'}
              color={'black'}
              numberOfLines={1}>
              Status: {item?.status}
            </Text>
          </HStack>

          <Text
            ml={2}
            fontWeight={'400'}
            fontSize={'sm'}
            color={Colors.textColor}
            numberOfLines={1}>
            Ordered on {dayjs(item?.date_created).format('DD MMM YYYY')}
          </Text>
        </Pressable>
      </HStack>
    );
  };

  const listGettingApiHandler = async () => {
    const userId: any = await AsyncStorage.getItem('accessToken');
    orderListApi({
      body: {
        id: JSON.parse(userId)?.userId,
        offset: 0,
        limit: limitValue,
      },
    })
      .then((res: any) => {
        setCurrentResponse((oldValue: any) =>
          [...oldValue, ...res.data].filter(
            (value, index, self) =>
              index === self.findIndex((t: any) => t.id === value.id),
          ),
        );
      })
      .catch((err: any) => console.log('errerrerr', err));
  };
  useEffect(() => {
    listGettingApiHandler();
  }, [limitValue]);

  return (
    <Box flex={1} bg={'#fff'}>
      <ScreenHeader heading={'Your Orders'} />
      <Box flex={1}>
        <FlatList
          data={currentResponse}
          renderItem={renderItem}
          keyExtractor={(item: any) => String(item?.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            setLimitValue((oldValue: any) => oldValue + 10);
          }}
          onEndReachedThreshold={0.7}
        />
      </Box>
    </Box>
  );
};
