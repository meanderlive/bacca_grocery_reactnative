import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {BigText, RegularText} from '../../components/MyText';
import {COLORS} from '../../styles';
import PrimaryBtn from '../../components/PrimaryBtn';

const interests = [
  {
    name: 'Bread',
  },
  {
    name: 'Cheese',
  },
  {
    name: 'Butter',
  },
  {
    name: 'Pie',
  },
  {
    name: 'Yogurt',
  },
  {
    name: 'Sandwich',
  },
  {
    name: 'Pancake',
  },
  {
    name: 'Honey',
  },
  {
    name: 'Waffle',
  },
  {
    name: 'Donuts',
  },
  {
    name: 'Salad',
  },
  {
    name: 'Bacon',
  },
  {
    name: 'Egg',
  },
  {
    name: 'Noodles',
  },
  {
    name: 'Burger',
  },
  {
    name: 'Tuna',
  },
  {
    name: 'Grilled Chicken',
  },
  {
    name: 'Meatball',
  },
  {
    name: 'Pizza',
  },
  {
    name: 'French Fries',
  },
  {
    name: 'Biryani',
  },
  {
    name: 'Pasta',
  },
  {
    name: 'Smoked Salmon',
  },
  {
    name: 'Hotdog',
  },
  {
    name: 'Mayonnaise',
  },
  {
    name: 'Dosa',
  },
  {
    name: 'Ice Cream',
  },
];

const InterestScreen = () => {
  const [selectedIntrest, setSelectedIntrest] = useState({});
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout
      title="Choose Interests"
      onBack={navigation.goBack}
      skipBtn="Skip"
      onPress={() => navigation.navigate('SetLocation')}>
      <ScrollView>
        <RegularText
          style={{
            color: 'gray',
            marginHorizontal: 15,
            marginVertical: 25,
            textAlign: 'center',
          }}>
          Choose 3 or more items you are interested
        </RegularText>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {interests.map((item, index) => {
            // @ts-ignore
            const selected = !!selectedIntrest[item?.name];
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  selected
                    ? setSelectedIntrest({...selectedIntrest, [item?.name]: ''})
                    : setSelectedIntrest({
                        ...selectedIntrest,
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
        <PrimaryBtn
          text={'Next'}
          onPress={() => navigation.navigate('SetLocation')}
        />
      </View>
    </MainLayout>
  );
};

export default InterestScreen;
