import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import { COLORS } from '../styles';
import { TabNavigatorParams } from './types';
import WishlistStack from './WishlistStack';
import CartStack from './CartStack';
import NotificationStack from './NotificationStack';

const Tab = createBottomTabNavigator<TabNavigatorParams>();

const Dot = () => (
  <View
    style={{
      width: 5,
      height: 5,
      borderRadius: 5,
      backgroundColor: COLORS.primary,
      marginVertical: 5,
    }}
  />
);

// @ts-ignore
export const HideTabContext = React.createContext();

const MainTabNavigator = () => {
  const [hideTab, setHideTab] = React.useState(false);
  
  return (
    <HideTabContext.Provider value={{ hideTab, setHideTab }}>
      <Tab.Navigator
        initialRouteName="HomeTab"
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabBar,
            hideTab && { opacity: 0 },
          ],
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: '',
            tabBarActiveTintColor: COLORS.primary,
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <AntDesign
                  name="home"
                  size={focused ? 28 : 24}
                  color={focused ? COLORS.primary : COLORS.white}
                  style={styles.icon}
                />
                {focused && <Dot />}
              </View>
            ),
          }}
          name="HomeTab"
          component={HomeStack}
        />
        
        <Tab.Screen
          options={{
            tabBarLabel: '',
            tabBarActiveTintColor: COLORS.primary,
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <AntDesign
                  name="hearto"
                  size={focused ? 28 : 24}
                  color={focused ? COLORS.primary : COLORS.white}
                  style={styles.icon}
                />
                {focused && <Dot />}
              </View>
            ),
          }}
          name="WishlistTab"
          component={WishlistStack}
        />
        
        <Tab.Screen
          options={{
            tabBarLabel: '',
            tabBarActiveTintColor: COLORS.primary,
            tabBarIcon: ({ focused }) => (
              <View style={styles.fabContainer}>
                <SimpleLineIcons
                  name="handbag"
                  size={32}
                  color={COLORS.primary}
                  style={styles.icon}
                />
              </View>
            ),
          }}
          name="CartTab"
          component={CartStack}
        />
        
        <Tab.Screen
          options={{
            tabBarLabel: '',
            tabBarActiveTintColor: COLORS.primary,
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <Feather
                  name="bell"
                  size={focused ? 28 : 24}
                  color={focused ? COLORS.primary : COLORS.white}
                  style={styles.icon}
                />
                {focused && <Dot />}
              </View>
            ),
          }}
          name="NotificationTab"
          component={NotificationStack}
        />
        
        <Tab.Screen
          options={{
            tabBarLabel: '',
            tabBarActiveTintColor: COLORS.primary,
            tabBarIcon: ({ focused }) => (
              <View style={styles.iconContainer}>
                <AntDesign
                  name="user"
                  size={focused ? 28 : 24}
                  color={focused ? COLORS.primary : COLORS.white}
                  style={styles.icon}
                />
                {focused && <Dot />}
              </View>
            ),
          }}
          name="ProfileTab"
          component={ProfileStack}
        />

      </Tab.Navigator>
    </HideTabContext.Provider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    height: 70,
    marginHorizontal: 15,
    borderRadius: 35,
    backgroundColor: COLORS.black,
    borderWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
    }),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  icon: {
    // marginTop: 10,
  },
  fabContainer: {
    position: 'absolute',
    top: -52,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 4,
    borderColor: COLORS.black,
  },
});

export default MainTabNavigator;
