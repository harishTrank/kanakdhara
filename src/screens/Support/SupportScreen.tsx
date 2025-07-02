import React, {FC} from 'react';
import {Box, HStack, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {RootBottomTabScreenProps} from '../../navigation/types';
import {HomeHeader} from '../Home/components/HomeHeader';

type Props = RootBottomTabScreenProps<'Support'>;

export const SupportScreen: FC<Props> = () => {
  const contactNumber = '+919255559010';
  const handleCallPress = () => {
    Linking.openURL(`tel:${contactNumber}`);
  };

  const handleMessagePress = () => {
    Linking.openURL(`sms:${contactNumber}`);
  };

  const handleWhatsAppPress = () => {
    Linking.openURL(`whatsapp://send?phone=${contactNumber}`);
  };
  return (
    <Box flex={1} bg={'white'}>
      <HomeHeader />
      <Text fontWeight={'600'} fontSize={'lg'} color={'black'} mt={5} px={5}>
        Facing any issues?
      </Text>
      <Text fontWeight={'600'} fontSize={'xs'} color={'black'} px={5}>
        {
          'Connect with our team and they will help you out with\nanything that you need.'
        }
      </Text>
      <HStack m={5} justifyContent={'space-between'}>
        <Box
          w={'30%'}
          h={100}
          justifyContent={'center'}
          alignItems={'center'}
          bg={'white'}
          borderWidth={2}
          borderColor={'red.400'}
          borderRadius={10}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleCallPress}>
            <Ionicons name="call" size={24} color="red" />
            <Text fontWeight={'600'} fontSize={'sm'} color={'black'}>
              Call us
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          w={'30%'}
          h={100}
          justifyContent={'center'}
          alignItems={'center'}
          bg={'white'}
          borderWidth={2}
          borderColor={'#268df6'}
          borderRadius={10}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={handleMessagePress}>
            <AntDesign name="message1" size={24} color={'#268df6'} />
            <Text fontWeight={'600'} fontSize={'sm'} color={'black'}>
              Chat with us
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          w={'30%'}
          h={100}
          justifyContent={'center'}
          alignItems={'center'}
          bg={'white'}
          borderWidth={2}
          borderColor={'#56c515'}
          borderRadius={10}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={handleWhatsAppPress}>
            <Ionicons name="logo-whatsapp" size={24} color={'#56c515'} />
            <Text fontWeight={'600'} fontSize={'sm'} color={'black'}>
              Whatsapp
            </Text>
          </TouchableOpacity>
        </Box>
      </HStack>
      <Text fontWeight={'600'} fontSize={'sm'} color={'black'} px={5}>
        Available all 365 days between 9AM to 9PM
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
