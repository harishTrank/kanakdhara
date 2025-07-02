import React, {FC, useEffect, useState} from 'react';
import {Box, FlatList, HStack, Image, Pressable, Text} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Platform} from 'react-native';
import {RootStackScreenProps} from '../../navigation/types';
import {SearchHeader} from '../../components/common/SearchHeader';
import {usecustomSearch} from '../../hooksQuery/Home/mutation';
import {TopSellingRenderItem} from '../Home/components/TopSellingListComponent';

type Props = RootStackScreenProps<'Search'>;

const ProductArray = [1, 2, 3, 4, 5, 6];

const searchArray = [
  'Fast Delivery',
  'New',
  'Gold Chain',
  'Gold coins for Diwali',
  'Jewels for babies',
];

export const SearchScreen: FC<Props> = ({navigation}) => {
  const customSearchApi: any = usecustomSearch();
  const [searchText, setSearchText]: any = useState('');
  const [collectionList, setCollectionList]: any = useState([]);
  const getSearchResultDataHandler = () => {
    customSearchApi
      .mutateAsync({
        body: {
          search: searchText,
          per_page: 10,
          ios: Platform.OS === 'ios' ? true : false,
        },
      })
      .then((res: any) => {
        setCollectionList(res?.products?.data);
      })
      .catch((error: any) => {
        console.log(error, 'error');
      });
  };

  useEffect(() => {
    getSearchResultDataHandler();
  }, [searchText]);

  const render = ({item, index}: {item: number; index: number}) => {
    return (
      <Pressable
        key={item}
        w={150}
        h={200}
        mr={5}
        mb={3}
        ml={index === 0 ? 5 : 0}
        onPress={() => navigation.navigate('ProductDetail')}>
        <Box
          bg={'#f7f7f7'}
          alignItems={'center'}
          justifyContent={'center'}
          p={3}>
          <Image
            source={require('../../assets/homeBanner/15.png')}
            size={'md'}
            alt={'no img'}
          />
        </Box>
        <Text
          fontWeight={'500'}
          fontSize={'sm'}
          color={'black'}
          numberOfLines={1}>
          Zephyr Gems
        </Text>
        <Text fontWeight={'400'} fontSize={'xs'} color={'black'}>
          ₹54000 <Text textDecorationLine={'line-through'}>₹58000</Text>
          <Text color={'#3b8126'} fontWeight={'600'}>
            {' '}
            20% off
          </Text>
        </Text>
      </Pressable>
    );
  };
  return (
    <Box bg={'#fff'} flex={1}>
      <SearchHeader searchText={searchText} setSearchText={setSearchText} />
      <Box py={3}>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          mb={1}
          px={5}>
          <Text fontWeight={'600'} fontSize={'lg'} color={'#000'}>
            Recent Search
          </Text>
          <Text
            fontWeight={'500'}
            fontSize={'sm'}
            color={'primary.400'}
            textDecorationLine={'underline'}>
            Clear all
          </Text>
        </HStack>
        <HStack mb={5} px={5}>
          <Box
            px={2}
            py={1}
            mr={2}
            borderRadius={100}
            borderWidth={1}
            alignItems={'center'}>
            <Text fontWeight={'400'} fontSize={'sm'} color={'#000'}>
              22k Gold Chain
            </Text>
          </Box>
          <Box
            px={2}
            py={1}
            mr={2}
            borderRadius={100}
            borderWidth={1}
            alignItems={'center'}>
            <Text fontWeight={'400'} fontSize={'sm'} color={'#000'}>
              Gold Earring
            </Text>
          </Box>
        </HStack>
        <Text fontWeight={'600'} fontSize={'lg'} color={'#000'} px={5}>
          Trending Search
        </Text>
        <HStack flexWrap={'wrap'} px={5}>
          {searchArray.map(m => (
            <HStack
              px={2}
              py={1}
              mr={2}
              mt={3}
              borderRadius={100}
              borderWidth={1}
              alignItems={'center'}>
              <Text fontWeight={'400'} fontSize={'sm'} color={'#000'}>
                {m}
                {'  '}
                <FontAwesome5 name="fire" size={15} color="red" />
              </Text>
            </HStack>
          ))}
        </HStack>
        <Text mt={5} fontWeight={'600'} fontSize={'lg'} color={'#000'} px={5}>
          Explore our New Collection
        </Text>
        <Text fontWeight={'400'} fontSize={'sm'} color={'#000'} px={5}>
          Stay Fashion-Forward with the Latest
        </Text>
        <FlatList
          data={collectionList}
          renderItem={({item}: any) => TopSellingRenderItem(item, navigation)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          my={5}
        />
      </Box>
    </Box>
  );
};
