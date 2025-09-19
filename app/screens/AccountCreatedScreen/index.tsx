import {View, Text} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import PrimaryBtn from '../../components/PrimaryBtn';
import Image from '../../../assets/images/svg/AccountCreate.svg';
import {BigText, RegularText} from '../../components/MyText';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';

const AccountCreatedScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout>
      <View style={{flex: 1}}></View>
      <View style={{height: '85%'}}>
        <View style={{marginVertical: 20, marginLeft:50}}>
          <Image />
        </View>
        <BigText style={{textAlign: 'center'}}>Account Created</BigText>
        <RegularText
          style={{color: 'gray', textAlign: 'center', marginTop: 15}}>
          Your account has been created successfully.
        </RegularText>
      </View>
      <View style={{height: '15%'}}>
        <PrimaryBtn
          onPress={() => navigation.navigate('MainTab')}
          text="Order Now"
        />
      </View>
    </MainLayout>
  );
};

export default AccountCreatedScreen;
