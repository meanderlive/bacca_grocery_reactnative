// notifications.ts - API utilities for push notifications
// TODO: Update the URLs below when backend provides the actual endpoints

export const saveFcmToken = async (userId: string, fcmToken: string) => {
  try {
    const response = await fetch('https://your-backend.com/api/save-fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, fcmToken }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving FCM token:', error);
    throw error;
  }
};

export const removeFcmToken = async (userId: string, fcmToken: string) => {
  try {
    const response = await fetch('https://your-backend.com/api/remove-fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, fcmToken }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error removing FCM token:', error);
    throw error;
  }
};

export const sendNotification = async (userId: string, title: string, message: string) => {
  try {
    const response = await fetch('https://your-backend.com/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, title, message }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
}; 