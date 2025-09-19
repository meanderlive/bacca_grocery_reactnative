import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {MediumText, RegularText, SmallText} from '../../components/MyText';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartStackParams, RootStackParams} from '../../navigation/types';
import PrimaryBtn from '../../components/PrimaryBtn';

const OfferAndBenefitScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const [isActive, setIsActive] = React.useState(1);
  return (
    <MainLayout title="Offers $ Benefits" onBack={navigation.goBack}>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 40,
            marginHorizontal: 15,
            height: 50,
            marginTop: 30,
            marginBottom: 15,
          }}>
          <View
            style={{
              width: 50,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
              flexDirection: 'row',
            }}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../../../assets/icon/coupon.png')}
            />
          </View>
          <TextInput style={{flex: 1}} placeholder="Enter your coupon code" />
        </View>
        <PrimaryBtn onPress={()=>navigation.goBack()} text="Apply Code" />

        <TouchableOpacity
        onPress={()=>{setIsActive(1)}}
          style={[styles.container,{  borderColor: isActive === 1 ? 'black' : 'rgba(0,0,0,0.07)',}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row', gap: 15}}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../../../assets/icon/coupon.png')}
              />
              <MediumText>20%</MediumText>
            </View>
            <Feather name="copy" size={25} color={'gray'} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RegularText>Exipre Dec 15,2024</RegularText>
            <RegularText style={{color: 'gray', fontSize: 15}}>
              20firstorder
            </RegularText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>{setIsActive(2)}}
          style={[styles.container,{  borderColor: isActive === 2 ? 'black' : 'rgba(0,0,0,0.07)',}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row', gap: 15}}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../../../assets/icon/coupon.png')}
              />
              <MediumText>25%</MediumText>
            </View>
            <Feather name="copy" size={25} color={'gray'} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RegularText>Exipre Sep 30,2024</RegularText>
            <RegularText style={{color: 'gray', fontSize: 15}}>
              25fridaysale
            </RegularText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>{setIsActive(3)}}
          style={[styles.container,{  borderColor: isActive === 3 ? 'black' : 'rgba(0,0,0,0.07)',}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View style={{flexDirection: 'row', gap: 15}}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../../../assets/icon/coupon.png')}
              />
              <MediumText>10%</MediumText>
            </View>
            <Feather name="copy" size={25} color={'gray'} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <RegularText style={{color: 'tomato'}}>
              Exipre in 3 days
            </RegularText>
            <RegularText style={{color: 'gray', fontSize: 15}}>
              10firstorder
            </RegularText>
          </View>
        </TouchableOpacity>

      </View>
    </MainLayout>
  );
};

export default OfferAndBenefitScreen;
 const styles =StyleSheet.create(
  {
    container:{
      borderWidth: 1,
      marginTop: 25,
      marginHorizontal: 15,
      height: 100,
      borderRadius: 10,
      padding: 10,
      paddingLeft: 15,
      paddingVertical: 15,
    }
  }
 )