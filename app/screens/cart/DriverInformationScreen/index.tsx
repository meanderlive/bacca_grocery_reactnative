// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React from 'react';
// import MainLayout from '../../../components/MainLayout';
// import {RegularText, SmallText} from '../../../components/MyText';
// import {COLORS} from '../../../styles';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// // @ts-ignore
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {CartStackParams} from '../../../navigation/types';

// const DriverInformationScreen = () => {
//   const navigation =
//     useNavigation<NativeStackNavigationProp<CartStackParams>>();
//   return (
//     <MainLayout>
//       <ScrollView contentContainerStyle={{alignItems: 'center'}}>
//         <View style={{justifyContent: 'center', alignItems: 'center'}}>
//           <View
//             style={{
//               backgroundColor: 'grey',
//               width: 100,
//               height: 100,
//               borderRadius: 100,
//             }}></View>
//           <RegularText style={{marginTop: 10}}>Tom Hegde</RegularText>
//           <SmallText style={{color: COLORS.grey}}>+ 1234-456-7890</SmallText>
//         </View>
//         {/* <Line style={{marginVertical: 30}} /> */}
//         <View style={{flexDirection: 'row'}}>
//           <View style={{flex: 1, alignItems: 'center'}}>
//             <View
//               style={{
//                 marginBottom: 5,
//                 width: 60,
//                 height: 60,
//                 borderRadius: 60,
//                 backgroundColor: COLORS.white,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <SimpleLineIcons name="badge" size={25} color={COLORS.primary} />
//             </View>

//             <RegularText>4</RegularText>
//             <SmallText style={{color: COLORS.grey}}>Years</SmallText>
//           </View>
//           <View style={{flex: 1, alignItems: 'center'}}>
//             <View
//               style={{
//                 marginBottom: 5,
//                 width: 60,
//                 height: 60,
//                 borderRadius: 60,
//                 backgroundColor: COLORS.white,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <Ionicons name="bag-outline" size={25} color={COLORS.primary} />
//             </View>

//             <RegularText>925</RegularText>
//             <SmallText style={{color: COLORS.grey}}>Order</SmallText>
//           </View>
//           <View style={{flex: 1, alignItems: 'center'}}>
//             <View
//               style={{
//                 marginBottom: 5,
//                 width: 60,
//                 height: 60,
//                 borderRadius: 60,
//                 backgroundColor: COLORS.white,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <FontAwesome6
//                 name="motorcycle"
//                 size={25}
//                 color={COLORS.primary}
//               />
//             </View>

//             <RegularText>34.5k</RegularText>
//             <SmallText style={{color: COLORS.grey}}>Driving</SmallText>
//           </View>
//           <View style={{flex: 1, alignItems: 'center'}}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('DriverRating')}
//               style={{
//                 marginBottom: 5,
//                 width: 60,
//                 height: 60,
//                 borderRadius: 60,
//                 backgroundColor: COLORS.white,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <AntDesign name="staro" size={25} color={COLORS.primary} />
//             </TouchableOpacity>

//             <RegularText>4.8</RegularText>
//             <SmallText style={{color: COLORS.grey}}>Ratings</SmallText>
//           </View>
//         </View>
//         {/* <Line style={{marginVertical: 30}} /> */}

//         <View
//           style={{
//             width: '90%',
//             padding: 20,
//             borderRadius: 20,
//             backgroundColor: COLORS.white,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginVertical: 10,
//               justifyContent: 'space-between',
//             }}>
//             <RegularText style={{color: COLORS.grey}}>Member Since</RegularText>
//             <RegularText style={{color: COLORS.grey}}>
//               July 25, 2019
//             </RegularText>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginVertical: 10,
//               justifyContent: 'space-between',
//             }}>
//             <RegularText style={{color: COLORS.grey}}>Member Since</RegularText>
//             <RegularText style={{color: COLORS.grey}}>
//               July 25, 2019
//             </RegularText>
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginVertical: 10,
//               justifyContent: 'space-between',
//             }}>
//             <RegularText style={{color: COLORS.grey}}>Member Since</RegularText>
//             <RegularText style={{color: COLORS.grey}}>
//               July 25, 2019
//             </RegularText>
//           </View>
//         </View>
//       </ScrollView>
//     </MainLayout>
//   );
// };

// export default DriverInformationScreen;

// const styles = StyleSheet.create({});
