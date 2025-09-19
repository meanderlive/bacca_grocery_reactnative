import React from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation/types';
import {
  BigText,
  MediumText,
  RegularText,
  SmallText,
} from '../../components/MyText';
import {COLORS} from '../../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Rating, AirbnbRating} from 'react-native-ratings';
import PrimaryBtn from '../../components/PrimaryBtn';

const LeaveReviewScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [isLike, setIsLike] = React.useState(true);
  return (
    <MainLayout title="Leave A Review" onBack={navigation.goBack}>
      <ScrollView style={{marginHorizontal: 15}}>
        <View
          style={{
            flexDirection: 'row',
            overflow: 'hidden',
            marginTop: 25,
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
            <Image
              source={require('../../../assets/images/SearchImages/Manchurian.png')}
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
              <MediumText>Manchurian</MediumText>

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
                <RegularText style={{color: 'grey'}}>4.9 (2.3k)</RegularText>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <RegularText>$15.00</RegularText>
              <View
                style={{
                  borderRadius: 5,
                  height: 25,
                  width: 80,
                  backgroundColor: '#00A266',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <SmallText style={{color: 'white'}}>Delivered</SmallText>
              </View>
            </View>
          </View>
        </View>

        <BigText style={{textAlign: 'center', marginTop: 25}}>
          How is your order?
        </BigText>
        <SmallText
          style={{marginVertical: 10, marginTop: 20, textAlign: 'center'}}>
          Please leave a review for your course
        </SmallText>

        <View style={{alignItems: 'center', marginVertical: 15}}>
          <Rating
            jumpValue={1}
            ratingCount={5}
            imageSize={30}
            tintColor={COLORS.white}
            minValue={1}
            ratingBackgroundColor={'red'}
            ratingColor={'#000'}
            startingValue={5}
          />
        </View>
        <View
          style={{
            height: 200,
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
          }}>
          <TextInput style={{flex: 1}} placeholder="Write a review..." />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              marginHorizontal: 15,
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                height: 30,
                width: '48%',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 5,
                flexDirection: 'row',
                paddingLeft: 10,
                gap: 5,
              }}>
              <Feather name={'camera'} size={20} color={'black'} />
              <SmallText>Add Image</SmallText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                height: 30,
                width: '48%',
                borderWidth: 2,
                borderColor: 'black',
                borderRadius: 5,
                flexDirection: 'row',
                paddingLeft: 10,
                gap: 5,
              }}>
              <Feather name={'video'} size={20} color={'black'} />
              <SmallText>Add Video</SmallText>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            marginTop: 50,
          }}>
          <PrimaryBtn
            containerStyle={{
              width: '48%',
              marginHorizontal: 0,
              backgroundColor: 'white',
            }}
            //@ts-ignore
            onPress={() => navigation.navigate('HomeTab')}
            text="Cancel"
          />
          <PrimaryBtn
            containerStyle={{width: '48%', marginHorizontal: 0}}
            //@ts-ignore
            onPress={() => navigation.navigate('HomeTab')}
            text="Submit"
          />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default LeaveReviewScreen;
