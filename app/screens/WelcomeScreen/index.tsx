import {
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BigText, RegularText, SmallText} from '../../components/MyText';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';

const WelcomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <MainLayout
      skipBtn="Skip"
      onPress={() => navigation.navigate('OnBoarding')}>
      <View
        style={{
          width: '90%',
          height: '50%',
          marginTop: 35,
          alignSelf:'center'
        }}>
        {/* <WelcomeImg width={'99%'} /> */}
        <Image style={{width:'90%', height:'80%',resizeMode:'contain',alignSelf:'center'}} source={require('../../../assets/images/WelcomeScreenIng.png')}/>
      </View>
      <BigText style={{textAlign: 'center', marginVertical: 10}}>
        Welcome to Justskipline
      </BigText>
      <RegularText
  style={{
    textAlign: 'center',
    color: 'grey',
    marginHorizontal: 25,
  }}>
  Select your store, schedule a pickup time, and collect your groceries at your convenience.
</RegularText>

    </MainLayout>
  );
};

export default WelcomeScreen;
