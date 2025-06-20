import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {Text} from 'native-base';

const data = [
  {image: require('../../../assets/homeBanner/5.png'), title: 'Above 1 Lakh'},
  {image: require('../../../assets/homeBanner/6.png'), title: 'Below 1 Lakh'},
  {image: require('../../../assets/homeBanner/7.png'), title: 'Below 50K'},
  {image: require('../../../assets/homeBanner/8.png'), title: 'Below 20K'},
];

const {width}: any = Dimensions.get('window');

const FourImageView = () => {
  return (
    <View
      style={{
        marginHorizontal: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View>
          <Image
            source={data[0].image}
            style={{
              width: width * 0.56,
              height: width * 0.35,
              marginBottom: 15,
              marginRight: 10,
              borderRadius: 5,
            }}
          />
          <Text
            fontWeight={'600'}
            color={'#FFF'}
            fontSize={'sm'}
            ml={2}
            style={{
              position: 'absolute',
              top: width * 0.29,
              fontSize: 13,
              //   top: width * 0.55,
            }}>
            {data[0].title}
          </Text>
        </View>

        <View>
          <Image
            source={data[1].image}
            style={{
              width: width * 0.3,
              height: width * 0.35,
              marginLeft: 5,
              borderRadius: 5,
            }}
          />
          <Text
            fontWeight={'600'}
            color={'#FFF'}
            fontSize={'sm'}
            ml={2}
            style={{
              position: 'absolute',
              top: width * 0.29,
              left: 3,
              fontSize: 13,
            }}>
            {data[1].title}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={data[2].image}
            style={{
              width: width * 0.3,
              height: width * 0.35,
              borderRadius: 5,
              marginRight: 15,
            }}
          />
          <Text
            fontWeight={'600'}
            color={'#FFF'}
            fontSize={'sm'}
            ml={2}
            style={{
              position: 'absolute',
              top: width * 0.29,
              fontSize: 13,
            }}>
            {data[2].title}
          </Text>
        </View>

        <View style={{flex: 2}}>
          <Image
            source={data[3].image}
            style={{
              width: width * 0.56,
              height: width * 0.35,
              marginBottom: 15,
              marginRight: 10,
              borderRadius: 5,
            }}
          />
          <Text
            fontWeight={'600'}
            color={'#FFF'}
            fontSize={'sm'}
            ml={2}
            style={{
              position: 'absolute',
              top: width * 0.29,
              fontSize: 13,
            }}>
            {data[3].title}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FourImageView;
