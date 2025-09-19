import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {
  MediumText,
  SmallText,
} from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../styles';

const data = [
  {
    id: '1',
    title: 'Fresh Orange',
    img: require('../../../assets/images/Fruits/Orange.png'),
    isFav: false,
    rating: '4.8 (1.7k)',
    away: '25 Min (1 km)',
    price: '15.00',
    shop:'Whole Item Market',
  },
];

const OrderActive = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
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
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.4,
                    height: 130,
                    borderRadius: 10,
                    overflow: 'hidden',
                    backgroundColor: 'grey',borderWidth:2
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
                    <MediumText>{item?.title}</MediumText>

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
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <AntDesign
                        name="star"
                        size={10}
                        style={{marginHorizontal: 2}}
                        color={COLORS.primary}
                      />
                      <SmallText style={{color: 'grey'}}>
                        {item?.rating}
                      </SmallText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <AntDesign
                        name="clockcircleo"
                        size={10}
                        style={{marginHorizontal: 2}}
                        color={COLORS.grey}
                      />
                      <SmallText style={{color: 'grey'}}>
                        {item?.away}
                      </SmallText>
                    </View>
                  </View>
                  <SmallText style={{color: 'black'}}>
                    $ {item?.price}
                  </SmallText>
                  <SmallText style={{marginTop: 5}}>{item?.shop}</SmallText>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                  marginBottom: 35,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('CancelOrder')}
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: '48%',
                    borderRadius: 40,
                  }}>
                  <SmallText style={{color: 'black'}}>Cancel Order</SmallText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TrackOrder')}
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: '48%',
                    borderRadius: 40,
                    backgroundColor: COLORS.primary,
                  }}>
                  <SmallText style={{color: 'black'}}>Track Order</SmallText>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

export default OrderActive;
