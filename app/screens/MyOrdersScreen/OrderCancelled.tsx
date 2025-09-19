import {View, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {
  MediumText,
  RegularText,
  SmallText,
} from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../styles';

const data = [
  {
    id: '1',
    title: 'Fresh Apricot',
    img: require('../../../assets/images/Fruits/Apricot.png'),
    isFav: true,
    rating: '4.9 (2.3k)',
    away: '25 Min (1.2 km)',
    price: '15.00',
    shop: 'Mr. Foodie',
  },
  {
    id: '2',
    title: 'Fresh Strawberry',
    img: require('../../../assets/images/Fruits/Strawberry.png'),
    isFav: true,
    rating: '4.8 (1.7k)',
    away: '25 Min (1.2 km)',
    price: '50.00',
    shop: 'Mr. Foodie',
  },
];

const OrderCancelled = () => {
  const [isLike, setIsLike] = React.useState(true);
  return (
    <View style={{}}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  overflow: 'hidden',
                  marginTop: 10,
                  marginBottom: 30,
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.4,
                    height: 120,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: 'grey',
                    borderWidth: 2,
                    borderColor: 'black',
                  }}>
                  <FastImage
                    source={item?.img}
                    style={{width: '100%', resizeMode: 'cover', height: '100%'}}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flex: 0.6,
                    padding: 5,
                    marginLeft: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <RegularText>{item?.title}</RegularText>

                    {/* <AntDesign
                      onPress={() => {
                        setIsLike(!isLike);
                      }}
                      name={isLike ? 'heart' : 'hearto'}
                      size={20}
                      color={'red'}
                    /> */}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 8,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                      }}>
                      <AntDesign
                        name="star"
                        size={18}
                        style={{marginHorizontal: 2, marginRight: 5}}
                        color={COLORS.primary}
                      />
                      <SmallText style={{color: 'grey'}}>
                        {item?.rating}
                      </SmallText>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <RegularText>$ {item?.price}</RegularText>
                    <View
                      style={{
                        borderRadius: 5,
                        height: 25,
                        width: 80,
                        // backgroundColor: '#00A266',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: 'tomato',
                      }}>
                      <SmallText style={{color: 'tomato'}}>Cancelled</SmallText>
                    </View>
                  </View>
                  {/* <SmallText style={{marginTop: 5}}>{item?.shop}</SmallText> */}
                </View>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default OrderCancelled;
