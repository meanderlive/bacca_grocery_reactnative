import {Text, FlatList, TouchableOpacity, Share} from 'react-native';
import React from 'react';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';

import {SHEETS} from './sheets';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {View} from 'react-native';
import {COLORS} from '../styles';
import {RegularText} from '../components/MyText';
import {useNavigation} from '@react-navigation/native';

const options = [
  {name: 'Female', value: 'Female'},
  {name: 'Male', value: 'Male'},
];

const GenderSelectSheet = (props: any) => {
  const close = () => {
    SheetManager.hide(SHEETS.GenderSelectSheet);
  };

  return (
    <ActionSheet id={props.sheetId} gestureEnabled>
      <FlatList
        style={{height: 150, padding: 20}}
        data={options}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props?.payload?.onSelect(item.value);
                SheetManager.hide(SHEETS.GenderSelectSheet);
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  padding: 5,
                  margin: 5,
                  fontWeight: 'bold',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </ActionSheet>
  );
};

export default GenderSelectSheet;
