import React, {FC, useState} from 'react';
import {
  Box,
  Button,
  FlatList,
  HStack,
  Image,
  Input,
  Modal,
  Pressable,
  Text,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {RootStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {Colors} from '../../utils/Colors';
import {ImageBackground} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = RootStackScreenProps<'CommitteeDetail'>;

const userList = [2, 3, 4, 5, 6, 7, 8];

export const CommitteeDetailScreen: FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}: {item: number}) => {
    return (
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        mx={5}
        mb={3}>
        <HStack alignItems={'center'}>
          <Text fontWeight={'600'} color={'#000'} fontSize={'md'}>
            #{item}
          </Text>
          <Image
            source={require('../../assets/user.jpg')}
            size={'sm'}
            alt={'np img'}
            borderRadius={100}
            mx={2}
          />
          <Text fontWeight={'600'} color={'#000'} fontSize={'md'}>
            Deepak
          </Text>
        </HStack>
        <Text fontWeight={'600'} color={Colors.textColor} fontSize={'md'}>
          1320
        </Text>
      </HStack>
    );
  };

  const listHeaderComponent = () => {
    return (
      <Box mx={5}>
        <ImageBackground
          source={require('../../assets/img/comitteeBg.png')}
          resizeMode={'stretch'}
          style={{
            width: '100%',
            height: 160,
            alignSelf: 'center',
          }}>
          <Text
            alignSelf={'flex-end'}
            color={'white'}
            p={3}
            fontWeight={'600'}
            fontSize={'2xl'}>
            Score: 1445
          </Text>
          <Text
            position={'absolute'}
            bottom={0}
            right={0}
            pr={3}
            fontWeight={'600'}
            color={'white'}
            fontSize={'5xl'}>
            #1
          </Text>
        </ImageBackground>
        <Image
          source={require('../../assets/user.jpg')}
          w={110}
          h={110}
          alt={'np img'}
          borderRadius={100}
          mt={-60}
          alignSelf={'center'}
        />
        <Text
          fontWeight={'600'}
          color={'black'}
          fontSize={'md'}
          textAlign={'center'}>
          Harisha
        </Text>
        {/*<Box*/}
        {/*  bg={'red.400'}*/}
        {/*  px={2}*/}
        {/*  py={1}*/}
        {/*  borderRadius={5}*/}
        {/*  position={'absolute'}*/}
        {/*  left={200}*/}
        {/*  bottom={0}*/}
        {/*  alignSelf={'center'}>*/}
        {/*  <Ionicons name={'star'} color={'white'} size={18} />*/}
        {/*</Box>*/}
      </Box>
    );
  };

  return (
    <Box flex={1} bg={'#fff'}>
      <ScreenHeader heading={'Monthly Committee'} />
      <HStack
        my={3}
        mx={5}
        bg={'#f3f3f3'}
        p={3}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <HStack>
          <Ionicons name="person" size={22} color={Colors.primary} />
          <Text fontWeight={'500'} color={'#000'} fontSize={'sm'}>
            {' '}
            88/100 Members
          </Text>
        </HStack>
        <HStack>
          <MaterialCommunityIcons
            name="clock"
            size={22}
            color={Colors.primary}
          />
          <Text fontWeight={'500'} color={'#000'} fontSize={'sm'}>
            {' '}
            23 Days left
          </Text>
        </HStack>
      </HStack>
      <HStack
        mb={3}
        mx={3}
        p={3}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Box>
          <Text fontWeight={'500'} color={'#000'} fontSize={'md'}>
            Leaderboard
          </Text>
          <Text fontWeight={'500'} color={'#000'} fontSize={'2xs'}>
            Top Performers during this period of month
          </Text>
        </Box>
        <HStack alignItems={'center'} alignSelf={'flex-end'}>
          <Text
            fontWeight={'500'}
            color={Colors.primary}
            fontSize={'2xs'}
            ml={1}
            textDecorationLine={'underline'}>
            Solve 10 Question{' '}
          </Text>
          <Entypo name="info-with-circle" size={12} color={Colors.primary} />
        </HStack>
      </HStack>

      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={item => String(item)}
        ListHeaderComponent={listHeaderComponent}
      />
      <Button
        onPress={() => {
          setModalVisible(true);
        }}
        m={5}
        _text={{fontWeight: '500', color: 'white'}}>
        Join Committee
      </Button>
      <Modal isOpen={modalVisible} onClose={setModalVisible}>
        <Modal.Content mb={0} mt={'auto'} w={'100%'}>
          <Box p={5}>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Text fontWeight={'500'} color={'black'} fontSize={'lg'}>
                Monthly Committee
              </Text>
              <Pressable
                p={3}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <AntDesign
                  name="close"
                  size={24}
                  color={'rgba(31,31,31,0.82)'}
                />
              </Pressable>
            </HStack>

            <Text
              fontWeight={'600'}
              color={'black'}
              my={2}
              fontSize={'sm'}
              textAlign={'center'}>
              Scan the QR code given below and Submit the transaction Id shown.
            </Text>
            <Text
              fontWeight={'600'}
              color={'black'}
              my={2}
              fontSize={'md'}
              textAlign={'center'}>
              Payment of 1000{' '}
            </Text>
            <Image
              source={require('../../assets/img/qrcode.png')}
              w={160}
              h={160}
              mb={10}
              alt={'no img'}
              alignSelf={'center'}
            />
            <Text fontWeight={'500'} color={Colors.textColor} fontSize={'sm'}>
              Transaction Id
            </Text>
            <Input
              _input={{
                selectionColor: '#000',
                cursorColor: '#000',
              }}
              variant="outline"
              focusOutlineColor={'primary.400'}
              colorScheme={'primary'}
              color={'black'}
              fontFamily="body"
              fontSize={'sm'}
              cursorColor={'#000'}
              selectionColor={Colors.grey}
              mb={8}
            />
            <Button
              _text={{fontWeight: '500', color: 'white'}}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('quiz');
              }}>
              Next
            </Button>
          </Box>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
