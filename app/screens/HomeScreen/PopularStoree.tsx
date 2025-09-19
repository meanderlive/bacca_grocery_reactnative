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
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Tomato.png'),
    name: 'Winco Store',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Broccoli.png'),
    name: 'General Store',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Papaya.png'),
    name: '24x7 Store',
  },
  {
    img: require('../../../assets/images/FruitsAndVeggies/Strawberry.png'),
    name: 'Trader Joe',
  },
];

const PopularStoree = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [liked, setLiked] = React.useState<Record<number, boolean>>({});

  return (
    <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('SingleRestaurant')}
              style={{
                marginBottom: 20,
                backgroundColor: '#fff',
                borderRadius: 12,
                overflow: 'hidden',
                elevation: 2,
              }}>
              {/* Image + Badge + Like */}
              <View style={{ position: 'relative' }}>
                <Image
                  source={item.img}
                  style={{
                    width: '100%',
                    height: 150,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 15,
                  }}>
                  <RegularText style={{ fontSize: 10 }}>Fruits & Vegetables</RegularText>
                </View>
                <TouchableOpacity
                  onPress={() => setLiked(prev => ({ ...prev, [index]: !prev[index] }))}
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'white',
                    padding: 5,
                    borderRadius: 8,
                  }}>
                  <AntDesign
                    name={liked[index] ? 'heart' : 'hearto'}
                    size={16}
                    color={'red'}
                  />
                </TouchableOpacity>
              </View>

              {/* Name */}
              <RegularText style={{ fontSize: 16, marginTop: 8, marginLeft: 10 }}>
                {item.name}
              </RegularText>

              {/* Delivery Info */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                  marginLeft: 10,
                }}>
                <Fontisto name="bicycle" size={13} color="black" />
                <SmallText style={{ marginHorizontal: 5 }}>Free Delivery</SmallText>
                <MaterialCommunityIcons
                  name="clock-time-four-outline"
                  size={16}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
                <SmallText style={{ marginHorizontal: 5 }}>15 - 30 Min</SmallText>
              </View>

              {/* Category Tags */}
              <SmallText
                style={{
                  marginTop: 6,
                  marginLeft: 10,
                  marginBottom: 10,
                  fontSize: 11,
                  color: '#555',
                }}>
                Fruits, Vegetables, Snacks etc.
              </SmallText>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default PopularStoree;
