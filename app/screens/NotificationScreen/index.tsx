import {View, Text, ScrollView, FlatList} from 'react-native';
import React from 'react';
import TabBarHeader from '../../components/TabBarHeader';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {RegularText} from '../../components/MyText';

const data = [
  {
    day: 'TODAY',
    title_1: '30% Special Discount',
    detail_1: 'Special promotion only valid today',
  },
  {
    day: 'YESTERDAY',
    title_1: 'Top Up E-Wallet Successful!',
    detail_1: 'You have to top up your e-wallet',
    title_2: 'New Services Available!',
    detail_2: 'Now you can track orders in real time',
  },
  {
    day: 'DECEMBER 22,2023 ',
    title_1: 'Credit Card Connected!',
    detail_1: 'Credit Card has been linked!',
    title_2: 'Account Setup Successful!',
    detail_2: 'Your account has been created!',
  },
];

const NotificationScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <TabBarHeader
      title="Notification"
      onBack={navigation.goBack}
      onPress={() => navigation.navigate('Setting')}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
        }}>
        <FlatList
          data={data}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1}}>
                <RegularText style={{marginTop: 25, marginBottom: 5}}>
                  {item.day}
                </RegularText>
                <View
                  style={{
                    height: 70,
                    backgroundColor: '#F0F0F0',
                    borderRadius: 10,
                    padding: 10,
                    gap: 5,
                  }}>
                  <RegularText bold style={{}}>
                    {item.title_1}
                  </RegularText>
                  <RegularText style={{color: 'gray', fontSize: 15}}>
                    {item.detail_1}
                  </RegularText>
                </View>
                {item.title_2 ? (
                  <View
                    style={{
                      height: 70,
                      backgroundColor: '#F0F0F0',
                      borderRadius: 10,
                      padding: 10,
                      gap: 5,
                      marginTop: 10,
                    }}>
                    <RegularText bold style={{}}>
                      {item.title_2}
                    </RegularText>
                    <RegularText style={{color: 'gray', fontSize: 15}}>
                      {item.detail_2}
                    </RegularText>
                  </View>
                ) : null}
              </View>
            );
          }}
        />

        {/* <RegularText style={{marginTop: 25, marginBottom: 5}}>
          TODAY
        </RegularText> */}
        {/* <View
          style={{
            height: 70,
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            padding: 10,
            gap: 5,
          }}>
          <RegularText bold style={{}}>
            30% Special Discount
          </RegularText>
          <RegularText style={{color: 'gray', fontSize: 15}}>
            Special promotion only valid today
          </RegularText>
        </View> */}

        {/* <RegularText style={{marginTop: 25, marginBottom: 5}}>
          Yesterday
        </RegularText> */}
        {/* <View
          style={{
            height: 70,
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            padding: 10,
            gap: 5,
            marginBottom: 10,
          }}>
          <RegularText bold style={{}}>
            Top Up E-Wallet Successful!
          </RegularText>
          <RegularText style={{color: 'gray', fontSize: 15}}>
            You have to top up your e-wallet{' '}
          </RegularText>
        </View>
        <View
          style={{
            height: 70,
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            padding: 10,
            gap: 5,
          }}>
          <RegularText bold style={{}}>
            Top Up E-Wallet Successful!
          </RegularText>
          <RegularText style={{color: 'gray', fontSize: 15}}>
            You have to top up your e-wallet
          </RegularText>
        </View> */}
      </View>
    </TabBarHeader>
  );
};

export default NotificationScreen;
