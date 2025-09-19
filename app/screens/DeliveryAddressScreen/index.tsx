import React from 'react';
import {View, Keyboard, TouchableOpacity} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {MediumText, SmallText} from '../../components/MyText';
import {COLORS} from '../../styles';

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
    place: 'Other',
    add: '1001 Latin Ave, Chicago, IL 6065',
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
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        marginBottom: 15,
        backgroundColor: isSelected ? '#FF4C3B' : COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.black,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <MediumText style={{color: isSelected ? COLORS.white : COLORS.black}}>
          {place}
        </MediumText>
        <View style={{flexDirection: 'row', gap: 40, alignItems: 'center'}}>
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: isSelected ? COLORS.white : COLORS.black,
            }}>
            {isSelected && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 12,
                  backgroundColor: COLORS.white,
                }}
              />
            )}
          </View>
        </View>
      </View>
      <SmallText style={{color: isSelected ? COLORS.white : 'gray'}}>
        {add}
      </SmallText>
    </TouchableOpacity>
  );
};

const DeliveryAddressScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [selectedId, setSelectedId] = React.useState<null | number>(null);
  return (
    <MainLayout title="Delivery Address" onBack={navigation.goBack}>
      <View style={{flex: 1, marginHorizontal: 15}}>
        <MediumText style={{marginTop: 20, marginBottom: 10}}>
          Choose Delivery Address
        </MediumText>
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
    </MainLayout>
  );
};

export default DeliveryAddressScreen;
