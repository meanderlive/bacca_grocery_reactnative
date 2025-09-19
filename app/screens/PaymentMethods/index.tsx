import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {
  BigText,
  MediumText,
  RegularText,
  SmallText,
} from '../../components/MyText';
import ApplePay from '../../../assets/images/PaymentSvg/ApplePay.svg';
import GPay from '../../../assets/images/PaymentSvg/GPay.svg';
import Visa from '../../../assets/images/PaymentSvg/VisaLogo.svg';
import MasterCard from '../../../assets/images/PaymentSvg/MasterCard.svg';
import PayPal from '../../../assets/images/PaymentSvg/Paypal.svg';
import AmazonPay from '../../../assets/images/PaymentSvg/AmazonPay.svg';
import PrimaryBtn from '../../components/PrimaryBtn';

const PaymentMethodScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Payment Method" onBack={navigation.goBack}>
      <View style={{flex: 1}}>
        <View style={{marginHorizontal: 15, marginTop: 20}}>
          {/* {Visa} */}
          <View style={styles.view}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Visa />
            </View>

            <View style={styles.container}>
              <MediumText style={{color: 'gray'}}>****4864</MediumText>
              <Feather name="edit" size={20} color={'black'} />
            </View>
          </View>

          {/* {MasterCard} */}
          <View style={styles.view}>
            <MasterCard />

            <View style={styles.container}>
              <MediumText style={{color: 'gray'}}>****3597</MediumText>
              <Feather name="edit" size={20} color={'black'} />
            </View>
          </View>

          {/* {APPLE PAY} */}
          <View style={styles.view}>
            <ApplePay />

            <View style={styles.container}>
              <RegularText style={{color: 'gray'}}>Apple Pay</RegularText>
              <RegularText>Connected</RegularText>
            </View>
          </View>

          {/* {G PAY} */}
          <View style={styles.view}>
            <GPay />

            <View style={styles.container}>
              <RegularText style={{color: 'gray'}}>Google Pay</RegularText>
              <RegularText>Connected</RegularText>
            </View>
          </View>

          {/* {PAYPAL} */}
          <View style={styles.view}>
            <PayPal />

            <View style={styles.container}>
              <RegularText style={{color: 'gray'}}>Paypal</RegularText>
              <RegularText>Connected</RegularText>
            </View>
          </View>

          {/* {AMAZON PAY} */}
          <View style={styles.view}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <AmazonPay />
            </View>

            <View style={styles.container}>
              <RegularText style={{color: 'gray'}}>Amazon Pay</RegularText>
              <RegularText>Connected</RegularText>
            </View>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
          <PrimaryBtn
            onPress={() => navigation.navigate('AddNewCard')}
            text="Add New Card"
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 45,
    flex: 1,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 15,
  },
});
