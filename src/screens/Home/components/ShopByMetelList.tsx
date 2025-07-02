import React from 'react';
import {View, TouchableOpacity, Image, Dimensions, Text} from 'react-native';

const {width}: any = Dimensions.get('window');

const MetalCard = ({onPress, title, image}: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={image}
        style={{
          width: width * 0.27,
          height: width * 0.22,
          resizeMode: 'contain',
          marginBottom: 5,
        }}
      />
      <Text
        style={{
          color: '#1A1A1A',
          fontSize: 12,
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const ShopByMetelList = ({navigation}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 20,
      }}>
      <MetalCard
        title={'Diamond'}
        image={require('../../../assets/homeBanner/Metal1.png')}
        onPress={() => navigation.navigate('Category')}
      />
      <MetalCard
        title={'Gold'}
        image={require('../../../assets/homeBanner/Metal2.png')}
        onPress={() => navigation.navigate('Category')}
      />
      <MetalCard
        title={'Silver'}
        image={require('../../../assets/homeBanner/Metal3.png')}
        onPress={() => navigation.navigate('Category')}
      />
    </View>
  );
};

export default ShopByMetelList;
