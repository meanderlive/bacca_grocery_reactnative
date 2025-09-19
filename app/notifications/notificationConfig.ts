import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onRegister: function (token: any) {
    // This is not the FCM token, but a local token
    console.log('PushNotification Token:', token);
  },
  onNotification: function (notification: any) {
    // Handle notification when received (foreground, background, or tapped)
    console.log('NOTIFICATION:', notification);
    // Required on iOS only
    if (notification.finish) {
      notification.finish(PushNotification.FetchResult.NoData);
    }
  },
  senderID: '14308361650', // TODO: Replace with your Firebase sender ID
  popInitialNotification: true,
  requestPermissions: true,
});

// Create a default notification channel for Android
PushNotification.createChannel(
  {
    channelId: 'default-channel-id', // (required)
    channelName: 'Default Channel', // (required)
    channelDescription: 'A default channel', // (optional)
    importance: 4, // (optional) default: 4 (high)
    vibrate: true, // (optional) default: true
  },
  (created: boolean) => console.log(`createChannel returned '${created}'`)
); 