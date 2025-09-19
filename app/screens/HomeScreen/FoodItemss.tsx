import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SmallText, MediumText} from '../../components/MyText';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

interface Category {
  id: string;
  name: string;
  img?: any;
  color?: string;
}

interface FoodItemssProps {
  categories: Category[];
}

const defaultImg = require('../../../assets/images/FoodItems/img1.png');
const defaultColor = '#4CAF50';

const FoodItemss: React.FC<FoodItemssProps> = ({ categories }) => {
  return (
    <View style={{marginHorizontal: 15, marginTop: 10, marginBottom: 5}}>
      <MediumText style={{fontSize: 18, color: '#333', marginBottom: 15}}>
        <AntDesignIcon name="shoppingcart" size={18} /> Shop by Category
      </MediumText>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <View
              style={{
                height: 100,
                margin: 5,
                alignItems: 'center',
                marginBottom: 15,
                width: 80,
              }}>
              <TouchableOpacity
                style={{
                  height: 75,
                  width: 75,
                  borderRadius: 15,
                  backgroundColor: (item.color || defaultColor) + '20', // 20% opacity
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: (item.color || defaultColor) + '40', // 40% opacity
                }}>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    // borderRadius:50,
                    resizeMode: 'contain',
                  }}
                  source={item?.img || defaultImg}
                />
              </TouchableOpacity>
              <SmallText style={{
                textAlign: 'center', 
                color: '#333',
                fontSize: 12,
                marginTop: 8,
              }}>
                {item?.name}
              </SmallText>
            </View>
          );
        }}
      />
    </View>
  );
};

export default FoodItemss;
