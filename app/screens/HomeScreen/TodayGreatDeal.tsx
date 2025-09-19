import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { BigText, RegularText, SmallText } from '../../components/MyText';

const TodayGreatDeal = () => {
  return (
    <View style={{ marginLeft: 0 }}>
      <FlatList
        horizontal
        contentContainerStyle={{ marginLeft: 15, marginRight: 10 }}
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                height: 210,
                marginRight: 15,
                width: 300,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: 'black',
              }}>
              <Image style={{ height: 250, width: '100%' }}
                source={require('../../../assets/images/FoodItems/GreatDeal.png')} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TodayGreatDeal;
