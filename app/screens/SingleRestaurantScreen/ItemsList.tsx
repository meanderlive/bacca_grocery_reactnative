import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RegularText, SmallText} from '../../components/MyText';
import {HomeStackParams, RootStackParams} from '../../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
import {burgersList, fruitsList} from '../../constants/dummy';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FoodItem = ({item}: any) => {
  const [isLike, setIsLike] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('SingleItem')}
      style={{
        flexDirection: 'row',
        overflow: 'hidden',
        marginTop: 10,alignItems:'center'
      }}>
      <View
        style={{
          flex: 0.4,
          height: 130,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: 'white',
          marginRight: 3,
          borderWidth:2
        }}>
        <Image
          source={item?.img}
          style={{width: '100%', resizeMode: 'cover', height: '100%'}}
        />
      </View>
      <View
        style={{
          flex: 0.6,
          padding: 5,gap:5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <RegularText style={{fontSize: 16}}>{item?.title}</RegularText>

          <AntDesign
            onPress={() => {
              setIsLike(!isLike);
            }}
            name={isLike ? 'heart' : 'hearto'}
            size={20}
            color={'red'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign
              name="star"
              size={10}
              style={{marginHorizontal: 2}}
              color={COLORS.primary}
            />
            <SmallText style={{color: 'grey'}}>{item?.rating}</SmallText>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign
              name="clockcircleo"
              size={10}
              style={{marginHorizontal: 2}}
              color={COLORS.grey}
            />
            <SmallText style={{color: 'grey'}}>{item?.away}</SmallText>
          </View>
        </View>
        <SmallText style={{color: 'black'}}>${item?.price}</SmallText>
      </View>
    </TouchableOpacity>
  );
};

const ItemsList = () => {
  const [active, setActive] = React.useState(0);

  return (
    <View style={{marginLeft: 15}}>
      <FlatList
        contentContainerStyle={{
          marginRight: 10,
          paddingBottom: 25,
        }}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                // justifyContent: 'space-around',
                marginVertical: 10,
                gap: 15,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setActive(1);
                }}
                style={{
                  height: 35,
                  borderWidth: 2,
                  borderColor: 'black',
                  borderRadius: 50,
                  //   width: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active === 1 ? COLORS.primary : 'white',
                  paddingHorizontal: 10,
                }}>
                <SmallText style={{color: 'black'}}>🥦 Veg</SmallText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setActive(2);
                }}
                style={{
                  height: 35,
                  borderWidth: 2,
                  borderColor: 'black',
                  borderRadius: 50,

                  //   width: 110,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active === 2 ? COLORS.primary : 'white',
                  paddingHorizontal: 10,
                }}>
                <SmallText style={{color: 'black'}}>🥩 Non Veg</SmallText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setActive(3);
                }}
                style={{
                  height: 35,
                  borderWidth: 2,
                  borderColor: 'black',
                  borderRadius: 50,

                  //   width: 110,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: active === 3 ? COLORS.primary : 'white',
                  paddingHorizontal: 10,
                }}>
                <SmallText style={{color: 'black'}}>🔥 Best Seller</SmallText>
              </TouchableOpacity>
            </View>
          );
        }}
        data={fruitsList}
        renderItem={({item}: {item: any}) => {
          return <FoodItem item={item} />;
        }}
      />
    </View>
  );
};

export default ItemsList;
