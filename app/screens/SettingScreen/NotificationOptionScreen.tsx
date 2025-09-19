import React from 'react';
import { ScrollView, View} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
import {RegularText} from '../../components/MyText';
import Line from '../../components/Line';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';
import ToggleSwitch from 'toggle-switch-react-native';

const NotificationOptionScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [generalNotification, setGeneralNotification] = React.useState(false);
  const [sound, setSound] = React.useState(false);
  const [vibrate, setVibrate] = React.useState(false);
  const [specialOffers, setSpecialOffers] = React.useState(false);
  const [promoDiscount, setPromoDiscount] = React.useState(false);
  const [payments, setPayments] = React.useState(false);
  const [appUpdates, setAppUpdates] = React.useState(false);
  const [newFood, setNewFood] = React.useState(false);
  const [newRestraunt, setNewRestraunt] = React.useState(false);

  return (
    <MainLayout title="Notification Options" onBack={navigation.goBack}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View style={{height: 20}}></View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RegularText style={{flex: 1}}>General Notification</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={generalNotification}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setGeneralNotification(isOn)}
          />
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <RegularText style={{flex: 1}}>Sound</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={sound}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setSound(isOn)}
          />
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <RegularText style={{flex: 1}}>Vibrate</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={vibrate}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setVibrate(isOn)}
          />
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <RegularText style={{flex: 1}}>Special Offers</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={specialOffers}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setSpecialOffers(isOn)}
          />
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <RegularText style={{flex: 1}}>Promo & Discount</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={promoDiscount}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setPromoDiscount(isOn)}
          />
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <RegularText style={{flex: 1}}>Payments</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={payments}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setPayments(isOn)}
          />
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <RegularText style={{flex: 1}}>App Updates</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={appUpdates}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setAppUpdates(isOn)}
          />
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <RegularText style={{flex: 1}}>New Food Item Available</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={newFood}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setNewFood(isOn)}
          />
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <RegularText style={{flex: 1}}>New Restraunt Available</RegularText>
          <ToggleSwitch
            trackOffStyle={{borderColor: 'lightgray', borderWidth: 1}}
            trackOnStyle={{borderColor: COLORS.primary, borderWidth: 1}}
            isOn={newRestraunt}
            offColor={'transparent'}
            onColor={COLORS.primary}
            size="medium"
            onToggle={isOn => setNewRestraunt(isOn)}
          />
        </View>
        <Line />
      </ScrollView>
    </MainLayout>
  );
};

export default NotificationOptionScreen;
