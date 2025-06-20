import React from 'react';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import {Themes, Colors} from '../../../utils/Colors';
import FastImage from 'react-native-fast-image';

const CircularCardList = ({categoryList, navigation}: any) => {
  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
        onPress={() =>
          navigation.navigate('Category', {itemid: item.id, index: index})
        }>
        <View
          style={{
            backgroundColor: '#FFF',
            ...Themes.elevationLight,
            borderRadius: 100,
          }}>
          {item?.image?.src && (
            <FastImage
              source={{
                uri: item?.image?.src,
                priority: FastImage.priority.normal,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: Colors.primary,
                backgroundColor: Colors.white,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        </View>
        <Text
          fontWeight={'500'}
          color={'#4A4A4A'}
          textTransform={'capitalize'}
          style={{
            fontSize: 10,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={categoryList}
      renderItem={renderItem}
      keyExtractor={(item: any) => `${item.id + Math.random()}`}
    />
  );
};

export default CircularCardList;
