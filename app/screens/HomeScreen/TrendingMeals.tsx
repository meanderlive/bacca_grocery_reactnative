import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { BigText, RegularText, SmallText } from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';


const data = [
  {
    img: require('../../../assets/images/FruitsAndVeggies/Broccoli.png'),
    name: 'Fresh Broccoli',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Papaya.png'),
    name: 'Fresh Papaya',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Carrot.png'),
    name: 'Fresh Carrot',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Tomato.png'),
    name: 'Fresh Tomato',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Strawberry.png'),
    name: 'Fresh Strawberry',
  },
];


const TrendingMeals = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [isLike, setIsLike] = React.useState(false);
  return (
    <View>
      <FlatList
        horizontal
        contentContainerStyle={{ marginLeft: 10, marginRight: 10 }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('SingleItem')}
              style={{
                height: 250,
                margin: 5,
                width: 270,
                marginBottom: 35,
              }}>
              <View
                style={{
                  height: 200,
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
                      height: 30,
                      width: 50,
                      backgroundColor: 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}></View>
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

                <View
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: 70,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: 20,
                    marginTop: 128,
                    padding: 10,
                    paddingLeft: 12,
                  }}>
                  <RegularText style={{ color: 'white' }}>
                    {item.name}
                  </RegularText>
                  <SmallText style={{ color: 'white', }}>
                    $10.00/KG
                  </SmallText>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 2,
                  justifyContent: 'space-between', marginLeft: 5
                }}>
                <SmallText style={{ marginVertical: 5, color: 'black' }}>
                  King Soopers
                </SmallText>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                  <FontAwesome
                    style={{ marginLeft: 15 }}
                    name="star"
                    size={15}
                    color={'#FFC107'}
                  />
                  <RegularText style={{ fontSize: 13, marginHorizontal: 5 }}>
                    4.8(1.2k)
                  </RegularText>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 2,marginLeft:5
                }}>

                <MaterialCommunityIcons
                  style={{ marginRight: 5 }}
                  name="clock-time-four-outline" size={18} color={'gray'} />
                <SmallText>25 Min (2.5km)</SmallText>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TrendingMeals;
