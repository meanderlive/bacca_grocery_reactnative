import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {BigText, RegularText, SmallText} from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {COLORS} from '../../styles';
import OrderActive from './OrderActive';
import OrderCompleted from './OrderCompleted';
import OrderCancelled from './OrderCancelled';
import useKeyboardTabHide from '../../hooks/useKeyboardTabHide';

const MyOrdersScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [view, setView] = React.useState(1);

  return (
    <MainLayout title="My Orders" onBack={navigation.goBack}>
      <View style={{flex: 1, marginHorizontal: 15}}>
        <View
          style={{
            height: 60,
            borderRadius: 60,
            borderWidth: 2,
            borderColor: 'black',
            marginVertical: 5,
            marginBottom: 15,
            flexDirection: 'row',
            marginTop: 25,
          }}>
          <TouchableOpacity
            onPress={() => {
              setView(1);
            }}
            style={{
              width: '33%',
              borderRightWidth: 2,
              borderRightColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: view === 1 ? COLORS.primary : 'white',
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
            }}>
            <RegularText style={{color: view === 1 ? COLORS.black : 'gray'}}>
              Active
            </RegularText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setView(2);
            }}
            style={{
              flex: 1,
              backgroundColor: view === 2 ? COLORS.primary : 'white',
              borderRightWidth: 2,
              borderRightColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RegularText style={{color: view === 2 ? COLORS.black : 'gray'}}>
              Completed
            </RegularText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setView(3);
            }}
            style={{
              width: '33%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: view === 3 ? COLORS.primary : 'white',
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
            }}>
            <RegularText style={{color: view === 3 ? COLORS.black : 'gray'}}>
              Cancelled
            </RegularText>
          </TouchableOpacity>
        </View>
        {view === 1 ? <OrderActive /> : null}
        {view === 2 ? <OrderCompleted /> : null}
        {view === 3 ? <OrderCancelled /> : null}
      </View>
    </MainLayout>
  );
};

export default MyOrdersScreen;
