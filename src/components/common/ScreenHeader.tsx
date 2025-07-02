import React, {FC} from 'react';
import {Box, Text, Pressable, HStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {DrawerNavigationProps} from '../../navigation/types';
import {useGetGoldRates} from '../../hooks/useGetGoldRates';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../../utils/Colors';

type Props = {
  heading?: string;
};

export const ScreenHeader: FC<Props> = ({heading}) => {
  const navigation = useNavigation<DrawerNavigationProps>();
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
        justifyContent={'space-between'}
        px={5}
        py={3}
        alignItems={'center'}>
        <Pressable onPress={() => navigation.goBack()} w={'20%'}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </Pressable>
        <Text
          w={'50%'}
          color={'black'}
          textAlign={'center'}
          fontWeight={'500'}
          fontSize={'md'}>
          {heading}
        </Text>
        <Box w={'20%'} />
      </HStack>
    </SafeAreaView>
  );
};
