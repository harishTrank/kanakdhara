import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParams} from './types';

import BottomTabNavigation from './BottomTabNavigation';
import {ProductDetailScreen} from '../screens/ProductDetails';
import {SearchScreen} from '../screens/Search';
import {ProductPageScreen} from '../screens/ProductPage';
import {CartScreen} from '../screens/Cart';
import {NotificationScreen} from '../screens/Notification';
import {CouponScreen} from '../screens/Coupon';
import {CheckoutScreen} from '../screens/Checkout';
import {PaymentConfirmationScreen} from '../screens/Payment/PaymentConfirmation';
import {PurchaseHistoryScreen} from '../screens/PreviousOrders/PruchaseHistory';
import {CommitteeDetailScreen} from '../screens/CommitteeDetails';
import {QuizScreen} from '../screens/Quiz';
import {UpdatePasswordScreen} from '../screens/UpdatePassword';
import PaymentScreen from '../screens/PaymentScreen';

const Stack: any = createNativeStackNavigator<RootStackParams>();

export const RootStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={BottomTabNavigation} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ProductPage" component={ProductPageScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Coupon" component={CouponScreen} />
      <Stack.Screen name="PurchaseHistory" component={PurchaseHistoryScreen} />
      <Stack.Screen name="CommitteeDetail" component={CommitteeDetailScreen} />
      <Stack.Screen name="quiz" component={QuizScreen} />
      <Stack.Screen name="updatePassword" component={UpdatePasswordScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen
        name="PaymentConfirmation"
        component={PaymentConfirmationScreen}
      />
    </Stack.Navigator>
  );
};
