import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { COLORS } from '../../styles';
import { BigText } from '../../components/MyText';
import { RootStackParams } from '../../navigation/types';
import MainLayout from '../../components/MainLayout';
import SvgImage from '../../../assets/images/svg/Logout.svg';
import PrimaryBtn from '../../components/PrimaryBtn';
import { destroyLocalStorage } from '../../utils/helper';
import { logoutUser } from '../../redux/feature/auth/authSlice';

const LogoutScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  
  const handleLogout = async () => {
    try {
      // This will clear both local storage and redux state
      await dispatch(logoutUser() as any);
      
      // Reset navigation stack and navigate to Login
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <MainLayout title="Log Out" onBack={navigation.goBack}>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 350,
            // backgroundColor: 'gray',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <SvgImage />
        </View>
        <BigText style={{textAlign: 'center'}}>Are you sure you want</BigText>
        <BigText style={{textAlign: 'center'}}>to log out?</BigText>

        <View style={{gap: 15, marginTop: 60}}>
          <PrimaryBtn
            onPress={handleLogout}
            containerStyle={{backgroundColor: 'white'}}
            text="Sure"
          />
          <PrimaryBtn onPress={() => navigation.goBack()} text="Cancel" />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default LogoutScreen;
