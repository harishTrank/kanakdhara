import React, {FC} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {DrawerStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {Colors} from '../../utils/Colors';

type Props = DrawerStackScreenProps<'Setting'>;

export const SettingScreen: FC<Props> = ({navigation}) => {
  return (
    <Box flex={1} bg={'white'}>
      <ScreenHeader heading={'Settings'} />
      <Text p={5} fontWeight={'500'} fontSize={'md'} color={Colors.textColor}>
        Hello there!
      </Text>
      <Pressable onPress={() => navigation.navigate('Notification')}>
        <HStack
          shadow={5}
          p={4}
          alignItems={'center'}
          bg={'#fff'}
          borderBottomColor={Colors.textColor}
          borderBottomWidth={0.5}>
          <Ionicons name={'notifications'} size={20} color={Colors.primary} />
          <Text ml={3} fontWeight={'500'} fontSize={'md'} color={'#000'}>
            Notifications
          </Text>
        </HStack>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('updatePassword')}>
        <HStack
          shadow={5}
          p={4}
          alignItems={'center'}
          bg={'#fff'}
          borderTopColor={Colors.textColor}
          borderTopWidth={0.5}
          borderBottomColor={Colors.textColor}
          borderBottomWidth={0.5}>
          <Ionicons name={'lock-closed'} size={20} color={Colors.primary} />
          <Text ml={3} fontWeight={'500'} fontSize={'md'} color={'#000'}>
            Update Password
          </Text>
        </HStack>
      </Pressable>
      <Text p={5} fontWeight={'500'} fontSize={'md'} color={Colors.textColor}>
        Let the People know!
      </Text>
      <Pressable>
        <HStack
          shadow={5}
          p={4}
          alignItems={'center'}
          bg={'#fff'}
          borderBottomColor={Colors.textColor}
          borderBottomWidth={0.5}>
          <MaterialIcons name="feedback" size={20} color={Colors.primary} />
          <Text ml={3} fontWeight={'500'} fontSize={'md'} color={'#000'}>
            Send Feedback
          </Text>
        </HStack>
      </Pressable>
      <Pressable>
        <HStack
          shadow={5}
          p={4}
          alignItems={'center'}
          bg={'#fff'}
          borderTopColor={Colors.textColor}
          borderTopWidth={0.5}
          borderBottomColor={Colors.textColor}
          borderBottomWidth={0.5}>
          <Ionicons name={'share-social'} size={20} color={Colors.primary} />
          <Text ml={3} fontWeight={'500'} fontSize={'md'} color={'#000'}>
            Share App
          </Text>
        </HStack>
      </Pressable>
      <Pressable>
        <HStack
          shadow={5}
          p={4}
          alignItems={'center'}
          bg={'#fff'}
          borderTopColor={Colors.textColor}
          borderTopWidth={0.5}
          borderBottomColor={Colors.textColor}
          borderBottomWidth={0.5}>
          <Ionicons name={'star'} size={20} color={Colors.primary} />
          <Text ml={3} fontWeight={'500'} fontSize={'md'} color={'#000'}>
            Rate us
          </Text>
        </HStack>
      </Pressable>
      <Text p={5} fontWeight={'500'} fontSize={'md'} color={Colors.textColor}>
        Dangerous Area
      </Text>
      <Pressable>
        <HStack
          shadow={5}
          p={4}
          alignItems={'center'}
          bg={'#fff'}
          borderBottomColor={Colors.textColor}
          borderBottomWidth={0.5}>
          <MaterialIcons name="delete" size={20} color={Colors.primary} />
          <Text ml={3} fontWeight={'500'} fontSize={'md'} color={'#000'}>
            Delete Account
          </Text>
        </HStack>
      </Pressable>
    </Box>
  );
};
