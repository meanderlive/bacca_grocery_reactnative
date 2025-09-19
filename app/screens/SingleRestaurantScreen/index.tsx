import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParams} from '../../navigation/types';
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
import Logo from '../../../assets/images/svg/KrogerLogo.svg';
import LocationSvg from '../../../assets/images/svg/LocationSvg.svg';
import TodaysGreatDeal from './TodaysGreatDeal';
import ItemsList from './ItemsList';

const SingleRestaurantScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
            // height: 300,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
            paddingHorizontal: 15,
            paddingBottom: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Logo />

              <Text25 style={{color: 'white'}}>Kroger</Text25>
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
          <SmallText style={{color: 'white', marginVertical: 5}}>
            Burgers, American
          </SmallText>
          <View
            style={{
              height: 2,
              backgroundColor: '#707070',
              marginVertical: 15,
            }}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <LocationSvg />
            <View
              style={{
                // backgroundColor: 'red',
                height: 50,
                justifyContent: 'space-between',
                marginLeft: 10,
              }}>
              <SmallText style={{color: 'white'}}>Outlet</SmallText>
              <SmallText style={{color: 'white'}}>20 Mins</SmallText>
            </View>
            <View
              style={{
                // backgroundColor: 'red',
                height: 50,
                justifyContent: 'space-between',
                marginLeft: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SmallText style={{color: 'white', marginRight: 10}}>
                  Parkview
                </SmallText>
                <AntDesign
                  // onPress={() => navigation.goBack()}
                  name="down"
                  size={15}
                  color={'yellow'}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SmallText style={{color: 'white', marginRight: 10}}>
                  Deliver to Home
                </SmallText>
                <AntDesign
                  // onPress={() => navigation.goBack()}
                  name="down"
                  size={15}
                  color={'yellow'}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{paddingHorizontal: 15, flex: 1, marginTop: 15}}>
          <MediumText>Today’s Great Deal 💸s</MediumText>
          <TodaysGreatDeal />
        </View>
        <View style={{marginVertical: 25}}>
          <SearchBar />
        </View>
        <ItemsList />
      </ScrollView>
    </View>
  );
};

export default SingleRestaurantScreen;
