import React from 'react';
import {View, Keyboard, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {MediumText, SmallText, TitleText} from '../../components/MyText';
import {COLORS} from '../../styles';
import LocationSvg from '../../../assets/images/svg/LocationSvg2.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ApplePay from '../../../assets/images/PaymentSvg/ApplePay.svg';
import GPay from '../../../assets/images/PaymentSvg/GPay.svg';
import Visa from '../../../assets/images/PaymentSvg/VisaLogo.svg';
import MasterCard from '../../../assets/images/PaymentSvg/MasterCard.svg';
import PayPal from '../../../assets/images/PaymentSvg/Paypal.svg';
import AmazonPay from '../../../assets/images/PaymentSvg/AmazonPay.svg';
import PrimaryBtn from '../../components/PrimaryBtn';

const PaymentOptionsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [isActive, setIsActive] = React.useState(1);
  return (
    <MainLayout title="Payment Options" onBack={navigation.goBack}>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              backgroundColor: 'black',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              paddingHorizontal: 15,
              paddingVertical: 25,
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <LocationSvg />
              <View
                style={{
                  // backgroundColor: 'red',
                  height: 50,
                  justifyContent: 'space-between',
                  marginLeft: 10,
                }}>
                <SmallText style={{color: 'white'}}>
                  Pizzza Hut {''} | <SmallText> Delivery in:25 min</SmallText>
                </SmallText>
                <SmallText style={{color: 'white'}}>
                  Home {''} |
                  <SmallText>
                    {' '}
                    {''} 8000 S Kirkland Ave, Chicago, IL 6065
                  </SmallText>
                </SmallText>
              </View>
            </View>
          </View>
          {/* {ROWS} */}
          <View style={{marginHorizontal: 15}}>
            {/* {MY WALLET} */}
            <View
            style={styles.row}>
              <View
                style={styles.icon}>
                <MaterialCommunityIcons
                  name="wallet-outline"
                  color="#333"
                  size={24}
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  setIsActive(1);
                }}
                style={[styles.container,{
                  backgroundColor: isActive === 1 ? 'tomato' : COLORS.white,
                }]}>
                <TitleText style={{color: isActive === 1 ? 'white' : 'black'}}>
                  My Wallet
                </TitleText>
                <MaterialIcons name={isActive === 1 ?  "radio-button-on" : "radio-button-off"} size={24} color={isActive === 7 ? COLORS.white : COLORS.black}/>

              </TouchableOpacity>
            </View>
            {/* {VISA} */}
            <View
             style={styles.row}>
              <View
                style={styles.icon}>
                <Visa />
              </View>

              <TouchableOpacity
                onPress={() => {
                  setIsActive(2);
                }}
                style={[styles.container,{
                  backgroundColor: isActive === 2 ? 'tomato' : COLORS.white,
                }]}>
                <TitleText style={{color: isActive === 2 ? 'white' : 'black'}}>
                  **** 4864
                </TitleText>
                <MaterialIcons name={isActive === 2 ?  "radio-button-on" : "radio-button-off"} size={24} color={isActive === 7 ? COLORS.white : COLORS.black}/>

              </TouchableOpacity>
            </View>
            {/* {MASTERCARD} */}
            <View
              style={styles.row}>
              <MasterCard />

              <TouchableOpacity
                onPress={() => {
                  setIsActive(3);
                }}
                style={[styles.container,{
                  backgroundColor: isActive === 3 ? 'tomato' : COLORS.white,
                }]}>
                <TitleText style={{color: isActive === 3 ? 'white' : 'black'}}>
                  **** 3597
                </TitleText>
                <MaterialIcons name={isActive === 3 ?  "radio-button-on" : "radio-button-off"} size={24} color={isActive === 7 ? COLORS.white : COLORS.black}/>

              </TouchableOpacity>
            </View>
            {/* {APPLEPAY} */}
            <View
              style={styles.row}>
              <ApplePay />

              <TouchableOpacity
                onPress={() => {
                  setIsActive(4);
                }}
                style={[styles.container,{
                  backgroundColor: isActive === 4 ? 'tomato' : COLORS.white,
                }]}>
                <TitleText style={{color: isActive === 4 ? 'white' : 'black'}}>
                  Connected
                </TitleText>
                <MaterialIcons name={isActive === 4 ?  "radio-button-on" : "radio-button-off"} size={24} color={isActive === 7 ? COLORS.white : COLORS.black}/>

              </TouchableOpacity>
            </View>
            {/* {GPAy} */}
            <View
              style={styles.row}>
                 <View
                style={styles.icon}>
              <GPay />
               
              </View>

              <TouchableOpacity
                onPress={() => {
                  setIsActive(5);
                }}
                style={[styles.container,{
                  backgroundColor: isActive === 5 ? 'tomato' : COLORS.white,
                }]}>
                <TitleText style={{color: isActive === 5 ? 'white' : 'black'}}>
                  Connected
                </TitleText>
                <MaterialIcons name={isActive === 5 ?  "radio-button-on" : "radio-button-off"} size={24} color={isActive === 7 ? COLORS.white : COLORS.black}/>

              </TouchableOpacity>
            </View>
            {/* {PAYPAL} */}
            <View
              style={styles.row}>
              <PayPal />

              <TouchableOpacity
                onPress={() => {
                  setIsActive(6);
                }}
                style={[styles.container,{
                  backgroundColor: isActive === 6 ? 'tomato' : COLORS.white,
                }]}>
                <TitleText style={{color: isActive === 6 ? 'white' : 'black'}}>
                  Connected
                </TitleText>
                <MaterialIcons name={isActive === 6 ?  "radio-button-on" : "radio-button-off"} size={24} color={isActive === 7 ? COLORS.white : COLORS.black}/>

              </TouchableOpacity>
            </View>
            {/* {AMAZON PAy} */}
            <View
              style={[styles.row,{marginBottom: 45,}]}>
              <View
                style={styles.icon}>
                <AmazonPay />
              </View>

              <TouchableOpacity
                onPress={() => {
                  setIsActive(7);
                }}
                style={[styles.container,{
                  backgroundColor: isActive === 7 ? 'tomato' : COLORS.white,
                }]}>
                <TitleText style={{color: isActive === 7 ? 'white' : 'black'}}>
                  Not Connect
                </TitleText>
                <MaterialIcons name={isActive === 7 ?  "radio-button-on" : "radio-button-off"} size={24} color={isActive === 7 ? COLORS.white : COLORS.black}/>
               
              </TouchableOpacity>
            </View>
          </View>

          <PrimaryBtn
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  { 
                    name: 'MainTab',
                    state: {
                      routes: [{ name: 'Home' }]
                    }
                  },
                  { name: 'ThankYou' }
                ]
              });
            }}
            text="Confirm Order"
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default PaymentOptionsScreen;

const styles =StyleSheet.create(
  {
    row:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      marginBottom: 15,
    },
    icon:{
      height: 50,
      width: 50,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container:{
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 45,
      flex: 1,
      height: 50,
      alignItems: 'center',
      paddingHorizontal: 10,
      justifyContent: 'space-between',
    }
  }
)