import React, {FC} from 'react';
import {Box, Text, Pressable, HStack, ArrowBackIcon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {BottomNavigationProps} from '../../navigation/types';
import {Cart} from '../svg';
import {useGetGoldRates} from '../../hooks/useGetGoldRates';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../../utils/Colors';

type Props = {
  heading?: string;
};

export const Header: FC<Props> = ({heading}) => {
  const navigation = useNavigation<BottomNavigationProps>();
  const {goldPrice, isLoading} = useGetGoldRates();

  return (
    <SafeAreaView edges={['top']}>
      <Box bg={'black'} p={1}>
        {isLoading ? (
          <ActivityIndicator
            size={'small'}
            color={Colors.primary}
            style={{alignSelf: 'center'}}
          />
        ) : (
          <Text
            color={'primary.400'}
            textAlign={'center'}
            fontWeight={'500'}
            fontSize={'sm'}>
            24k gold price INR {goldPrice}
          </Text>
        )}
      </Box>
      <HStack
        bg={'#FFF'}
        justifyContent={'space-between'}
        px={5}
        py={3}
        alignItems={'center'}>
        <Pressable onPress={() => navigation.goBack()} w={'30%'}>
          {/*<Ionicons name="ios-aeroplane" size={28} color="black" />*/}
          {/*<Ionicons name="arrow-back" size={28} color="black" />*/}
          <ArrowBackIcon size={'lg'} color={'black'} />
        </Pressable>
        <Text
          w={'30%'}
          color={'black'}
          textAlign={'center'}
          fontWeight={'500'}
          fontSize={'md'}>
          {heading}
        </Text>
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          w={'30%'}
          alignItems={'flex-end'}>
          <Cart width={25} height={25} color={'#000'} />
        </Pressable>
      </HStack>
    </SafeAreaView>
  );
};
