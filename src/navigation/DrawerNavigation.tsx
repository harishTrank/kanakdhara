import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {DrawerStackParams} from './types';

import {ProfileScreen} from '../screens/Profile';
import {WalletScreen} from '../screens/Wallet';
import {LikedScreen} from '../screens/Liked';
import {SettingScreen} from '../screens/Setting';

import {RootStackNavigation} from './RootStackNavigation';
import {Colors} from '../utils/Colors';
import {CustomDrawerContent} from './components/CustomDrawerContent';
import {AddressScreen} from '../screens/Address';
import {OrderListScreen} from '../screens/PreviousOrders/OrderList';

const Drawer = createDrawerNavigator<DrawerStackParams>();

export function DrawerNavigation() {
  const drawerContent = (props: DrawerContentComponentProps) => {
    return <CustomDrawerContent {...props} />;
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'front',
        swipeEnabled: false,
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerActiveBackgroundColor: '#fbe7b8',
        swipeEdgeWidth: 0,
      }}
      drawerContent={drawerContent}>
      <Drawer.Screen
        name="RootStack"
        component={RootStackNavigation}
        options={() => ({
          drawerItemStyle: {display: 'none'},
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profile',
          drawerLabelStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
          },
          drawerIcon: ({size}) => (
            <Ionicons name="person-sharp" size={size} color={Colors.primary} />
          ),
        }}
      />
      <Drawer.Screen
        name="Address"
        component={AddressScreen}
        options={{
          drawerLabel: 'Address',
          drawerLabelStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
          },
          drawerIcon: ({size}) => (
            <Ionicons name="location" size={size} color={Colors.primary} />
          ),
        }}
      />
      <Drawer.Screen
        name="OrderList"
        component={OrderListScreen}
        options={{
          drawerLabel: 'Your orders',
          drawerLabelStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
          },
          drawerIcon: ({size}) => (
            <Ionicons name="document-text" size={size} color={Colors.primary} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          drawerLabel: 'Wallet',
          drawerLabelStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
          },
          drawerIcon: ({size}) => (
            <MaterialIcons
              name="account-balance-wallet"
              size={size}
              color={Colors.primary}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Liked"
        component={LikedScreen}
        options={{
          drawerLabel: 'Wishlist',
          drawerLabelStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
          },
          drawerIcon: ({size}) => (
            <Ionicons name="heart-circle" size={size} color={Colors.primary} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          drawerLabel: 'Settings',
          drawerLabelStyle: {
            fontFamily: 'Montserrat-SemiBold',
            fontSize: 16,
          },
          drawerIcon: ({size}) => (
            <Ionicons name="settings" size={size} color={Colors.primary} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
