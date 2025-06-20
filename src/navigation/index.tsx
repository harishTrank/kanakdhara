import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {Box} from 'native-base';
import {ActivityIndicator} from 'react-native';

import {AuthStackNavigation} from './AuthStackNavigation';
import {DrawerNavigation} from './DrawerNavigation';
import {RootState, useAppDispatch} from '../store';
import {restoreSession} from '../store/auth/authSlice';
import {Colors} from '../utils/Colors';

const AppNavigation = () => {
  const {userId, isLoading} = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box
        flex={1}
        backgroundColor={Colors.white}
        alignItems={'center'}
        justifyContent={'center'}>
        <ActivityIndicator size={'large'} color={Colors.primary} />
      </Box>
    );
  }

  return (
    <NavigationContainer>
      {userId ? <DrawerNavigation /> : <AuthStackNavigation />}
    </NavigationContainer>
  );
};
export default AppNavigation;
