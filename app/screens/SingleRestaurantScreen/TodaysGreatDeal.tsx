import {View,FlatList,Image} from 'react-native';
import React from 'react';

const TodaysGreatDeal = () => {
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[1, 2, 3, 4, 5]}
        renderItem={({item}) => {
          return (
            <View
              style={{
                height: 210,
                width: 350,
                borderRadius: 20,
                flexDirection: 'row',
                marginTop: 20,
              }}>
          <Image style={{height:'100%', width:'100%'}} source={require('../../../assets/images/Storebanner.png')}/>
            </View>
          );
        }}
      />
    </View>
  );
};

export default TodaysGreatDeal;
