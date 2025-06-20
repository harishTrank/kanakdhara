import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from '@react-navigation/drawer/lib/typescript/src/types';
import {DrawerNavigationState, ParamListBase} from '@react-navigation/native';
import React, {JSX, ReactNode, RefAttributes, useEffect, useState} from 'react';
import {ScrollViewProps, ScrollView} from 'react-native/types';
import {Text, Image, Box, HStack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ActivityIndicator, Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import {Colors} from '../../utils/Colors';
import {logout} from '../../store/auth/authSlice';
import {useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {getUserProfile} from '../../store/user/userSlice';
import {logoutApiManage} from '../../QueryStore/Services/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';

export function CustomDrawerContent(
  props:
    | (JSX.IntrinsicAttributes &
        ScrollViewProps & {children: ReactNode} & RefAttributes<ScrollView>)
    | (JSX.IntrinsicAttributes & {
        state: DrawerNavigationState<ParamListBase>;
        navigation: DrawerNavigationHelpers;
        descriptors: DrawerDescriptorMap;
      }),
) {
  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(true);
  const [userImage, setUserImage] = useState('');

  const logoutHandler = async () => {
    await dispatch(logout()).unwrap();
    const userId: any = await AsyncStorage.getItem('accessToken');
    logoutApiManage({
      query: {
        user_id: JSON.parse(userId)?.userId,
      },
    })
      .then(async () => {
        await AsyncStorage.clear();
        showMessage({
          message: 'Logout SuccessFully !',
          type: 'success',
        });
      })
      .catch((err: any) => console.log('something went wrong..'));
  };

  const onClickHandler = () =>
    Alert.alert('Wait!', 'Are you sure you want to exit the app ?', [
      {
        text: 'NO',
      },
      {text: 'YES', onPress: () => logoutHandler()},
    ]);

  useEffect(() => {
    (async () => {
      try {
        const userData = await dispatch(getUserProfile()).unwrap();
        if (userData) {
          setFirstName(userData.firstName);
          setUserImage(userData.picture);
        }
        setLoading(false);
      } catch (e: any) {
        setMessage(e.message);
        setLoading(false);
      }
    })();
  }, [firstName, userImage]);

  return (
    <DrawerContentScrollView {...props}>
      <HStack
        px={5}
        py={3}
        mb={3}
        alignItems={'center'}
        borderBottomWidth={1}
        borderBottomColor={'#D9D9D9'}>
        {loading ? (
          <ActivityIndicator size={'large'} color={Colors.primary} />
        ) : (
          <>
            <Image
              source={{uri: userImage}}
              alt={'no img'}
              w={16}
              h={16}
              borderRadius={10}
              mr={3}
            />
            <Box>
              <Text
                fontWeight={'500'}
                color={'primary.400'}
                fontSize={'lg'}
                textTransform={'capitalize'}>
                {firstName}
              </Text>
              <Text fontWeight={'500'} color={'black'} fontSize={'sm'}>
                Hello, there!
              </Text>
            </Box>
          </>
        )}
      </HStack>

      <DrawerItemList {...props} />
      <DrawerItem
        label={'Logout'}
        onPress={onClickHandler}
        labelStyle={{fontFamily: 'Montserrat-SemiBold', fontSize: 16}}
        icon={({size}) => (
          <AntDesign name="logout" size={size} color={Colors.primary} />
        )}
      />
    </DrawerContentScrollView>
  );
}
