import React from 'react';
import {TouchableOpacity, Image, View, Dimensions} from 'react-native';

const {height, width}: any = Dimensions.get('window');

const PurityCard = ({onPress, image}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        alt={'no img'}
        source={image}
        style={{
          width: width * 0.5 - 25,
          height: height * 0.1,
          borderRadius: 10,
          resizeMode: 'stretch',
          margin: 10,
        }}
      />
    </TouchableOpacity>
  );
};
const LookForPurityComponent = ({navigation}: any) => {
  return (
    <View
      style={{
        marginHorizontal: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <PurityCard image={require('../../../assets/homeBanner/Purity1.png')} onPress={() => navigation.navigate('LivePrice')} />
        <PurityCard image={require('../../../assets/homeBanner/Purity2.png')} onPress={() => navigation.navigate('LivePrice')} />
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <PurityCard image={require('../../../assets/homeBanner/Purity3.png')} onPress={() => navigation.navigate('LivePrice')} />
        <PurityCard image={require('../../../assets/homeBanner/Purity4.png')} onPress={() => navigation.navigate('LivePrice')} />
      </View>
    </View>
  );
};

export default LookForPurityComponent;
