import React, {useState} from 'react';
import {Box, Text, Pressable, HStack, Input} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {DrawerNavigationProps} from '../../navigation/types';

export const SearchHeader = ({searchText, setSearchText}: any) => {
  const navigation = useNavigation<DrawerNavigationProps>();

  return (
    <SafeAreaView edges={['top']}>
      <Box bg={'black'} p={1}>
        <Text
          color={'primary.400'}
          textAlign={'center'}
          fontWeight={'500'}
          fontSize={'sm'}>
          10g of 24k gold price 61,525.00 + 478
        </Text>
      </Box>
      <HStack
        justifyContent={'space-between'}
        px={5}
        py={3}
        alignItems={'center'}>
        <Pressable onPress={() => navigation.goBack()} w={'10%'}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </Pressable>
        <Input
          variant="filled"
          placeholder="Search For Id, Category and more."
          colorScheme={'white'}
          borderColor={'#f3f3f3'}
          backgroundColor={'#f3f3f3'}
          focusOutlineColor={'#f3f3f3'}
          shadow={2}
          size={'md'}
          height={8}
          py={0}
          px={3}
          value={searchText}
          onChangeText={setSearchText}
          w={'80%'}
        />
        <Pressable
          onPress={() => navigation.goBack()}
          w={'10%'}
          alignItems={'flex-end'}>
          <Ionicons name="camera-outline" size={28} color="black" />
        </Pressable>
      </HStack>
    </SafeAreaView>
  );
};
