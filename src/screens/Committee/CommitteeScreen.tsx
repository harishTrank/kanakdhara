import React, {FC} from 'react';
import {ImageBackground} from 'react-native';
import {Box, FlatList, Pressable, Text} from 'native-base';

import {RootBottomTabScreenProps} from '../../navigation/types';
import {HomeHeader} from '../Home/components/HomeHeader';
import {CommitteeItem, CommitteeList} from '../../data/CommitteeList';

type Props = RootBottomTabScreenProps<'Committee'>;

export const CommitteeScreen: FC<Props> = ({navigation}) => {
  const renderItem = ({item, index}: {item: CommitteeItem; index: number}) => {
    return (
      <Pressable
        mx={5}
        mt={index === 0 ? 3 : 0}
        mb={5}
        onPress={() => navigation.navigate('CommitteeDetail')}>
        <Text fontWeight={'600'} fontSize={'md'} color={'black'}>
          {item.heading}
        </Text>
        <Text fontWeight={'500'} fontSize={'xs'} color={'black'} mb={2}>
          {item.subHeading}
        </Text>
        <ImageBackground
          source={item.banner}
          resizeMode={'cover'}
          style={{
            width: '100%',
            height: 120,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            fontWeight={'600'}
            fontSize={'md'}
            color={'#FFF'}
            textTransform={'uppercase'}>
            Join
          </Text>
        </ImageBackground>
      </Pressable>
    );
  };

  return (
    <Box flex={1} bg={'white'}>
      <HomeHeader />
      <FlatList
        data={CommitteeList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};
