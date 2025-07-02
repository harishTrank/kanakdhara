import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  Checkbox,
  FlatList,
  HStack,
  Input,
  Text,
} from 'native-base';

import {RootStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';

type Props = RootStackScreenProps<'Coupon'>;

const CouponList = [1];

export const CouponScreen: FC<Props> = () => {
  const [min, setMin] = useState('');
  const [groupValues, setGroupValues] = React.useState(['1', '2', '3']);

  const renderItem = ({_, index}: {_: any; index: number}) => {
    return (
      <HStack
        p={3}
        shadow={2}
        justifyContent={'space-between'}
        bg={'#fff'}
        mb={2}
        mt={index === 0 ? 3 : 0}
        alignSelf={'center'}
        w={'95%'}>
        <Box>
          <Button
            variant={'outline'}
            borderColor={'primary.400'}
            borderWidth={2}
            w={'50%'}
            borderRadius={10}
            _text={{fontSize: 'md', fontWeight: '600'}}>
            First Purchase
          </Button>
          <Text mt={1} fontSize={'sm'} fontWeight={'500'} color={'#000'}>
            Save ₹3000
          </Text>
          <Text my={0.5} fontSize={'xs'} fontWeight={'500'} color={'#000'}>
            Save ₹3000 on the minimum purchase of ₹50000
          </Text>
          <Text fontSize={'sm'} fontWeight={'500'} color={'#000'}>
            Expire: 12 August 2023 | 12:00PM
          </Text>
        </Box>
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
    );
  };

  return (
    <Box flex={1} bg={'white'}>
      <ScreenHeader heading={'Select Coupon'} />
      <Input
        variant="filled"
        placeholder="Enter your coupon here"
        colorScheme={'white'}
        borderColor={'#f3f3f3'}
        backgroundColor={'#f3f3f3'}
        focusOutlineColor={'#f3f3f3'}
        size={'md'}
        px={3}
        value={min}
        onChangeText={text => setMin(text)}
        w={'95%'}
        alignSelf={'center'}
        InputRightElement={
          <Text color={'primary.400'} px={3} fontWeight={'500'} fontSize={'sm'}>
            Apply
          </Text>
        }
      />
      <FlatList
        data={CouponList}
        renderItem={renderItem}
        keyExtractor={item => item}
      />
    </Box>
  );
};
