import React, {FC} from 'react';
import {Box, Button, Image, Text} from 'native-base';

import {RootStackScreenProps} from '../../../navigation/types';
import {ScreenHeader} from '../../../components/common/ScreenHeader';
import {Colors} from '../../../utils/Colors';

type Props = RootStackScreenProps<'PaymentConfirmation'>;

export const PaymentConfirmationScreen: FC<Props> = () => {
  return (
    <Box flex={1} bg={'#fff'}>
      <ScreenHeader />
      <Box flex={1} bg={'#fff'} justifyContent={'center'} alignItems={'center'}>
        <Image
          source={require('../../../assets/img/paymentSuccess.png')}
          w={100}
          h={100}
          alt={'no img'}
          resizeMode={'contain'}
        />
        <Text fontSize={'xl'} fontWeight={'600'} color={'rgba(47,119,20,0.98)'}>
          Thank you for the order!
        </Text>
        <Text fontSize={'md'} fontWeight={'600'} color={Colors.textColor}>
          You have successfully placed an order.
        </Text>
        <Text fontSize={'md'} fontWeight={'600'} color={Colors.textColor}>
          We will call to verify the order.
        </Text>
      </Box>
      <Button m={5} _text={{fontWeight: '600', fontSize: 'md'}}>
        Done
      </Button>
    </Box>
  );
};
