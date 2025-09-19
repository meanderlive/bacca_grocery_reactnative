import * as React from 'react';
import { StatusBar, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SheetProvider } from 'react-native-actions-sheet';
import RootNavigator from './app/navigation/RootNavigator';
import './app/sheets/sheets';
import './app/notifications/notificationConfig';
import { store } from './app/redux';
import { Provider, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_KEYS, getLocalUser } from './app/utils/helper';
import { setAuth } from './app/redux/feature/auth/authSlice';
import { useEffect, useState } from 'react';
import { useNotifications } from './app/notifications/useNotifications';
import StripeProvider from './app/payment/StripeProvider';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const AppInit = () => {
  useNotifications('default-user');
  const [ready, setReady] = useState(false);
  const [localAuth, setLocalAuth] = useState(null);
  const [isFirstTimeOpen, setIsFirstTimeOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        // Check authentication state
        const [localAuthData, isFirstTimeOpenData] = await Promise.all([
          getLocalUser(),
          AsyncStorage.getItem(LOCAL_KEYS.IS_FIRST_TIME_OPEN)
        ]);

        // Set auth state if user is logged in
        if (localAuthData) {
          setLocalAuth(localAuthData);
          dispatch(setAuth(localAuthData));
        }
        
        // Set first time open state
        setIsFirstTimeOpen(!Boolean(isFirstTimeOpenData));
        
        // Mark as not first time open if it was the first time
        if (isFirstTimeOpenData === null) {
          await AsyncStorage.setItem(LOCAL_KEYS.IS_FIRST_TIME_OPEN, 'true');
        }
      } catch (err) {
        console.error('Error initializing app:', err);
        // In case of error, still set ready to true to show the app
      } finally {
        setReady(true);
      }
    };

    init();
    
    // Add app state change listener to handle when app comes to foreground
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        // Refresh auth state when app comes to foreground
        try {
          const localAuthData = await getLocalUser();
          if (localAuthData) {
            setLocalAuth(localAuthData);
            dispatch(setAuth(localAuthData));
          }
        } catch (error) {
          console.error('Error refreshing auth state:', error);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
  if (!ready) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <StatusBar translucent backgroundColor="transparent" />
      <RootNavigator localAuth={localAuth} isFirstTimeOpen={isFirstTimeOpen} />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StripeProvider>
          <NavigationContainer>
            <SheetProvider>
              <AppInit />
            </SheetProvider>
          </NavigationContainer>
        </StripeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

