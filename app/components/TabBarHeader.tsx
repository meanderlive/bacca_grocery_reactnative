import React from 'react';
import {COLORS} from '../styles';
import {View, ScrollView, Image, Dimensions, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {RegularText} from './MyText';

type Props = {
  children: React.ReactNode;
  title?: string;
  skipBtn?: string;
  onBack?: () => void;
  onPress?: () => void;
  onBackTitle?: string;
};

const TabBarHeader = ({children, title, skipBtn, onBack, onPress}: Props) => {
  const extraStyle = {
    marginVertical: 15,
    marginHorizontal: 15,
    marginTop: 0,
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: COLORS.white, paddingTop: 15}}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          },
          onBack ? extraStyle : {},
        ]}>
        {onBack && (
          <TouchableOpacity onPress={onBack}>
            <AntDesign name="arrowleft" size={25} color={COLORS.black} />
          </TouchableOpacity>
        )}
        <RegularText style={{color: COLORS.black, fontSize: 20}}>
          {title}
        </RegularText>
        <TouchableOpacity onPress={onPress}>
          {/* <MaterialCommunityIcons
            name="hexagon-slice-6"
            size={25}
            color={'black'}
          /> */}
          <AntDesign name="setting" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      {title && (
        <View
          style={{
            borderWidth: 0.4,
            borderColor: 'rgba(0,0,0,0.2)',
          }}
        />
      )}
      {children}
    </SafeAreaView>
  );
};

export default TabBarHeader;
