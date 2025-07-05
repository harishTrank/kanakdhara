import React from 'react';
import {Image, Box, Text, HStack, Pressable} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, TouchableOpacity} from 'react-native';

import {DrawerNavigationProps} from '../../../navigation/types';
import {Cart} from '../../../components/svg';
import {useGetGoldRates} from '../../../hooks/useGetGoldRates';
import {Colors} from '../../../utils/Colors';

export const HomeHeader = () => {
  const navigation: any = useNavigation<DrawerNavigationProps>();
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
            24k gold price INR {Number(goldPrice)}/10gm
          </Text>
        )}
      </Box>
      <HStack
        bg={'white'}
        justifyContent={'space-between'}
        px={5}
        py={1}
        alignItems={'center'}>
        {/* <Pressable p={2} onPress={() => navigation.toggleDrawer()} w={'30%'}>
          <Image
            source={require('../../../assets/icons/menuLine.png')}
            style={{
              height: 24,
              width: 24,
            }}
          />
        </Pressable> */}
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{width: '25%'}}>
          <Image
            source={require('../../../assets/icons/menuLine.png')}
            style={{
              height: 24,
              width: 24,
            }}
          />
        </TouchableOpacity>
        <Pressable
          onPress={() => navigation.navigate('Home')}
          w={'30%'}
          alignItems={'center'}
          p={2}>
          <Image
            source={require('../../../assets/new_logo.png')}
            w={12}
            h={12}
            resizeMode={'contain'}
            alt={'no img'}
          />
        </Pressable>
        <HStack w={'23%'}>
          <Pressable p={2} onPress={() => {}} mr={3}>
            <Ionicons name="search" size={25} color="#FFF" />
          </Pressable>
          <Pressable p={2} onPress={() => navigation.navigate('Cart')}>
            <Cart width={25} height={25} color={'#000'} />
          </Pressable>
        </HStack>
      </HStack>
    </SafeAreaView>
  );
};
