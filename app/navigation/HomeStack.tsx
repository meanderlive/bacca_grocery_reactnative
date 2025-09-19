import React, { useCallback, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { HomeStackParams } from './types';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator<HomeStackParams>();

// Memoize the screen options to prevent unnecessary re-renders
const screenOptions = {
  headerShown: false,
  // This prevents the screen from being unmounted when navigating away
  detachPreviousScreen: false,
};

// Memoize the Home component to prevent unnecessary re-renders
const MemoizedHomeScreen = React.memo(HomeScreen);

const HomeStack = React.memo(() => {
  const [state, setState] = useState({});

  // Memoize the render function for the home screen
  const renderHomeScreen = useCallback(
    () => <MemoizedHomeScreen />,
    []
  );

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="Home" 
        component={MemoizedHomeScreen}
        options={{
          // Prevent the screen from being unmounted when navigating away
          freezeOnBlur: false,
        }}
      />
      {/* Uncomment and add other screens as needed */}
      {/* <Stack.Screen name="Search" component={SearchScreen} /> */}
    </Stack.Navigator>
  );
});

// Set a display name for better debugging
HomeStack.displayName = 'HomeStack';

export default HomeStack;
