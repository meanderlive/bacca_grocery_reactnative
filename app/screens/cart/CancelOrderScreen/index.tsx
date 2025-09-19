import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainLayout from '../../../components/MainLayout';
import PrimaryBtn from '../../../components/PrimaryBtn';
import {RegularText} from '../../../components/MyText';
import {COLORS} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartStackParams, RootStackParams} from '../../../navigation/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const data = [
  {
    id: 1,
    text: 'Waiting for long time',
  },
  {
    id: 2,
    text: 'Unable to contact driver',
  },
  {
    id: 3,
    text: 'Driver denied i go to destination',
  },
  {
    id: 4,
    text: 'Driver denied to come to pickup',
  },
  {
    id: 5,
    text: 'Wrong address shown',
  },
  {
    id: 6,
    text: 'The price is not resonable',
  },
  {
    id: 7,
    text: 'I just want to cancel',
  },
];

const Item = ({
  text,
  onSelect,
  isSelected,
}: {
  text: string;
  onSelect: () => void;
  isSelected: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        marginBottom: 20,
        backgroundColor: isSelected ? '#FF4C3B' : COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLORS.black,
        flexDirection: 'row',
        gap: 10,alignItems:'center'
      }}>
  
      <MaterialIcons 
       name= {isSelected ?  "radio-button-on" :  "radio-button-off"}
       size={24} 
       color= {isSelected ? COLORS.white : COLORS.black}
       />
      <RegularText style={{color: isSelected ? COLORS.white : COLORS.grey}}>
        {text}
      </RegularText>
    </TouchableOpacity>
  );
};

const CancelOrderScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedId, setSelectedId] = React.useState<null | number>(null);
  return (
    <MainLayout onBack={navigation.goBack} title="Cancel Order">
      <ScrollView contentContainerStyle={{padding: 20}}>
        <RegularText style={{color: COLORS.grey, marginBottom: 20}}>
          Please select the reason for cancellation
        </RegularText>

        {data.map(i => {
          return (
            <Item
              onSelect={() => setSelectedId(i.id)}
              text={i.text}
              isSelected={i.id === selectedId}
            />
          );
        })}
        <PrimaryBtn text="Submit" onPress={navigation.goBack} />
      </ScrollView>
    </MainLayout>
  );
};

export default CancelOrderScreen;

const styles = StyleSheet.create({});
