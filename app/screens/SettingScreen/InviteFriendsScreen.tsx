import React from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
import {RegularText, SmallText} from '../../components/MyText';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';

const DUMMY_IMAGE =
  'https://cdn.pixabay.com/photo/2015/05/01/19/40/girl-748932_640.jpg';
const data = [
  {
    name: 'Jenny Wilona',
    phone: '+1-202-555-0125',
  },
  {
    name: 'Joffrey Mott',
    phone: '+1-202-134-0125',
  },
  {
    name: 'Marci Senter',
    phone: '+1-402-555-0825',
  },
  {
    name: 'Tynisha Obey',
    phone: '+1-242-335-0125',
  },
  {
    name: 'Elanor Pore',
    phone: '+1-242-875-0125',
  },
  {
    name: 'Tyra Dhillon',
    phone: '+1-202-333-0985',
  },
  {
    name: 'Jamel Eusebio',
    phone: '+1-206-885-0925',
  },
  {
    name: 'Tynisha Obey',
    phone: '+1-202-555-0125',
  },
  {
    name: 'Pedro Huard',
    phone: '+1-207-995-0925',
  },
  {
    name: 'Jenny Wilona',
    phone: '+1-202-555-0125',
  },
  {
    name: 'Joffrey Mott',
    phone: '+1-202-134-0125',
  },
  {
    name: 'Marci Senter',
    phone: '+1-402-555-0825',
  },
  {
    name: 'Tynisha Obey',
    phone: '+1-242-335-0125',
  },
  {
    name: 'Elanor Pore',
    phone: '+1-242-875-0125',
  },
  {
    name: 'Tyra Dhillon',
    phone: '+1-202-333-0985',
  },
  {
    name: 'Jamel Eusebio',
    phone: '+1-206-885-0925',
  },
  {
    name: 'Tynisha Obey',
    phone: '+1-202-555-0125',
  },
  {
    name: 'Pedro Huard',
    phone: '+1-207-995-0925',
  },
];

const FriendList = ({item}: any) => {
  const [invite, setInvite] = React.useState(false);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <View
          style={{
            height: 65,
            width: 65,
            borderRadius: 55,
            backgroundColor: 'lightgray',
          }}>
            <Image style={{height: 65,
            width: 65,
            borderRadius: 55,}} source={{uri:DUMMY_IMAGE}}/>
          </View>
        <View style={{justifyContent: 'center'}}>
          <SmallText
            style={{color: 'black', fontWeight: '700', marginBottom: 5}}>
            {item?.name}
          </SmallText>
          <SmallText>{item?.phone}</SmallText>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setInvite(!invite);
        }}
        style={{
          height: 32,
          width: 62,
          borderWidth: 2,
          borderColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: invite ? 'white' : COLORS.primary,
          borderRadius: 5,
        }}>
        <SmallText style={{color: 'black'}}>
          {invite ? 'Invited' : 'Invite'}
        </SmallText>
      </TouchableOpacity>
    </View>
  );
};

const InviteFriendsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Invite Friends" onBack={navigation.goBack}>
      <View style={{flex: 1, paddingHorizontal: 15}}>
        <FlatList showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return <View style={{height: 25}}></View>;
          }}
          data={data}
          renderItem={({item}) => {
            return <FriendList item={item} />;
          }}
        />
      </View>
    </MainLayout>
  );
};

export default InviteFriendsScreen;
