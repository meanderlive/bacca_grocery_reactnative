import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  MediumText,
  RegularTextGray,
  SmallText,
  TitleText,
} from '../../components/MyText';
import ImgSvg from '../../../assets/icon/svg/WaitlistImg.svg'; 
import MainLayout from '../../components/MainLayout';
import { RootStackParams } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../styles';




const WaitlistStatusScreen = () => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
   <MainLayout title='Waitlist Status' onBack={navigation.goBack}>
    <View style={{flex:1 , padding:20}}>
        <View style={{marginTop:10, alignItems:'center'}}>

        <ImgSvg />

        <MediumText>Check in by 1:45 pm</MediumText>
        <RegularTextGray>Estimating sitting time 1:45 - 1:54</RegularTextGray>
        </View>
        <View style={styles.container}>
          <View style={{flexDirection: 'row', gap:15,alignItems:'center'}}>
            <MediumText>You are 2nd in line</MediumText>
          <View style={styles.pending}>
            <SmallText style={{color:'white'}}>Pending</SmallText>
          </View>
          </View>
          <RegularTextGray>Based on all party sizes</RegularTextGray>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={styles.btn}>
                <TitleText>View Waitlist</TitleText>
            </TouchableOpacity>
            <TouchableOpacity
                        onPress={()=>navigation.goBack()}

            style={[styles.btn,{backgroundColor:COLORS.primary}]}>
                <TitleText>Leave Waitlist</TitleText>
            </TouchableOpacity>
          </View>
        </View>
    </View>
   </MainLayout>
  );
};

export default WaitlistStatusScreen;


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.02)',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 1,
      borderRadius: 20,
      marginTop: 40,
      paddingHorizontal: 20,
      paddingVertical: 20,
      gap: 7,
    },
    pending:{
        borderRadius:5,
        height:25,
        width:80,
        alignItems:'center',
        justifyContent:'center',backgroundColor:'#FF5E5E'
    },
    btn:{
        width:'48%',
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:50,borderWidth:2,
        borderColor:'black'
    }
  });
  