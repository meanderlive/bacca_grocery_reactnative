import {
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  MediumText,
  RegularText,
  SmallText,
} from '../../components/MyText';
import ApplePay from '../../../assets/images/PaymentSvg/ApplePay.svg';
import GPay from '../../../assets/images/PaymentSvg/GPay.svg';
import Visa from '../../../assets/images/PaymentSvg/Visa.svg';
import MasterCard from '../../../assets/images/PaymentSvg/MasterCard.svg';
import PayPal from '../../../assets/images/PaymentSvg/Paypal.svg';
import PrimaryBtn from '../../components/PrimaryBtn';

const MyWalletScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="My Wallet" onBack={navigation.goBack}>
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
              marginBottom: 10,
            }}>
            <MediumText>My Wallet Amount</MediumText>
            <RegularText style={{ color: 'tomato' }}>$255.00</RegularText>
          </View>
          <SmallText>You can add up to $1000</SmallText>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 2,
              borderColor: 'black',
              width: '100%',
              height: 50,
              alignItems: 'center',
              paddingLeft: 15,
              borderRadius: 50,
              marginVertical: 20,
              marginTop: 25,
            }}>
            <FontAwesome name="dollar" color="#333" size={24} />
            <TextInput
              style={{ marginLeft: 10, fontSize: 17 }}
              placeholder="Enter Amount"
            />
          </View>
          <SmallText>Maximum limit to add money is $1000 per</SmallText>
          <SmallText>month & $10000 per year.</SmallText>
          <MediumText style={{ marginTop: 35 }}>
            Select Payment Method 💰
          </MediumText>
          <View style={{ flexDirection: 'row', gap: 15, marginTop: 10 }}>
            <TouchableOpacity>
              <ApplePay />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                height: 50,
                width: 50,
                borderWidth: 2,
                borderColor: 'black',
                alignItems:'center',
                justifyContent:'center'
              }}>
              <GPay />
            </TouchableOpacity>
            <TouchableOpacity>
              <Visa />
            </TouchableOpacity>
            <TouchableOpacity>
              <MasterCard />
            </TouchableOpacity>
            <TouchableOpacity>
              <PayPal />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 50 }}>
          <PrimaryBtn text="Add to Wallet" />
        </View>
      </View>
    </MainLayout>
  );
};

export default MyWalletScreen;
