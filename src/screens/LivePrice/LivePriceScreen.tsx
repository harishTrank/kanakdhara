import React, {FC, useEffect, useState, useRef} from 'react';
import {Box, FlatList, HStack, Image, Text} from 'native-base';
import {RootBottomTabScreenProps} from '../../navigation/types';
import {HomeHeader} from '../Home/components/HomeHeader';
import {Colors} from '../../utils/Colors';
import axios from 'axios';
import {
  GOLD_PRICE_URL,
  GOLD_API_KEY,
  SILVER_PRICE_URL,
} from '../../lib/Constants';

type Props = RootBottomTabScreenProps<'LivePrice'>;

export const LivePriceScreen: FC<Props> = ({navigation}: any) => {
  const [liveDataPrice, setLiveDataPrice] = useState<any[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const upFlagManager = (oldValue: any[], id: number, currentPrice: number) => {
    const oldItem = oldValue?.find(item => item.id === id);

    // If there's no previous item (e.g., first load), default to 'up'
    if (!oldItem || oldItem.price === undefined) {
      return true;
    }

    // If price hasn't changed, keep the previous direction
    if (Number(oldItem.price) === Number(currentPrice)) {
      return oldItem.up;
    }

    // Return true if new price is higher (up), false otherwise (down)
    return Number(currentPrice) > Number(oldItem.price);
  };

  const liveApiPriceHandler = async () => {
    try {
      const [goldResponse, silverResponse] = await Promise.all([
        axios.get(GOLD_PRICE_URL, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': GOLD_API_KEY,
          },
        }),
        axios.get(SILVER_PRICE_URL, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': GOLD_API_KEY,
          },
        }),
      ]);

      const goldData = goldResponse?.data;
      const silverData = silverResponse?.data;
      if (!goldData || !silverData || !goldData.price_gram_24k) {
        console.log('API did not return valid gold or silver data.');
        return;
      }

      const base24kPrice = Math.round(goldData.price_gram_24k * 10) + 6999;
      const price22k = Math.round(base24kPrice * 0.916);
      const price18k = Math.round(base24kPrice * 0.75);
      const price14k = Math.round(base24kPrice * 0.6); 
      const silverPricePerKg = Math.round(silverData.price_gram_24k * 1100);
      setLiveDataPrice(oldValue => [
        {
          id: 1,
          item: 'Gold',
          qty: '24 karat',
          price: base24kPrice,
          up: upFlagManager(oldValue, 1, base24kPrice),
        },
        {
          id: 2,
          item: 'Gold',
          qty: '22 karat',
          price: price22k,
          up: upFlagManager(oldValue, 2, price22k),
        },
        {
          id: 5,
          item: 'Gold',
          qty: '18 karat',
          price: price18k,
          up: upFlagManager(oldValue, 5, price18k),
        },
        {
          id: 7,
          item: 'Gold',
          qty: '14 karat',
          price: price14k,
          up: upFlagManager(oldValue, 7, price14k),
        },
        {
          id: 9,
          item: 'Silver',
          qty: '',
          price: silverPricePerKg,
          up: upFlagManager(oldValue, 9, silverPricePerKg),
        },
      ]);
    } catch (error) {
      console.log('Error fetching live prices:', error);
    }
  };

  useEffect(() => {
    const onFocus = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      liveApiPriceHandler();
      intervalRef.current = setInterval(() => {
        liveApiPriceHandler();
      }, 5000); 
    };

    const onBlur = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const focusListener = navigation.addListener('focus', onFocus);
    const blurListener = navigation.addListener('blur', onBlur);

    // Cleanup function when the component unmounts
    return () => {
      focusListener();
      blurListener();
      onBlur(); // Ensure interval is cleared on unmount
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
        }}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        data={liveDataPrice || []}
        renderItem={renderItem}
        keyExtractor={(item: any) => `${item.id}`} // Use a unique ID for the key
      />
    </Box>
  );
};