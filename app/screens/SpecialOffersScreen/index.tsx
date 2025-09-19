import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';

const offers = [
  {
    img: require('../../../assets/images/SpecialOffers/img1.png'),
  },
  {
    img: require('../../../assets/images/SpecialOffers/img2.png'),
  },
  {
    img: require('../../../assets/images/SpecialOffers/img3.png'),
  },
  {
    img: require('../../../assets/images/SpecialOffers/img4.png'),
  },
  
];

const SpecialOffersScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <MainLayout title="Special Offers" onBack={navigation.goBack}>
      <View style={{marginHorizontal: 15,flex:1 ,}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={offers}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  height: 200,
                  marginTop: 15, 
                }}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    borderRadius: 20,
                    resizeMode: 'cover',
                  }}
                  source={item?.img}
                />
              </TouchableOpacity>
            );
          }}
        />
      
      </View>
    </MainLayout>
  );
};

export default SpecialOffersScreen;
