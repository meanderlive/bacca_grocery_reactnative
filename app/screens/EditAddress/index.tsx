import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import Feather from 'react-native-vector-icons/Feather';
import Image from '../../../assets/images/svg/LocationMap.svg';
import {RegularText} from '../../components/MyText';
import {COLORS} from '../../styles';
import PrimaryBtn from '../../components/PrimaryBtn';

const EditAddressScreen = () => {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Set Your Location" onBack={navigation.goBack}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 300,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image />
        </View>
        <RegularText style={{marginLeft: 15, color: 'gray'}}>TITLE</RegularText>
        <TextInput
          placeholder="Home"
          placeholderTextColor={'black'}
          style={{
            height: 50,
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 50,
            marginHorizontal: 15,
            paddingLeft: 15,
            marginBottom: 15,
            marginTop: 5,
          }}
        />
        <RegularText style={{marginLeft: 15, color: 'gray'}}>
          ADDRESS
        </RegularText>
        <TextInput
          placeholder="800 S Kirkland Ave, Chicago, IL 6065vvv"
          placeholderTextColor={'black'}
          style={{
            height: 50,
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 50,
            marginHorizontal: 15,
            paddingLeft: 15,
            marginBottom: 15,
            marginTop: 5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            gap: 5,
            marginBottom: 30,
          }}>
          <TouchableOpacity
            style={{
              //   backgroundColor: COLORS.primary,
              height: 20,
              width: 20,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: 'black',
              marginRight: 10,
            }}
            onPress={() => setTermsAccepted(!termsAccepted)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {termsAccepted && (
                <Feather name={'check'} color={'black'} size={18} />
              )}
            </View>
          </TouchableOpacity>
          <RegularText style={{color: 'gray'}}>
            Make this as the default address
          </RegularText>
        </View>
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
            text="Delete"
          />
          
          <PrimaryBtn
            containerStyle={{width: '48%', marginHorizontal: 0}}
            onPress={() => navigation.goBack()}
            text="Update"
          />
        </View>
      
      </ScrollView>
      

    </MainLayout>
  );
};

export default EditAddressScreen;
