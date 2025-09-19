import React, {useEffect, useState, useCallback} from 'react';
import {ActivityIndicator, ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import type { ImageLoadEventData, NativeSyntheticEvent } from 'react-native';

// COMPONENTS

// ICONS
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS} from '../../styles';
// Define User interface
interface User {
  _id: string;
  fullname: string;
  email: string;
  contact_number?: string;
  dob?: string;
  gender?: string;
  avatar?: string;
  token: string;
  profileImage?: string; // Add this line if profileImage is used instead of avatar
}
import {RegularText, SmallText} from '../../components/MyText';
import Line from '../../components/Line';
import {RootStackParams} from '../../navigation/types';
import TabBarHeader from '../../components/TabBarHeader';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, updateUser } from '../../redux/feature/auth/authSlice';
import { api_userById } from '../../api/user';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getImageUrl } from '../../api';

const DUMMY_IMAGE ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDZyW123awiBXP9sfx-5jA9Vmv01Op-XLexHQS_2fxXBcL-2oQ8hxmH4&s";

type RowProps = {
  text: string;

  icon: () => React.ReactNode;
  onPress?: () => void;
};

const Row = ({text, icon, onPress}: RowProps) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
        }}>
        <View
          style={{
            width: 55,
            height: 55,
            backgroundColor: COLORS.white,
            borderRadius: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: COLORS.black,
            borderWidth: 2,
          }}>
          {icon && icon()}
        </View>
        <RegularText style={{flex: 1}}>{text}</RegularText>
        <AntDesign name="right" color={COLORS.black} size={15} />
      </TouchableOpacity>
      <Line />
    </React.Fragment>
  );
};

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const user = useSelector(authSelector) as User;
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const refreshUserData = useCallback(async () => {
    try {
      setRefreshing(true);
      if (user?._id) {
        const response = await api_userById(user._id);
        if (response?.data) {
          dispatch(updateUser(response.data));
        }
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [user?._id, dispatch]);

  useEffect(() => {
    if (isFocused) {
      refreshUserData();
    }
  }, [isFocused, refreshUserData]);

  // Debug effect to log user data when it changes
  useEffect(() => {
    console.log('=== DEBUG: User Data ===');
    console.log('Full user object:', JSON.stringify(user, null, 2));
    
    if (user?.profileImage) {
      console.log('Profile image path:', user.profileImage);
      console.log('Profile image full URL:', getImageUrl(user.profileImage));
    } else if (user?.avatar) {
      console.log('Avatar path:', user.avatar);
      console.log('Avatar full URL:', getImageUrl(user.avatar));
    } else {
      console.log('No profile image or avatar found in user object');
    }
    
    console.log('========================');
  }, [user]);

  console.log("user in ",user)
  console.log("avatar",user?.avatar )

  const getProfileImage = useCallback(() => {
    // Check both profileImage and avatar fields, with profileImage taking precedence
    const imagePath = user?.profileImage || user?.avatar;
    
    if (!imagePath) {
      return { uri: DUMMY_IMAGE };
    }
    
    // Use getImageUrl which now handles both relative and absolute paths
    const imageUrl = getImageUrl(imagePath);
    
    return { 
      uri: `${imageUrl}?t=${Date.now()}`,
      priority: FastImage.priority.high,
      cache: FastImage.cacheControl.web,
    };
  }, [user?.profileImage, user?.avatar]);

  return (
    <TabBarHeader
      onBack={navigation.goBack}
      title="Account"
      onPress={() => navigation.navigate('Setting')}>
      {/* <FullScreenLoader
        loading={loadings[combineThunkType['users/fetchUserById']]}
      /> */}
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 20,
            marginHorizontal: 20,
          }}>
          <View
            style={{
              width: 85,
              height: 85,
              backgroundColor: COLORS.grey,
              borderRadius: 85,
            }}>
            <View style={{
              width: 85,
              height: 85,
              borderRadius: 42.5,
              backgroundColor: COLORS.grey,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FastImage
                source={getProfileImage()}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode={FastImage.resizeMode.cover}
                onLoadStart={() => console.log('Starting to load profile image')}
                onLoadEnd={() => console.log('Finished loading profile image')}
                onError={() => {
                  console.log('Error loading profile image');
                  const imageSource = getProfileImage();
                  console.log('Image source being used:', imageSource);
                  
                  if (user?.profileImage) {
                    console.log('Profile image path:', user.profileImage);
                    console.log('Full profile image URL:', getImageUrl(user.profileImage));
                  }
                  if (user?.avatar) {
                    console.log('Avatar path:', user.avatar);
                    console.log('Full avatar URL:', getImageUrl(user.avatar));
                  }
                }}
              />
              {isImageUploading && (
                <ActivityIndicator 
                  size="small" 
                  color={COLORS.primary} 
                  style={{
                    position: 'absolute',
                    alignSelf: 'center'
                  }} 
                />
              )}
            </View>
          </View>
          <View style={{flex: 1, marginTop: 15}}>
            <RegularText style={{fontSize: 20, fontWeight: 'bold'}}>{user?.fullname || 'User'}</RegularText>
            <View style={{marginTop: 10, gap: 8}}>
              {/* Email */}
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <MaterialIcons name="email" size={18} color={COLORS.primary} />
                <SmallText style={{opacity: 0.8}}>{user?.email || '-'}</SmallText>
              </View>
              {/* DOB */}
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <MaterialIcons name="cake" size={18} color={COLORS.primary} />
                <SmallText style={{opacity: 0.8}}>{user?.dob || '-'}</SmallText>
              </View>
              {/* Gender */}
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <MaterialIcons name="person" size={18} color={COLORS.primary} />
                <SmallText style={{opacity: 0.8}}>{user?.gender || '-'}</SmallText>
              </View>
              {/* Contact Number */}
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <MaterialIcons name="phone" size={18} color={COLORS.primary} />
                <SmallText style={{opacity: 0.8}}>{user?.contact_number || '-'}</SmallText>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}
              style={{
                backgroundColor: COLORS.primary,
                width: 40,
                height: 40,
                borderColor: COLORS.black,
                borderWidth: 2,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="edit-2" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>

        <Line style={{marginTop: 50}} />

        <Row
          onPress={() => navigation.navigate('MyWallet')}
          icon={() => (
            <MaterialCommunityIcons
              name="wallet-outline"
              color="#333"
              size={24}
            />
          )}
          text="My Wallet"
        />
        <Row
          onPress={() => navigation.navigate('MyOrders')}
          icon={() => (
            <MaterialCommunityIcons
              name="shopping-outline"
              color="#333"
              size={24}
            />
          )}
          text="My Orders"
        />
        <Row
          onPress={() => navigation.navigate('PaymentMethod')}
          icon={() => <AntDesign name="creditcard" color="#333" size={24} />}
          text="Payments Methods"
        />
        <Row
          onPress={() => navigation.navigate('MyAddress')}
          icon={() => <Octicons name="location" color="#333" size={24} />}
          // onPress={() => navigation.navigate('Help')}
          text="Delivery Address"
        />
        <Row
          icon={() => <Feather name="gift" color="#333" size={24} />}
          text="Promocodes $ Gift Cards"
        />
         <Row
         onPress={() => navigation.navigate('DeleteAccount')}
          icon={() => <MaterialIcons name="delete-outline" size={24} color="black" />}
          text="Delete your Account"
        />
        <Row
          onPress={() => navigation.navigate('Logout')}
          icon={() => (
            <MaterialCommunityIcons name="logout" color="#333" size={24} />
          )}
          text="Logout"
        />
        <View style={{height: 40}}></View>
      </ScrollView>
    </TabBarHeader>
  );
};

export default ProfileScreen;
