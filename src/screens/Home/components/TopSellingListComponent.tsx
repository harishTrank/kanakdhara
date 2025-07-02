import React from 'react';
import {
  FlatList,
  Text as TextNative,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text, Box, Image} from 'native-base';
import {getDecimalPart} from '../../../utils/userUtils';

export const TopSellingRenderItem = (
  item: any,
  navigation: any,
  height: any = 140,
  width: any = 160,
) => {
  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: 5,
      }}
      onPress={() => navigation.push('ProductDetail', {item})}>
      <Box
        w={width}
        h={height}
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
      <Text fontWeight={'500'} fontSize={'sm'} color={'#000'}>
        {width === 160
          ? item?.slug?.length > 15
            ? `${item?.slug?.slice(0, 15)}...`
            : item?.slug
          : item?.slug?.length > 10
          ? `${item?.slug?.slice(0, 10)}...`
          : item?.slug}
      </Text>
      <View
        style={
          width === 160 && {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 10,
          }
        }>
        {item.price && (
          <TextNative
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 10,
              color: '#1A1A1A',
            }}>
            {`₹${item?.variationProduct?.[0]?.price}`}
          </TextNative>
        )}

        {/* {item?.regular_price && (
          <TextNative
            style={{
              fontFamily: 'Montserrat-Medium',
              fontSize: 10,
              color: '#1A1A1A',
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }}>
            {`₹${item?.regular_price}`}
          </TextNative>
        )} */}

        {/* {item.sale_price && (
          <TextNative
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 10,
              color: '#0E7825',
            }}>
            {`${getDecimalPart(item.regular_price, item.sale_price)}% off`}
          </TextNative>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

const TopSellingListComponent = ({navigation, TopSellingList}: any) => {
  return (
    <FlatList
      style={{
        paddingHorizontal: 5,
      }}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={TopSellingList}
      renderItem={({item}: any) => TopSellingRenderItem(item, navigation)}
      keyExtractor={item => `${item.id + Math.random()}`}
    />
  );
};

export default TopSellingListComponent;
