import React from 'react';
import {
  FlatList,
  Text as TextNative,
  View,
  TouchableOpacity,
} from 'react-native';
import {Image, Box, Text} from 'native-base';

const TrendingModernList = ({TrendingList, navigation}: any) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={{
        paddingHorizontal: 5,
      }}
      data={TrendingList}
      renderItem={({item}: any) => {
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', {item})}
            style={{
              marginHorizontal: 5,
            }}>
            <Box
              w={160}
              h={140}
              borderRadius={5}
              alignItems={'center'}
              justifyContent={'center'}
              bg={'#FFF'}>
              <Image
                alt={'no img'}
                size={'lg'}
                source={{uri: item?.images?.[0]?.src}}
                resizeMode={'contain'}
              />
            </Box>
            <Text
              fontWeight={'500'}
              fontSize={'sm'}
              color={'#000'}
              w={160}
              numberOfLines={1}>
              {item?.name?.length > 15
                ? `${item?.name?.slice(0, 15)}...`
                : item?.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 10,
              }}>
              {item?.price && (
                <TextNative
                  style={{
                    fontFamily: 'Montserrat-Medium',
                    fontSize: 10,
                    color: '#1A1A1A',
                  }}>
                  {`₹${item?.variationProduct?.[0]?.price}`}
                </TextNative>
              )}
              <TextNative
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 10,
                  color: '#535353',
                  textDecorationStyle: 'solid',
                }}>
                {item?.soldItems}
              </TextNative>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={item => item.id}
    />
  );
};

export default TrendingModernList;
