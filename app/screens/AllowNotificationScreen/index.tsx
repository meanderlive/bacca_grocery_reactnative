import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import Image from '../../../assets/images/svg/AllowNotification.svg';
import {BigText, RegularText} from '../../components/MyText';
import PrimaryBtn from '../../components/PrimaryBtn';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';

const AllowNotificationScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout skipBtn="Skip" onPress={() => navigation.navigate('Interest')}>
      <View style={{flex: 1}}>
        <View
          style={{
            height: '55%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image />
        </View>

        <BigText style={{textAlign: 'center'}}>Notification</BigText>
        <RegularText
          style={{textAlign: 'center', color: 'gray', marginTop: 15}}>
          Stay notified about new course update,
        </RegularText>
        <RegularText style={{textAlign: 'center', color: 'gray'}}>
          scoreboard status and other updates.
        </RegularText>
        <View style={{marginTop: 50}}>
          <PrimaryBtn
            text={'Allow'}
            onPress={() => navigation.navigate('Interest')}
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default AllowNotificationScreen;
