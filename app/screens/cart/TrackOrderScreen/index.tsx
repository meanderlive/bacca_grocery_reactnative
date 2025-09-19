import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainLayout from '../../../components/MainLayout';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../../styles';
import {MediumText, SmallText} from '../../../components/MyText';
import { RootStackParams} from '../../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import MapSvg from '../../../../assets/images/svg/Map.svg';
import DeliveryBoyImg from '../../../../assets/images/svg//DeliveryBoy.svg';

const TrackOrderScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <MainLayout onBack={navigation.goBack} title="Track Order">
      <View style={{height: '100%', backgroundColor: 'grey', width: '100%'}}>
        <MapSvg width={520} height={1000}/>
      </View>
      <View
        style={{
          backgroundColor: COLORS.white,
          width: '90%',
          position: 'absolute',
          bottom: 50,
          alignSelf: 'center',
          margin: 5,
          borderRadius: 30,
          alignItems: 'center',
          paddingHorizontal: 25,
          paddingVertical: 20,
          borderWidth: 2,
          borderColor: 'black',
        }}>
        <MediumText style={{marginBottom: 20}}>Arrived in 15:48 min</MediumText>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              width: 50,
              height: 50,
              borderRadius: 50,
            }}>
            <DeliveryBoyImg />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('DriverReview')}
            style={{flex: 1, paddingHorizontal: 10}}>
            <SmallText>
              <Text style={{color: COLORS.black}}>Tom Hegde</Text> is on the way
              to deliver your order
            </SmallText>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Call')}
            style={{
              backgroundColor: COLORS.white,
              width: 50,
              height: 50,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="phone-call" size={20} color={'tomato'} />
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({});
