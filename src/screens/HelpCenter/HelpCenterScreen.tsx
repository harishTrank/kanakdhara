import React, {FC} from 'react';
import {Box, Text} from 'native-base';
import {DrawerStackScreenProps} from '../../navigation/types';

type Props = DrawerStackScreenProps<'HelpCenter'>;

export const HelpCenterScreen: FC<Props> = () => {
  return (
    <Box>
      <Text>Hi</Text>
    </Box>
  );
};
