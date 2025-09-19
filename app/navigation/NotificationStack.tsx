import React from 'react';
import {CartStackParams, NotificationStackParams} from './types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CartScreen from '../screens/cart/CartScreen';
import NotificationScreen from '../screens/NotificationScreen';
const Stack = createNativeStackNavigator<NotificationStackParams>();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
