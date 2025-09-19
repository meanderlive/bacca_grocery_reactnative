import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const sendTokenToBackend = async (userId: string, token: string) => {
  try {
    await fetch('https://your-backend.com/api/save-fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        fcmToken: token,
      }),
    });
  } catch (error) {
    console.error('Failed to send FCM token to backend:', error);
  }
};


export const useNotifications = (userId: string) => {
  useEffect(() => {
    // Request permission and get FCM token
    const setup = async () => {
      await messaging().requestPermission();
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM TOKEN:', fcmToken);
        sendTokenToBackend(userId, fcmToken);
      }
    };
    setup();
    // Listen for token refresh
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
      sendTokenToBackend(userId, token);
    });

    // Foreground notification handler
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        title: remoteMessage.notification?.title,
        message: remoteMessage.notification?.body || '',
      });
    });

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeOnMessage();
    };
  }, [userId]);
};