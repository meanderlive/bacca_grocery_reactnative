import React, {useEffect} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';

// COMPONENTS

// ICONS
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
import {RegularText, SmallText} from '../../components/MyText';
import Line from '../../components/Line';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';
import ToggleSwitch from 'toggle-switch-react-native';

type RowProps = {
  text: string;

  icon: () => React.ReactNode;
  onPress?: () => void;
};

const Row = ({text, icon, onPress}: RowProps) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
        }}>
        <View
          style={{
            width: 55,
            height: 55,
            backgroundColor: COLORS.white,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: COLORS.black,
            borderWidth: 2,
          }}>
          {icon && icon()}
        </View>
        <RegularText style={{flex: 1}}>{text}</RegularText>
        <Entypo name="chevron-small-right" color={COLORS.black} size={30} />
      </TouchableOpacity>
      <Line />
    </React.Fragment>
  );
};

const SettingScreen = () => {
  const [darkmode, setDarkmode] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Settings" onBack={navigation.goBack}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View style={{height: 20}}></View>
        <Row
          onPress={() => navigation.navigate('NotificationOption')}
          icon={() => <Fontisto name="bell" color="#333" size={24} />}
          text="Notification"
        />
        <Row
          onPress={() => navigation.navigate('Language')}
          icon={() => <Entypo name="language" color="#333" size={24} />}
          text="Language"
        />
        {/* <Row
          icon={() => <FontAwesome name="dollar" color="#333" size={24} />}
          text="Currency"
        /> */}
        <Row
          onPress={() => navigation.navigate('AboutUs')}
          icon={() => <Octicons name="info" color="#333" size={24} />}
          text="About Us"
        />
        <Row
          onPress={() => navigation.navigate('PrivacyPolicy')}
          icon={() => <Octicons name="lock" color="#333" size={24} />}
          text="Privacy Policy"
        />
        <Row
          onPress={() => navigation.navigate('FAQs')}
          icon={() => <Octicons name="question" color="#333" size={24} />}
          text="FAQs"
        />
        <Row
          icon={() => <Octicons name="pencil" color="#333" size={24} />}
          text="Send Feedback"
        />
        <Row
          onPress={() => navigation.navigate('ContactUs')}
          icon={() => <AntDesign name="customerservice" color="#333" size={24} />}
          text="Help & Support"
        />
        {/* <Row
          icon={() => <Feather name="eye" color="#333" size={24} />}
          text="Dark Mode"
        /> */}

        <TouchableOpacity
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
          }}>
          <View
            style={{
              width: 55,
              height: 55,
              backgroundColor: COLORS.white,
              borderRadius: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: COLORS.black,
              borderWidth: 2,
            }}>
            <Feather name="eye" color="#333" size={24} />
          </View>
          <RegularText style={{flex: 1}}>Dark Mode</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={darkmode}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setDarkmode(isOn)}
          />
          {/* <Entypo name="chevron-small-right" color={COLORS.black} size={30} /> */}
        </TouchableOpacity>
        <Line />

        <Row
          onPress={() => navigation.navigate('InviteFriends')}
          icon={() => <Feather name="user-plus" color="#333" size={24} />}
          text="Invite Friends"
        />
      </ScrollView>
    </MainLayout>
  );
};

export default SettingScreen;
