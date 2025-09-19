import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);
  }, []);
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../../assets/images/SplashScreen.png')}
        // resizeMode="contain"
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      />
    </View>
  );
};

export default SplashScreen;
