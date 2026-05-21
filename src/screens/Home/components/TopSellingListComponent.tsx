import React from 'react';
import {
  Dimensions,
  FlatList,
  Text as TextNative,
  TouchableOpacity,
  View,
} from 'react-native';

import {Text, Box, Image} from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CARD_WIDTH = (SCREEN_WIDTH - 40) / 3;

export const TopSellingRenderItem = (
  item: any,
  navigation: any,
  cardWidth: number = CARD_WIDTH,
  height: any = CARD_WIDTH + 10,
) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: cardWidth,
        marginBottom: 18,
      }}
      onPress={() => navigation.push('ProductDetail', {item})}>
      <Box
        width={cardWidth - 8}
        height={height}
        borderRadius={12}
        alignItems={'center'}
        justifyContent={'center'}
        bg={'#F8F8F8'}
        alignSelf={'center'}>
        <Image
          alt={'no img'}
          width={'85%'}
          height={'85%'}
          source={{uri: item?.images?.[0]?.src}}
          resizeMode={'contain'}
        />
      </Box>

      <Text
        mt={2}
        fontWeight={'600'}
        fontSize={'xs'}
        color={'#111827'}
        numberOfLines={1}>
        {item?.name}
      </Text>

      {item?.variationProduct?.[0]?.price && (
        <TextNative
          style={{
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 12,
            color: '#111827',
            marginTop: 4,
          }}>
          ₹{item?.variationProduct?.[0]?.price}
        </TextNative>
      )}
    </TouchableOpacity>
  );
};

const TopSellingListComponent = ({navigation, TopSellingList}: any) => {
  return (
    <FlatList
      data={TopSellingList}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `${item?.id}-${index}`}
      contentContainerStyle={{
        paddingHorizontal: 12,
      }}
      renderItem={({item}: any) => TopSellingRenderItem(item, navigation)}
    />
  );
};

export default TopSellingListComponent;
