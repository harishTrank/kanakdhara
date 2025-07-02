import React, {FC} from 'react';
import {Box, Text} from 'native-base';

import {RootStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';

type Props = RootStackScreenProps<'Notification'>;

export const NotificationScreen: FC<Props> = () => {
  return (
    <Box flex={1} color={'white'}>
      <ScreenHeader heading={'Notifications'} />
      <Box flex={1} alignItems={'center'} justifyContent={'center'}>
        <Text fontWeight={'600'} fontSize={'md'}>
          No notifications yet!
        </Text>
      </Box>
    </Box>
  );
};
