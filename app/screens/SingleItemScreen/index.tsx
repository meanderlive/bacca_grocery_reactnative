import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {
  MediumText,
  RegularText,
  SmallText,
  Text25,
} from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../styles';
import PrimaryBtn from '../../components/PrimaryBtn';


const SingleItemScreen = () => {
  const navigation = useNavigation();
  // useNavigation<NativeStackNavigationProp<CartStackParams>>();

  const [isLike, setIsLike] = React.useState(true);
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'black',
            padding: 15,
            paddingTop: 30,
          }}>
          <AntDesign
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={25}
            color={COLORS.white}
          />
        </View>

        <View
          style={{
            backgroundColor: 'black',
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
            paddingHorizontal: 15,
            paddingBottom: 25,
            marginBottom: 10,
          }}>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
              
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text25 style={{color: 'white'}}>Fresh Oranges</Text25>
            </View>
  
            <View
              style={{
                height: 30,
                width: 30,
                borderWidth: 2,
                borderColor: 'white',
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

          <MediumText style={{color: 'tomato'}}>
            $60 {''} {''} {''}
            <MediumText
              style={{color: 'white', textDecorationLine: 'line-through'}}>
              $80
            </MediumText>
          </MediumText>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="star"
                size={20}
                style={{marginHorizontal: 2}}
                color={COLORS.primary}
              />
              <RegularText style={{color: 'white'}}>
                {' '}
                4.7(1k+ratings)
              </RegularText>
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="share-outline"
                size={25}
                style={{marginHorizontal: 2}}
                color={COLORS.white}
              />
              <RegularText style={{color: 'white'}}>Share</RegularText>
            </TouchableOpacity>
          </View>

          <SmallText style={{color: 'white', marginVertical: 10,}}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden.
          </SmallText>

          <View
            style={{
              borderWidth: 2,
              borderColor: 'white',
              backgroundColor: '#00A266',
              height: 35,
              width: 70,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              marginVertical: 5,
            }}>
            <SmallText style={{color: 'white', marginRight: 3}}>
              🥦 Veg
            </SmallText>
          </View>
        </View>

        <FlatList
          style={{paddingLeft: 5, marginBottom: 30}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[1, 2, 3, 4, 5]}
          renderItem={() => {
            return (
              <View
                style={{
                  height: 200,
                  width: 230,
                  backgroundColor: 'white',
                  margin: 10,
                  borderRadius: 15,borderWidth:2
                }}>
                <FastImage style={{height:'100%', width:'100%'}} source={require('../../../assets/images/Fruits/Orange.png')} />
              </View>
            );
          }}
        />
        <View style={{marginTop: 15}}>
          <PrimaryBtn
            //@ts-ignore
            onPress={() => navigation.navigate('CartTab')}
            text="Add To Cart"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SingleItemScreen;
