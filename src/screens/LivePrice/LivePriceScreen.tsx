import React, {FC, useEffect, useState, useRef} from 'react';
import {Box, FlatList, HStack, Image, Text} from 'native-base';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {RootBottomTabScreenProps} from '../../navigation/types';
import {HomeHeader} from '../Home/components/HomeHeader';
import {LiveGoldItem} from '../../data/LiveGoldData';
import {Colors} from '../../utils/Colors';
import axios from 'axios';
import {
  GOLD_PRICE_URL,
  GOLD_API_KEY,
  SILVER_PRICE_URL,
} from '../../lib/Constants';

type Props = RootBottomTabScreenProps<'LivePrice'>;

export const LivePriceScreen: FC<Props> = ({navigation}: any) => {
  const [liveDataPrice, setLiveDataPrice]: any = useState([]);
  const intervalRef: any = useRef(null);
  const renderItem = ({item, index}: any) => {
    return (
      <HStack
        mt={index === 0 ? 3 : 0}
        w={'95%'}
        alignItems={'center'}
        alignSelf={'center'}
        borderRadius={10}
        mb={3}
        shadow={5}
        bg={'white'}
        justifyContent={'space-between'}
        p={3}>
        <Box>
          <Text
            fontWeight={'500'}
            fontSize={'sm'}
            color={item.item === 'Gold' ? 'primary.400' : Colors.textColor}>
            {item.item}
          </Text>
          <Text fontWeight={'500'} fontSize={'sm'} color={'black'}>
            {item.qty}
          </Text>
        </Box>
        <Image
          key={item.up ? 'upGraph' : 'downGraph'}
          source={
            !item.up
              ? require('../../assets/icons/downGraph.png')
              : require('../../assets/icons/upGraph.png')
          }
          w={'30%'}
          h={50}
          alt={'no img'}
          shadow={2}
          resizeMode={'contain'}
        />
        <Box>
          <Text
            textAlign={'right'}
            fontWeight={'500'}
            fontSize={'sm'}
            color={'black'}>
            {`₹${item.price}\n${item.item === 'Gold' ? '10gm' : '1kg'}`}
          </Text>
        </Box>
      </HStack>
    );
  };

  const upFlagManager = (oldValue: any, id: any, currentPrice: any) => {
    const oldValobj: any = oldValue?.find((item: any) => item.id === id);
    if (Number(oldValobj?.price) === Number(currentPrice)) {
      return oldValobj.up;
    } else {
      return Number(oldValobj?.price) < Number(currentPrice);
    }
  };

  const goldPriceCalculator = (price: any) => {
    return Number(price * 11.7)?.toFixed(2);
  };

  const silverPriceCalculator = (price: any) => {
    return Number(price * 1130)?.toFixed(2);
  };
  const liveApiPriceHandler = async () => {
    try {
      const silverResponse: any = await axios.get(SILVER_PRICE_URL, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': GOLD_API_KEY,
        },
      });
      const goldResponse: any = await axios.get(GOLD_PRICE_URL, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': GOLD_API_KEY,
        },
      });
      setLiveDataPrice((oldValue: any) => [
        {
          id: 1,
          item: 'Gold',
          qty: '24 karat',
          price: goldPriceCalculator(goldResponse?.data?.price_gram_24k),
          up: upFlagManager(
            oldValue,
            1,
            goldPriceCalculator(goldResponse?.data?.price_gram_24k),
          ),
        },
        {
          id: 2,
          item: 'Gold',
          qty: '22 karat',
          price: goldPriceCalculator(goldResponse?.data?.price_gram_22k),
          up: upFlagManager(
            oldValue,
            2,
            goldPriceCalculator(goldResponse?.data?.price_gram_22k),
          ),
        },
        {
          id: 5,
          item: 'Gold',
          qty: '18 karat',
          price: goldPriceCalculator(goldResponse?.data?.price_gram_18k),
          up: upFlagManager(
            oldValue,
            5,
            goldPriceCalculator(goldResponse?.data?.price_gram_18k),
          ),
        },
        {
          id: 7,
          item: 'Gold',
          qty: '14 karat',
          price: goldPriceCalculator(goldResponse?.data?.price_gram_14k),
          up: upFlagManager(
            oldValue,
            7,
            goldPriceCalculator(goldResponse?.data?.price_gram_14k),
          ),
        },
        {
          id: 9,
          item: 'Silver',
          qty: '',
          price: silverPriceCalculator(silverResponse?.data?.price_gram_24k),
          up: upFlagManager(
            oldValue,
            9,
            silverPriceCalculator(silverResponse?.data?.price_gram_24k),
          ),
        },
      ]);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const onFocus = () => {
      intervalRef.current = setInterval(() => {
        liveApiPriceHandler();
      }, 1000);
    };
    const onBlur = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    const focusListener = navigation.addListener('focus', onFocus);
    const blurListener = navigation.addListener('blur', onBlur);
    return () => {
      focusListener();
      blurListener();
      onBlur();
    };
  }, [navigation]);

  return (
    <Box flex={1} bg={'#ffffff'}>
      <HomeHeader />
      <Text
        mt={2}
        fontWeight={'600'}
        fontSize={'md'}
        color={'black'}
        textAlign={'center'}>
        Live Price
      </Text>
      <FlatList
        style={{
          marginBottom: 50,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        data={liveDataPrice || []}
        renderItem={renderItem}
        keyExtractor={(item: any) => `${item.item}${item.qty}`}
        pb={100}
      />
    </Box>
  );
};
