import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MainLayout from '../../../components/MainLayout';
import {COLORS} from '../../../styles';
import {
  BigText,
  MediumText,
  RegularText,
  SmallText,
  Text25,
} from '../../../components/MyText';
import PrimaryBtn from '../../../components/PrimaryBtn';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/types';

const tips = [
  {
    price: '1',
  },
  {
    price: '2',
  },
  {
    price: '4',
  },
  {
    price: '6',
  },
  {
    price: '8',
  },
 
];

const DriverTipScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [selectedTip, setSelectedtip] = React.useState({});
  return (
    <MainLayout onBack={navigation.goBack} title="Driver Tip">
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: COLORS.white,
              borderRadius: 100,
              marginTop: 35,
              marginBottom: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../../../assets/images/DeliveryBoyImg.png')}
            />
          </View>

          <View>
            <BigText style={{textAlign: 'center'}}>Wow 5 Star! 🤩</BigText>
          </View>

          <SmallText
            style={{
              marginVertical: 20,
              marginBottom: 30,
              marginHorizontal: 30,
              textAlign: 'center',
            }}>
            Do you want to add additional tip to make your driver’s day?
          </SmallText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            {tips.map((item, index) => {
              // @ts-ignore
              const selected = !!selectedTip[item?.price];
              return (
                <TouchableOpacity
                  style={{
                    height: 65,
                    width: 65,
                    borderRadius: 60,
                    borderWidth: 2,
                    borderColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: 7,
                    marginBottom: 10,
                    backgroundColor: selected ? COLORS.primary : 'transparent',
                  }}
                  key={index}
                  onPress={() => {
                    selected
                      ? setSelectedtip({
                          ...selectedTip,
                          [item?.price]: '',
                        })
                      : setSelectedtip({
                          ...selectedTip,
                          [item?.price]: item?.price,
                        });
                  }}>
                  <Text25
                    style={{
                      color: 'black',
                      margin: 5,fontSize:20
                    }}>
                    ${item?.price}
                  </Text25>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity>
            <SmallText
              style={{marginVertical: 10, marginTop: 30, color: 'tomato'}}>
              Enter custom amount
            </SmallText>
          </TouchableOpacity>
        </ScrollView>
        <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 50}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <PrimaryBtn
              containerStyle={{
                width: '48%',
                marginHorizontal: 0,
                backgroundColor: 'white',
              }}
              onPress={() => navigation.navigate('LeaveReview')}
              text="No, Thanks"
            />
            <PrimaryBtn
              containerStyle={{width: '48%', marginHorizontal: 0}}
              // onPress={() => navigation.navigate('LeaveReview')}
              text="Pay Tip"
            />
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default DriverTipScreen;
