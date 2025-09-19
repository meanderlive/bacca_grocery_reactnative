import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WishlistScreen from '../screens/WishlistScreen';
import {WishlistStackParams} from './types';

const Stack = createNativeStackNavigator<WishlistStackParams>();
const WishlistStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
};

export default WishlistStack;
