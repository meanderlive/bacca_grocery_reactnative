import React, {useEffect} from 'react';
import { ScrollView, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
import {RegularText, SmallText} from '../../components/MyText';
import Line from '../../components/Line';
import {RootStackParams} from '../../navigation/types';
import MainLayout from '../../components/MainLayout';

const LanguageScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [active, setActive] = React.useState(1);
  return (
    <MainLayout title="Language" onBack={navigation.goBack}>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View style={{height: 20}}></View>

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <RegularText>English</RegularText>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                setActive(1);
              }}
              name={active === 1 ? 'check-square' : 'square'}
              color={active === 1 ? COLORS.primary : 'gray'}
              size={22}
            />
          </View>
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <RegularText>Hindi</RegularText>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                setActive(2);
              }}
              name={active === 2 ? 'check-square' : 'square'}
              color={active === 2 ? COLORS.primary : 'gray'}
              size={22}
            />
          </View>
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <RegularText>Spanish</RegularText>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                setActive(3);
              }}
              name={active === 3 ? 'check-square' : 'square'}
              color={active === 3 ? COLORS.primary : 'gray'}
              size={22}
            />
          </View>
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <RegularText>French</RegularText>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                setActive(4);
              }}
              name={active === 4 ? 'check-square' : 'square'}
              color={active === 4 ? COLORS.primary : 'gray'}
              size={22}
            />
          </View>
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <RegularText>Arabic</RegularText>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                setActive(5);
              }}
              name={active === 5 ? 'check-square' : 'square'}
              color={active === 5 ? COLORS.primary : 'gray'}
              size={22}
            />
          </View>
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <RegularText>Bengali</RegularText>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                setActive(6);
              }}
              name={active === 6 ? 'check-square' : 'square'}
              color={active === 6 ? COLORS.primary : 'gray'}
              size={22}
            />
          </View>
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <RegularText>Russian</RegularText>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                setActive(7);
              }}
              name={active === 7 ? 'check-square' : 'square'}
              color={active === 7 ? COLORS.primary : 'gray'}
              size={22}
            />
          </View>
        </View>
        <Line />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <RegularText>Chinese</RegularText>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather
              onPress={() => {
                setActive(8);
              }}
              name={active === 8 ? 'check-square' : 'square'}
              color={active === 8 ? COLORS.primary : 'gray'}
              size={22}
            />
          </View>
        </View>
        <Line />
      </ScrollView>
    </MainLayout>
  );
};

export default LanguageScreen;
