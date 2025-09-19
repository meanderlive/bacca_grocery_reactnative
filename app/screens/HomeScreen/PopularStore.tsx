import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RegularText, SmallText } from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';



const data = [
  {
    img: require('../../../assets/images/FruitsAndVeggies/Carrot.png'),
    name: 'Kroger',
    // name: 'Fresh Carrot',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Tomato.png'),
    name: 'Winco Store',
    // name: 'Fresh Tomato',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Broccoli.png'),
    name: 'General Store',
    // name: 'Fresh Broccoli',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Papaya.png'),
    name: '24x7 Store',
    // name: 'Fresh Papaya',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Strawberry.png'),
    name: 'Trader Joe',
    // name: 'Fresh Strawberry',
  },
];

const PopularStore = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [isLike, setIsLike] = React.useState(false);
  return (
    <View>
      <FlatList
        horizontal
        contentContainerStyle={{ marginLeft: 15, marginRight: 10 }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('SingleRestaurant')}
              style={{
                height: 240,
                marginRight: 15,
                width: 270,
              }}>
              <View
                style={{
                  height: 150,
                  width: '100%',
                  borderWidth: 2,
                  borderColor: 'black',
                  borderRadius: 20,
                }}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 17,
                  }}
                  source={item.img}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    justifyContent: 'space-between',
                    padding: 7,
                    width: '100%',
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 100,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <RegularText style={{ fontSize: 8, marginHorizontal: 5 }}>
                        Fruits & Vegetables
                      </RegularText>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      backgroundColor: 'white',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>

                    <AntDesign
                      onPress={() => {
                        setIsLike(!isLike);
                      }}
                      name={isLike ? 'heart' : 'hearto'}
                      size={18}
                      color={'red'}
                    />

                  </View>
                </View>
              </View>
              <RegularText style={{ marginVertical: 5, marginLeft: 5 }}>
                {item.name}
              </RegularText>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 2, marginLeft: 5
                }}>
                <Fontisto style={{}} name="bicycle" size={15} color={'black'} />
                <SmallText
                  style={{ marginHorizontal: 5 }}>
                  Free Delivery
                </SmallText>
            
                <MaterialCommunityIcons
                  style={{ marginLeft: 15 }}
                  name="clock-time-four-outline" size={20} color="black" />
                <SmallText
                  style={{ marginHorizontal: 5 }}>
                  15 - 30 Min
                </SmallText>
              </View>
              <SmallText style={{ marginTop: 7, marginLeft: 5, fontSize: 11 }}>
                Fruits, Vegetables, Snacks etc.
              </SmallText>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default PopularStore;
