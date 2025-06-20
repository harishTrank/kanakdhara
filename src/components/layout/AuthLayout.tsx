import React, {FC} from 'react';
import {Pressable, ArrowBackIcon, StatusBar} from 'native-base';
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {AuthNavigationProps} from '../../navigation/types';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

type Props = {
  children: React.ReactNode;
  img: ImageSourcePropType;
};

export const AuthLayout: FC<Props> = ({children, img}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<AuthNavigationProps>();
  return (
    <ImageBackground source={img} style={[styles.imgStyles, {paddingTop: top}]}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Pressable
        position={'absolute'}
        pl={5}
        pt={45}
        pr={2}
        pb={2}
        onPress={() => navigation.goBack()}>
        <ArrowBackIcon size={'lg'} color={'white'} />
      </Pressable>
      {children}
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
