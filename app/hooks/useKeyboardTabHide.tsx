import {View, Keyboard} from 'react-native';
import React from 'react';
import {HideTabContext} from '../navigation/MainTabNavigator';

const useKeyboardTabHide = () => {
  const {setHideTab} = React.useContext(HideTabContext) as any;
  React.useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setHideTab(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setHideTab(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  
  return <></>;
};

export default useKeyboardTabHide;
