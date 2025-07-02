import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthStackParams} from './types';

import {GetStartedScreen} from '../screens/Auth/GetStarted';
import {LoginScreen} from '../screens/Auth/Login';
import {OTPScreen} from '../screens/Auth/OTP';
import {RegisterScreen} from '../screens/Auth/Register';
import {ForgotPasswordScreen} from '../screens/Auth/ForgotPassword';
import {NewPasswordScreen} from '../screens/Auth/NewPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import {DrawerNavigation} from './DrawerNavigation';

const Stack: any = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigation = () => {
  // const navigation: any = useNavigation();

  // const flagChangeHandler = async () => {
  //   const result = await AsyncStorage.getItem('firstTime');
  //   if (result === 'TRUE') {
  //     navigation.navigate('Login');
  //   }
  // };

  // useEffect(() => {
  //   flagChangeHandler();
  // }, []);
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="BottomTabs" component={BottomTabNavigation} />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};
