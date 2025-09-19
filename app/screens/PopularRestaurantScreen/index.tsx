import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {BigText, RegularText, SmallText} from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

const data = [
  {
    shop: 'Kroger',
    detail: 'Fruits, Vegetables, Snacks etc.',
    img: require('../../../assets/images/FruitsAndVeggies/Carrot.png'),
  },
  {
    shop: 'La Pizzeria - Pizza Lover',
    detail: 'Vegetables, Snacks etc.',
    img: require('../../../assets/images/FruitsAndVeggies/Tomato.png'),
  },
  {
    shop: 'General Store',
    detail: 'Fruits, Vegetables, Snacks etc.',
    img: require('../../../assets/images/FruitsAndVeggies/Broccoli.png'),
  },
  {
    shop: '24x7 Store',
    detail: 'Fruits, Snacks etc.',
    img: require('../../../assets/images/FruitsAndVeggies/Papaya.png'),
  },
  {
    shop: 'Trader Joe',
    detail: 'Fruits, Vegetables etc.',
    img: require('../../../assets/images/FruitsAndVeggies/Strawberry.png'),
  },
];

const PopularRestaurantScreen = () => {
  const [isLike, setIsLike] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Popular Store" onBack={navigation.goBack}>
      <View style={{marginHorizontal: 15, marginBottom: 50, marginTop: 10}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: 50,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: 'black',
                  marginVertical: 5,
                  marginBottom: 15,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Filter')}
                  style={{
                    width: '50%',
                    borderRightWidth: 2,
                    borderRightColor: 'black',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  <SmallText>Category</SmallText>
                  <AntDesign
                    name="down"
                    size={15}
                    color={'gray'}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: '24%',
                    borderRightWidth: 2,
                    borderRightColor: 'black',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Fontisto
                    style={{marginRight: -7}}
                    name="arrow-down-l"
                    size={15}
                    color={'gray'}
                  />
                  <Fontisto
                    style={{}}
                    name="arrow-up-l"
                    size={15}
                    color={'gray'}
                  />
                  <SmallText>Sort</SmallText>
                </View>
                <TouchableOpacity
                onPress={() => navigation.navigate('Filter')}
                  style={{
                    width: '26%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    style={{}}
                    name="tune-vertical"
                    size={18}
                    color={'gray'}
                  />
                  <SmallText>Filters</SmallText>
                </TouchableOpacity>
              </View>
            );
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('SingleRestaurant')}
                style={{
                  height: 290,
                  margin: 5,marginBottom:15
                }}>
                <View
                  style={{
                    height: 200,
                    width: '100%',
                    borderWidth: 2,
                    borderColor: 'black',
                    borderRadius: 20,
                    // alignItems: 'center',
                    // justifyContent: 'center',
                  }}>
                  <FastImage
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 17,
                      // resizeMode: 'contain',
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
                <RegularText style={{marginVertical: 5}}>
                  {item.shop}
                </RegularText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 2,
                  }}>
                  {/* <Ionicons style={{}} name="bicycle" size={25} color={'black'} /> */}
                  <Fontisto
                    style={{}}
                    name="bicycle"
                    size={15}
                    color={'black'}
                  />
                  <RegularText
                    style={{fontSize: 13, color: 'gray', marginHorizontal: 5}}>
                    Free Delivery
                  </RegularText>
                  <Octicons
                    style={{marginLeft: 15}}
                    name="stopwatch"
                    size={15}
                    color={'black'}
                  />
                  <RegularText
                    style={{fontSize: 13, color: 'gray', marginHorizontal: 5}}>
                    15 - 30 Min
                  </RegularText>
                </View>
                <SmallText style={{marginTop: 7}}>{item.detail}</SmallText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

export default PopularRestaurantScreen;
