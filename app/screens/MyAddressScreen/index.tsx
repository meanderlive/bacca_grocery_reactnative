import React from 'react';
import {View, Keyboard, TouchableOpacity, ScrollView} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {MediumText, SmallText} from '../../components/MyText';
import {COLORS} from '../../styles';
import Feather from 'react-native-vector-icons/Feather';
import PrimaryBtn from '../../components/PrimaryBtn';

const data = [
  {
    id: 1,
    place: 'Home',
    add: '8000 S Kirkland Ave, Chicago, IL 6065',
  },
  {
    id: 2,
    place: 'Work',
    add: '157 Parkview Ave, Chicago, IL 6058',
  },
  {
    id: 3,
    place: 'Apartment',
    add: '1001 Latin Ave, Chicago, IL 6065',
  },
  {
    id: 4,
    place: 'Parents House',
    add: '5259 Blue Bill Park, PC 4627',
  },
  {
    id: 5,
    place: 'Town Square',
    add: '5375 Summerhouse, PC 4627',
  },
];

const Item = ({
  place,
  onSelect,
  isSelected,
  add,
}: {
  add: string;
  place: string;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        marginBottom: 15,
        backgroundColor: isSelected ? '#FF4C3B' : COLORS.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.black,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <MediumText style={{color: isSelected ? COLORS.white : COLORS.black}}>
          {place}
        </MediumText>
        <Feather
          onPress={() => navigation.navigate('EditAddress')}
          name="edit"
          size={20}
          color={'black'}
        />
      </View>
      <SmallText style={{color: isSelected ? COLORS.white : 'gray'}}>
        {add}
      </SmallText>
    </TouchableOpacity>
  );
};

const MyAddressScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [selectedId, setSelectedId] = React.useState<null | number>(null);
  return (
    <MainLayout title="My Address" onBack={navigation.goBack}>
      <View style={{flex: 1}}>
        <View style={{marginHorizontal: 15, marginTop: 25}}>
          {data.map(i => {
            return (
              <Item
                onSelect={() => setSelectedId(i.id)}
                place={i.place}
                add={i.add}
                isSelected={i.id === selectedId}
              />
            );
          })}
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
          <PrimaryBtn
            onPress={() => navigation.navigate('AddNewAddress')}
            text="Add New Address"
          />
        </View>
      </View>
    </MainLayout>
  );
};

export default MyAddressScreen;
