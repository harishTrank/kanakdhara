import React, {FC} from 'react';
import {Box, Button, Icon, Image, StatusBar, Text} from 'native-base';
import {DrawerStackScreenProps} from '../../navigation/types';
import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {ScreenHeader} from '../../components/common/ScreenHeader';

type Props = DrawerStackScreenProps<'Wallet'>;

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

export const WalletScreen: FC<Props> = () => {
  return (
    <ImageBackground
      source={require('../../assets/img/WalletBg.png')}
      style={[styles.imgStyles]}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ScreenHeader heading={'Wallet'} />
      <Box p={5}>
        <Text fontWeight={'600'} fontSize={'md'} color={'black'}>
          Available Balance
        </Text>
        <Text fontWeight={'600'} fontSize={'xl'} color={'primary.400'}>
          ₹ 12000
        </Text>
      </Box>
      <Button
        m={5}
        _text={{fontWeight: '400', fontSize: 'md'}}
        endIcon={<Icon as={Feather} name="arrow-down-left" size="sm" />}>
        Add
      </Button>
      <Button
        mx={5}
        variant={'outline'}
        borderWidth={1}
        borderColor={'primary.400'}
        _text={{fontWeight: '400', fontSize: 'md', color: 'primary.400'}}
        endIcon={<Icon as={Feather} name="arrow-up-right" size="sm" />}>
        Request
      </Button>
      <Text px={5} py={3} fontWeight={'600'} fontSize={'md'} color={'black'}>
        Saved Credit Cards
      </Text>
      <Image
        source={require('../../assets/img/Card.png')}
        w={WIDTH - 50}
        h={(WIDTH - 50) / 1.8}
        alt={'no img'}
        alignSelf={'center'}
        resizeMode={'contain'}
      />
      <Text
        py={2}
        fontWeight={'600'}
        fontSize={'sm'}
        color={'primary.400'}
        textAlign={'center'}
        textDecorationLine={'underline'}>
        Add more cards
      </Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imgStyles: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'white',
  },
});
