import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NativeBaseProvider, StatusBar} from 'native-base';
import SplashScreen from 'react-native-splash-screen';
import {Provider as StoreProvider} from 'react-redux';

import {NativeBaseTheme} from './src/utils/NativeBaseTheme';
import AppNavigation from './src/navigation';
import {store} from './src/store';
import WithAxios from './src/lib/WithAxios';
import FlashMessage from 'react-native-flash-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';

export const queryClient = new QueryClient();
const App = () => {
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {}
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
  };

  useEffect(() => {
    SplashScreen.hide();
    checkApplicationPermission();
    requestUserPermission();
    getToken();
  }, []);

  return (
    <SafeAreaProvider>
      <StoreProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <WithAxios>
            <NativeBaseProvider theme={NativeBaseTheme}>
              <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
              <AppNavigation />
            </NativeBaseProvider>
          </WithAxios>
        </QueryClientProvider>
        <FlashMessage position="bottom" />
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
