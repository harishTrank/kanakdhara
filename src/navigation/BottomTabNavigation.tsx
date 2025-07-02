import React from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {CurvedBottomBarExpo} from 'react-native-curved-bottom-bar';
import HomeScreen from '../screens/Home/HomeScreen';
import {CommitteeScreen} from '../screens/Committee';
import {CategoryScreen} from '../screens/Category';
import {SupportScreen} from '../screens/Support';
import {LivePriceScreen} from '../screens/LivePrice';

import {Colors} from '../utils/Colors';
import {
  Category,
  Close,
  Committee,
  Graph,
  Home,
  Support,
} from '../components/svg';
import {Box} from 'native-base';

export default function BottomTabNavigation() {
  const _renderIcon = (routeName: any, selectedTab: any) => {
    return (
      <>
        {routeName === 'Home' && (
          <>
            <Box
              h={0.5}
              w={25}
              bg={routeName === selectedTab ? Colors.primary : Colors.white}
              position={'absolute'}
              top={0}
            />
            <Home
              width={25}
              height={25}
              color={
                routeName === selectedTab ? Colors.primary : Colors.iconColor
              }
            />
          </>
        )}
        {routeName === 'Category' && (
          <>
            <Box
              h={0.5}
              w={25}
              bg={routeName === selectedTab ? Colors.primary : Colors.white}
              position={'absolute'}
              top={0}
            />
            <Category
              width={25}
              height={25}
              color={
                routeName === selectedTab ? Colors.primary : Colors.iconColor
              }
            />
          </>
        )}
        {routeName === 'LivePrice' && (
          <>
            <Box
              h={0.5}
              w={25}
              bg={routeName === selectedTab ? Colors.primary : Colors.white}
              position={'absolute'}
              top={0}
            />
            <Graph
              width={30}
              height={30}
              color={
                routeName === selectedTab ? Colors.primary : Colors.iconColor
              }
            />
          </>
        )}
        {routeName === 'Support' && (
          <>
            <Box
              h={0.5}
              w={25}
              bg={routeName === selectedTab ? Colors.primary : Colors.white}
              position={'absolute'}
              top={0}
            />
            <Support
              width={25}
              height={25}
              color={
                routeName === selectedTab ? Colors.primary : Colors.iconColor
              }
            />
          </>
        )}
      </>
    );
  };
  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: any;
    selectedTab: any;
    navigate: any;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabBarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={62}
      circleWidth={55}
      bgColor={Colors.white}
      initialRouteName="Home"
      borderTopLeftRight
      screenOptions={{headerShown: false}}
      renderCircle={({navigate, selectedTab}: any) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigate('Committee');
            }}>
            {selectedTab === 'Committee' ? (
              <Close width={30} height={30} />
            ) : (
              <Committee width={30} height={30} />
            )}
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBarExpo.Screen
        name="Home"
        position="LEFT"
        component={HomeScreen}
      />
      <CurvedBottomBarExpo.Screen
        name="Category"
        position="LEFT"
        component={CategoryScreen}
      />
      <CurvedBottomBarExpo.Screen
        name="Committee"
        position="CENTER"
        component={CommitteeScreen}
      />
      <CurvedBottomBarExpo.Screen
        name="LivePrice"
        component={LivePriceScreen}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen
        name="Support"
        component={SupportScreen}
        position="RIGHT"
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 62,
    height: 62,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
