import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {BigText, RegularText} from '../../components/MyText';
import {COLORS} from '../../styles';
import PrimaryBtn from '../../components/PrimaryBtn';

const languages = [
  {
    name: 'Hindi',
  },
  {
    name: 'English',
  },
  {
    name: 'Chinese',
  },
  {
    name: 'Portuguese',
  },
  {
    name: 'Spanish',
  },
  {
    name: 'Arabic',
  },
  {
    name: 'Bulgarian',
  },
  {
    name: 'French',
  },
  {
    name: 'Russian',
  },
];

const LanguageSelectScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState({});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout
      skipBtn="Skip"
      onPress={() => navigation.navigate('AllowNotification')}>
      <ScrollView>
        <BigText style={{marginHorizontal: 15, marginVertical: 20}}>
          Hey, Jessica
        </BigText>
        <RegularText
          style={{color: 'gray', marginHorizontal: 15, marginBottom: 25}}>
          Please select your preferred language to facilitate communication.
        </RegularText>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {languages.map((item, index) => {
            // @ts-ignore
            const selected = !!selectedLanguage[item?.name];
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  selected
                    ? setSelectedLanguage({
                        ...selectedLanguage,
                        [item?.name]: '',
                      })
                    : setSelectedLanguage({
                        ...selectedLanguage,
                        [item?.name]: item?.name,
                      });
                }}>
                <Text
                  style={{
                    // opacity: selected ? 1 : 0.5,
                    fontSize: 15,
                    color: 'black',
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    borderWidth: 2,
                    borderColor: 'black',
                    margin: 5,
                    backgroundColor: selected ? COLORS.primary : 'transparent',
                  }}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={{marginBottom: 50}}>
        {/* <PrimaryBtn
          text={'Next'}
          onPress={() => navigation.navigate('AllowNotification')}
        /> */}
      </View>
    </MainLayout>
  );
};

export default LanguageSelectScreen;
