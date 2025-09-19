import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';
import { RegularText, SmallText} from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { COLORS } from '../../styles';

const data = [
  {
    img: require('../../../assets/images/FruitsAndVeggies/Broccoli.png'),
    name: 'Fresh Broccoli',
    shop: 'Kroger',
    price: '$10.00',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Papaya.png'),
    name: 'Fresh Papaya',
    shop: 'King Soopers',
    price: '$60.00',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Carrot.png'),
    name: 'Fresh Carrot',
    shop: 'World Fresh Market',
    price: '$20.00',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Tomato.png'),
    name: 'Fresh Tomato',
    shop: 'Winco Store',
    price: '$60.00',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Strawberry.png'),
    name: 'Fresh Strawberry',
    shop: 'Trader Joe',
    price: '$60.00',
  },
];

const TrendingMealsScreen = () => {
  const [isLike, setIsLike] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Trending Meals" onBack={navigation.goBack}>
      <View style={{marginHorizontal: 15, marginTop: 15, marginBottom: 50}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  height: 290,
                  marginVertical:5
                }}>
                <View
                  style={{
                    height: 220,
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
                      padding: 5,
                      paddingLeft: 12,bottom:-2
                    }}>
                    <RegularText style={{color: 'white'}}>
                      {item.name}
                    </RegularText>
                    <RegularText style={{color: 'white', marginTop: 5}}>
                      {item.price}
                    </RegularText>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <SmallText style={{marginVertical: 5, color: 'black'}}>
                    {item.shop}
                  </SmallText>

                  <View style={{flexDirection: 'row'}}>
                  <FontAwesome name="star" size={24} color={COLORS.primary} />
                    <SmallText style={{ marginHorizontal: 5}}>
                      4.8(1.2k)
                    </SmallText>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Octicons
                    style={{marginRight: 5}}
                    name="stopwatch"
                    size={15}
                    color={'gray'}
                  />

                  <SmallText>25 Min(2.5km)</SmallText>
                </View>
              </View>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

export default TrendingMealsScreen;
