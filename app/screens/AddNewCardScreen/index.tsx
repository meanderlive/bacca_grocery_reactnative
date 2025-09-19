import {
  View,
  TextInput,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {SmallText,} from '../../components/MyText';
import VisaCard from '../../../assets/images/PaymentSvg/VisaCard.svg';
import PrimaryBtn from '../../components/PrimaryBtn';

const AddNewCardScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (

    <MainLayout title="Add New Card" onBack={navigation.goBack}>
      <View style={{flex: 1}}>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 25,
          }}>
          <VisaCard />
        </View>

        <View style={{marginHorizontal: 15, marginTop: 5}}>
          <SmallText>CARD NAME</SmallText>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 50,
              paddingLeft: 15,
              marginTop: 10,
              marginBottom: 15,
            }}
            placeholder="Enter your Name"
          />

          <SmallText>CARD NUMBER</SmallText>
          <TextInput
            style={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 50,
              paddingLeft: 15,
              marginTop: 10,
            }}
            placeholder=" Enter your 16 digit number"
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'space-between',
            }}>
            <View style={{width: '48%'}}>
              <SmallText>EXPIRY DATE</SmallText>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: 'black',
                  borderRadius: 48,
                  paddingLeft: 15,
                  marginTop: 10,
                }}
                placeholder=" Enter expiry date"
              />
            </View>

            {/* <TouchableOpacity
              onPress={() => setIsDatePickerOpen(true)}
              style={{
                // marginVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                height: 50,
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'lightgray',
              }}>
              <DatePicker
                modal
                mode="date"
                open={isDatePickerOpen}
                date={dob || new Date()}
                onConfirm={dob => {
                  setIsDatePickerOpen(false);
                  setDob(dob);
                }}
                onCancel={() => {
                  setIsDatePickerOpen(false);
                }}
              />
              <Text
                style={{
                  marginLeft: 10,
                  color: 'rgba(0,0,0,0.4)',
                  fontSize: 20,
                }}>
                {dob ? dob?.toISOString().slice(0, 10) : 'DD - MM - YYYY'}
              </Text>
            </TouchableOpacity> */}

            <View style={{width: '48%'}}>
              <SmallText style={{marginLeft: 5}}>CVV</SmallText>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: 'black',
                  borderRadius: 48,
                  paddingLeft: 15,
                  marginTop: 10,
                }}
                placeholder="Enter your CVV"
              />
            </View>
          </View>
        </View>

        <PrimaryBtn onPress={()=>navigation.goBack()} containerStyle={{marginTop:100}} text='Add My Card'/>
      </View>
    </MainLayout>

  );
};

export default AddNewCardScreen;
