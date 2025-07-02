import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';

export type AuthStackParams = {
  GetStarted: undefined;
  Login: undefined;
  OTP: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  NewPassword: undefined;
  DrawerNavigation: DrawerStackParams; // remove it later ....it may lead to app crash
};

export type BottomTabParams = {
  Home: {} | undefined;
  Committee: {} | undefined;
  Category: {id: string; index: number} | undefined;
  LivePrice: {} | undefined;
  Support: {} | undefined;
};

export type RootStackParams = {
  BottomTabs: BottomTabParams;
  ProductDetail: undefined;
  Search: undefined;
  ProductPage: undefined;
  Cart: undefined;
  Notification: undefined;
  Checkout: undefined;
  Coupon: undefined;
  PaymentConfirmation: undefined;
  PurchaseHistory: undefined;
  CommitteeDetail: undefined;
  quiz: undefined;
  updatePassword: undefined;
};

export type DrawerStackParams = {
  RootStack: RootStackParams;
  Profile: undefined;
  Address: undefined;
  OrderList: undefined;
  Wallet: undefined;
  Liked: undefined;
  HelpCenter: undefined;
  Setting: undefined;
};

export type AuthNavigationProps = NativeStackNavigationProp<AuthStackParams>;

export type AuthStackScreenProps<Screen extends keyof AuthStackParams> =
  NativeStackScreenProps<AuthStackParams, Screen>;

export type RootNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParams>,
  BottomTabNavigationProp<BottomTabParams>
>;

export type RootStackScreenProps<Screen extends keyof RootStackParams> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParams, Screen>,
    BottomTabScreenProps<BottomTabParams>
  >;

export type BottomNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParams>,
  NativeStackNavigationProp<RootStackParams>
>;

export type RootBottomTabScreenProps<Screen extends keyof BottomTabParams> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabParams, Screen>,
    NativeStackScreenProps<RootStackParams>
  >;

export type DrawerNavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParams>,
  DrawerNavigationProp<DrawerStackParams>
>;

export type DrawerStackScreenProps<Screen extends keyof DrawerStackParams> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerStackParams, Screen>,
    NativeStackScreenProps<RootStackParams>
  >;

export type DrawerRootStackScreenProps<Screen extends keyof RootStackParams> =
  CompositeScreenProps<
    NativeStackScreenProps<RootStackParams, Screen>,
    DrawerScreenProps<DrawerStackParams>
  >;
