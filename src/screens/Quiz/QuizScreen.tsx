import React, {FC} from 'react';
import {Box, Text, Radio, Button} from 'native-base';

import {ScreenHeader} from '../../components/common/ScreenHeader';
import {RootStackScreenProps} from '../../navigation/types';
import {Colors} from '../../utils/Colors';

type Props = RootStackScreenProps<'quiz'>;

export const QuizScreen: FC<Props> = () => {
  return (
    <Box flex={1} bg={'#fff'}>
      <ScreenHeader heading={'Solve 10 Questions'} />
      <Box px={5} mt={3}>
        <Text fontWeight={'500'} fontSize={'sm'} color={Colors.primary}>
          Question 1/10
        </Text>
        <Text my={2} fontWeight={'500'} fontSize={'md'} color={'black'}>
          Who served as the first Deputy Prime Minister of independent India ?
        </Text>
        <Radio.Group
          defaultValue="1"
          name="myRadioGroup"
          accessibilityLabel="Pick your favorite number">
          <Radio
            value="1"
            my={1}
            _text={{fontWeight: '500', fontSize: 'sm', color: 'black'}}>
            Sardar Vallabhbhai Patel
          </Radio>
          <Radio
            value="2"
            my={1}
            _text={{fontWeight: '500', fontSize: 'sm', color: 'black'}}>
            Mahatma Gandhi
          </Radio>
          <Radio
            value="3"
            my={1}
            _text={{fontWeight: '500', fontSize: 'sm', color: 'black'}}>
            Subhas Chandra Bose
          </Radio>
          <Radio
            value="4"
            my={1}
            _text={{fontWeight: '500', fontSize: 'sm', color: 'black'}}>
            Jawaharlal Nehru
          </Radio>
        </Radio.Group>
      </Box>
      <Text
        position={'absolute'}
        bottom={110}
        textAlign={'center'}
        alignSelf={'center'}
        fontWeight={'500'}
        fontSize={'sm'}
        color={Colors.textColor}>
        25 seconds
      </Text>
      <Button
        m={5}
        position={'absolute'}
        bottom={0}
        w={'90%'}
        alignSelf={'center'}
        _text={{fontWeight: '600', fontSize: 'md'}}>
        Next
      </Button>
    </Box>
  );
};
