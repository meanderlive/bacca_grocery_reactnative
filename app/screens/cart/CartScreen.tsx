import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import MainLayout from '../../components/MainLayout';
import { COLORS } from '../../styles';
import { MediumText, RegularText, SmallText } from '../../components/MyText';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';

const DottedRow = () => {
  return (
    <View
      style={{
        borderBottomColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 2,
        borderStyle: 'dashed',
        width: '95%',
        marginVertical: 15,
        alignSelf: 'center',
      }}></View>
  );
};

const CartItem = () => {
  const [count, setCount] = React.useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        overflow: 'hidden',
        marginTop: 10,
        marginHorizontal: 20,
        gap: 10
      }}>
      <View
        style={{
          flex: 0.4,
          height: 130,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: 'grey', borderWidth: 2
        }}>
        <FastImage
          source={require('../../../assets/images/Fruits/Orange.png')}
          style={{ width: '100%', resizeMode: 'cover', height: '100%' }}
        />
      </View>
      <View
        style={{
          flex: 0.6,
          padding: 5,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <RegularText style={{ fontSize: 18 }}>Fresh Orange</RegularText>
          <RegularText>

            $60.00
            <RegularText
              style={{ textDecorationLine: 'line-through', color: 'gray' }}>
              $80.00
            </RegularText>
          </RegularText>
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: 10,
            gap: 20,
            borderRadius: 50,
            borderColor: COLORS.black,
            borderWidth: 2,
            padding: 10,
            marginRight: 'auto', borderBottomWidth: 3, alignItems: 'center',
            paddingHorizontal: 10
          }}>
          <TouchableOpacity onPress={decrement}>
            <AntDesign name="minus" color={COLORS.black} size={15} />
          </TouchableOpacity>
          <SmallText style={{ color: COLORS.black }}>{count}</SmallText>
          <TouchableOpacity onPress={increment}>
            <AntDesign name="plus" color={COLORS.black} size={15} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CartScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [active, setActive] = React.useState(0);

  return (
    <MainLayout onBack={navigation.goBack} title="Cart">
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                backgroundColor: COLORS.black,
                width: '100%',
                height: 90,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <View>
                <RegularText style={{ color: COLORS.white }}>$62.95</RegularText>
                <SmallText style={{ color: COLORS.white }}>
                  Customized Items
                </SmallText>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('PaymentOptions')}
                style={{
                  backgroundColor: COLORS.primary,
                  paddingHorizontal: 40,
                  borderRadius: 30,
                  borderColor: COLORS.white,
                  borderWidth: 2,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <RegularText style={{ color: COLORS.black }}>
                  Proceed to Pay
                </RegularText>
              </TouchableOpacity>
            </View>
          );
        }}
        data={[1]}
        renderItem={() => {
          return <CartItem />;
        }}
        ListFooterComponent={() => {
          return (
            <View style={{ margin: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate('NearByYou')}>
                <RegularText style={{ color: 'gray' }}>
                  + Add more items
                </RegularText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('DeliveryAddress')}
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                  alignItems: 'center',
                  gap: 10,
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    width: 60,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                    height: 60,
                    borderRadius: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SimpleLineIcons
                    size={24}
                    color={COLORS.black}
                    name="location-pin"
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <RegularText style={{ color: COLORS.black }}>
                    Delivery Details
                  </RegularText>
                  <SmallText style={{ color: 'gray' }}>
                    8000 S kirkland Ave, Chicago, IL 6050
                  </SmallText>
                </View>
                <AntDesign size={15} color={COLORS.black} name="right" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('OfferAndBenefit')}
                style={{ width: '70%' }}>
                <MediumText>Offers & Benefits 🎁</MediumText>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 15,
                  marginVertical: 15,
                  marginBottom: 25,
                }}>
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    flex: 1,
                    borderRadius: 50,
                    paddingLeft: 15,
                  }}
                  placeholder="Enter coupan code"
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: COLORS.primary,
                    width: 50,
                    borderWidth: 2,
                    borderColor: COLORS.black,
                    height: 50,
                    borderRadius: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Entypo size={30} color={COLORS.black} name="cross" />
                </TouchableOpacity>
              </View>

              <MediumText>Tip Your Delivery Partner 💰</MediumText>
              <SmallText>
                Thank your delivery partner by leaving them a tip.
              </SmallText>
              <SmallText>
                100% of the tip will go to your delivery partner.
              </SmallText>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 30,
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setActive(1);
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    borderRadius: 30,
                    height: 30,
                    width: '22%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: active === 1 ? COLORS.primary : 'white',
                  }}>
                  <RegularText>$2</RegularText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setActive(2);
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    borderRadius: 30,
                    height: 30,
                    width: '22%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: active === 2 ? COLORS.primary : 'white',
                  }}>
                  <RegularText>$5</RegularText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setActive(3);
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    borderRadius: 30,
                    height: 30,
                    width: '22%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: active === 3 ? COLORS.primary : 'white',
                  }}>
                  <RegularText>$10</RegularText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setActive(4);
                  }}
                  style={{
                    borderWidth: 2,
                    borderColor: 'black',
                    borderRadius: 30,
                    height: 30,
                    width: '22%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: active === 4 ? COLORS.primary : 'white',
                  }}>
                  <RegularText>Other</RegularText>
                </TouchableOpacity>
              </View>

              <MediumText>Bill Details</MediumText>

              <View
                style={{
                  // backgroundColor: COLORS.white,
                  marginVertical: 15,
                  borderRadius: 15,
                  padding: 5,
                  borderWidth: 2,
                  borderColor: 'black',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                    marginHorizontal: 5,
                  }}>
                  <RegularText style={{}}>Item Total</RegularText>
                  <RegularText style={{ color: 'gray' }}>$60</RegularText>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                    marginHorizontal: 5,
                  }}>
                  <RegularText style={{ textDecorationLine: 'underline' }}>
                    Delivery Fee | 1.9 Kms
                  </RegularText>
                  <RegularText style={{ color: 'gray' }}>$2</RegularText>
                </View>
                <SmallText style={{ marginLeft: 10 }}>
                  This fee goes towards paying your
                </SmallText>
                <SmallText style={{ marginLeft: 10, marginBottom: 10 }}>
                  Delivery Partner fairly
                </SmallText>

                <DottedRow />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                    marginHorizontal: 5,
                  }}>
                  <RegularText>Delivery Tip</RegularText>
                  <TouchableOpacity>
                    <RegularText style={{ color: 'tomato' }}>Add tip</RegularText>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                    marginHorizontal: 5,
                  }}>
                  <RegularText style={{ textDecorationLine: 'underline' }}>
                    Govt Taxes & Other Charges
                  </RegularText>
                  <RegularText style={{ color: 'gray' }}>$10.95</RegularText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                    marginHorizontal: 5,
                  }}>
                  <RegularText>Offers & Benefits</RegularText>
                  <RegularText style={{ color: 'gray' }}>- $10</RegularText>
                </View>

                <DottedRow />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                    marginHorizontal: 5,
                  }}>
                  <RegularText>To Pay</RegularText>
                  <RegularText>$62.95</RegularText>
                </View>
              </View>
              <MediumText>
                Review your order and address details to avoid cancellations
              </MediumText>
              <View
                style={{
                  marginVertical: 15,
                  borderRadius: 15,
                  padding: 5,
                  borderWidth: 2,
                  borderColor: 'black',
                  paddingVertical: 20,
                  paddingLeft: 15,
                }}>
                <RegularText>
                  Note:{' '}
                  <RegularText style={{ color: 'gray' }}>
                    If you cancel within 60 seconds of placing your order, a
                    100% refund will be issued. No refund for cancellations made
                    after 60 seconds
                  </RegularText>
                </RegularText>
                <RegularText style={{ color: 'gray', marginVertical: 10 }}>
                  Avoid cancellation as it leads to food wastage.
                </RegularText>
                <TouchableOpacity>
                  <RegularText
                    style={{
                      color: 'tomato',
                      marginTop: 10,
                      textDecorationLine: 'underline',
                    }}>
                    Read Cancellation Policy
                  </RegularText>
                </TouchableOpacity>
              </View>
              <View style={{ height: 20 }}></View>
            </View>
          );
        }}
      />
    </MainLayout>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
