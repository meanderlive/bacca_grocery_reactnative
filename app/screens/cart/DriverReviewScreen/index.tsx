import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MainLayout from '../../../components/MainLayout';
import {COLORS} from '../../../styles';
import {BigText, RegularText, SmallText} from '../../../components/MyText';
import PrimaryBtn from '../../../components/PrimaryBtn';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/types';

const DriverReviewScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout onBack={navigation.goBack} title="Driver Review">
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              borderRadius: 100,
              marginTop: 35,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../../assets/images/DeliveryBoyImg.png')}
            />
          </View>

          <View>
            <BigText style={{textAlign: 'center'}}>
              Let's rate your driver's
            </BigText>
            <BigText style={{textAlign: 'center'}}>delivery service</BigText>
          </View>

          <SmallText style={{marginVertical: 20, marginBottom: 30}}>
            How was the delivery of your order?
          </SmallText>

          <View style={{alignItems: 'center'}}>
            <Rating
              jumpValue={0}
              ratingCount={5}
              imageSize={30}
              tintColor={COLORS.white}
              minValue={1}
              ratingBackgroundColor={'red'}
              ratingColor={'#000'}
              startingValue={5}
            />
          </View>
          <SmallText style={{marginVertical: 10, marginTop: 30}}>
            Haven't received your order?
          </SmallText>
          <TouchableOpacity>
            <SmallText style={{marginBottom: 30, color: 'tomato'}}>
              Call your driver
            </SmallText>
          </TouchableOpacity>
        </ScrollView>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <PrimaryBtn
              containerStyle={{
                width: '48%',
                marginHorizontal: 0,
                backgroundColor: 'white',
              }}
              onPress={() => navigation.goBack()}
              text="Cancel"
            />
            <PrimaryBtn
              containerStyle={{width: '48%', marginHorizontal: 0}}
              onPress={() => navigation.navigate('DriverTip')}
              text="Submit"
            />
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default DriverReviewScreen;
