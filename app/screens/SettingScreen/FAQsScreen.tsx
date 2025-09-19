import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
import {RegularText, SmallText} from '../../components/MyText';
import Line from '../../components/Line';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';
import SearchBar from '../../components/SearchBar';

const data = [
  {
    ques: 'What is Justskipline?',
    ans: 'Arcu tortor pellentesque pharetra gravida viverra fermentum. Sitelementum gravida ut dis felis. Duis faucibus cursus tinciduntconsectetur nec. Magna platea aliquam morbi bibendum sed nec.',
  },
  {
    ques: 'How I can make a payment?',
    ans: 'Arcu tortor pellentesque pharetra gravida viverra fermentum. Sitelementum gravida ut dis felis. Duis faucibus cursus tinciduntconsectetur nec. Magna platea aliquam morbi bibendum sed nec.',
  },
  {
    ques: 'How do I cancel order?',
    ans: 'Arcu tortor pellentesque pharetra gravida viverra fermentum. Sitelementum gravida ut dis felis. Duis faucibus cursus tinciduntconsectetur nec. Magna platea aliquam morbi bibendum sed nec.',
  },
  {
    ques: 'How can I delete my account?',
    ans: 'Arcu tortor pellentesque pharetra gravida viverra fermentum. Sitelementum gravida ut dis felis. Duis faucibus cursus tinciduntconsectetur nec. Magna platea aliquam morbi bibendum sed nec.',
  },
  {
    ques: 'How can i exit the app?',
    ans: 'Arcu tortor pellentesque pharetra gravida viverra fermentum. Sitelementum gravida ut dis felis. Duis faucibus cursus tinciduntconsectetur nec. Magna platea aliquam morbi bibendum sed nec.',
  },
];

const QnaList = ({item}: any) => {
  const [qna, setQna] = React.useState(false);
  return (
    <View>
      <View style={{alignItems: 'center', marginVertical: 5}}>
        <Line />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 15,
        }}>
        <RegularText
          style={{
            color: qna ? 'tomato' : 'black',
          }}>
          {item?.ques}
        </RegularText>
        <Entypo
          onPress={() => {
            setQna(!qna);
          }}
          name={qna ? 'minus' : 'plus'}
          size={25}
          color={qna ? 'tomato' : 'black'}
        />
      </View>
      {qna ? (
        <SmallText
          style={{
            marginTop: 10,
            marginHorizontal: 15,
            marginRight: 20,
          }}>
          Arcu tortor pellentesque pharetra gravida viverra fermentum. Sit
          elementum gravida ut dis felis. Duis faucibus cursus tincidunt
          consectetur nec. Magna platea aliquam morbi bibendum sed nec.
        </SmallText>
      ) : null}
    </View>
  );
};

const FAQsScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [active, setActive] = React.useState(1);
  const [qna, setQna] = React.useState(false);

  return (
    <MainLayout title="Language" onBack={navigation.goBack}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 30,
            justifyContent: 'space-between',
            marginHorizontal: 15,
            gap: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              setActive(1);
            }}
            style={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 30,
              height: 40,
              width: '22%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active === 1 ? COLORS.primary : 'white',
            }}>
            <SmallText style={{color: 'black'}}>General</SmallText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActive(2);
            }}
            style={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 30,
              height: 40,
              width: '22%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active === 2 ? COLORS.primary : 'white',
            }}>
            <SmallText style={{color: 'black'}}>Account</SmallText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActive(3);
            }}
            style={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 30,
              height: 40,
              width: '22%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active === 3 ? COLORS.primary : 'white',
            }}>
            <SmallText style={{color: 'black'}}>Service</SmallText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setActive(4);
            }}
            style={{
              borderWidth: 2,
              borderColor: 'black',
              borderRadius: 30,
              height: 40,
              width: '22%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active === 4 ? COLORS.primary : 'white',
            }}>
            <SmallText style={{color: 'black'}}>Payment</SmallText>
          </TouchableOpacity>
        </View>
        <SearchBar />
        <View style={{marginVertical: 10}}></View>

        <FlatList
          data={data}
          renderItem={({item}) => {
            return <QnaList item={item} />;
          }}
        />
        <View style={{height: 40}}></View>
      </ScrollView>
    </MainLayout>
  );
};

export default FAQsScreen;
