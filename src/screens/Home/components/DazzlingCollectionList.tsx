import React from 'react';
import {FlatList, View, Image, Text, Dimensions} from 'react-native';

const {height, width}: any = Dimensions.get('window');

const DazzlingCollectionList = ({DazzlingList}: any) => {
  const dazzlingRenderItem = ({item}: any) => {
    return (
      <View>
        <View
          style={{
            marginHorizontal: 5,
            borderRadius: 5,
            backgroundColor: '#FFF',
          }}>
          <Image
            source={{uri: item?.images?.[0]?.src}}
            style={{
              height: height * 0.21,
              width: width * 0.45,
              borderRadius: 5,
              resizeMode: 'cover',
            }}
          />
        </View>

        <Text
          style={{
            color: '#1A1A1A',
            marginLeft: 5,
            marginTop: 5,
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 13,
          }}>
          {item?.name}
        </Text>
        <Text
          style={{
            color: '#1A1A1A',
            marginLeft: 5,
            marginBottom: 5,
            fontFamily: 'Montserrat-Regular',
            fontSize: 10,
          }}>
          Collection
        </Text>
      </View>
    );
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={DazzlingList}
      style={{
        paddingHorizontal: 5,
      }}
      renderItem={dazzlingRenderItem}
      keyExtractor={item => `${item.id + Math.random()}`}
    />
  );
};

export default DazzlingCollectionList;
