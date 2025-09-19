import React from 'react';
import { ScrollView, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
import {BigText, RegularText, SmallText} from '../../components/MyText';
import Line from '../../components/Line';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';
import SvgImage from '../../../assets/images/svg/ContactUs.svg';

const ContactUsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Contact Us" onBack={navigation.goBack}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 370,
            // backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SvgImage />
        </View>
        <BigText style={{textAlign: 'center'}}>Contact Us</BigText>
        <SmallText
          style={{
            marginHorizontal: 15,
            textAlign: 'center',
            marginVertical: 15,
          }}>
          If you face any trouble for item ordering feel free to contact us.
        </SmallText>

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginHorizontal: 15,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.white,
              borderRadius: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: COLORS.black,
              borderWidth: 2,
            }}>
            <Feather name="phone-call" size={20} color={COLORS.black} />
          </View>
          <RegularText style={{flex: 1}}>+1 232 456 7789</RegularText>
        </View>
        <View style={{alignItems: 'center'}}>
          <Line />
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginHorizontal: 15,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: COLORS.white,
              borderRadius: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: COLORS.black,
              borderWidth: 2,
            }}>
            <Feather name="mail" color="#333" size={24} />
          </View>
          <RegularText style={{flex: 1}}>help@foodlist.com</RegularText>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default ContactUsScreen;
