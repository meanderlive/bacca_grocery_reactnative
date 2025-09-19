
import {
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RegularText, SmallText } from '../../components/MyText';
import { HomeStackParams, RootStackParams } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS } from '../../styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { removeFromWishlist } from '../../redux/feature/wishlistSlice';
import { addToCart, removeFromCart as removeFromCartAction } from '../../redux/feature/cart/cartSlice';
import MainLayout from '../../components/MainLayout';
import { getImageUrl } from '../../api';


const FoodItem = ({ item }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const itemsByStore = useSelector((state: RootState) => state.cart.itemsByStore);
  const cartItems = Object.values(itemsByStore).flatMap(g => g.items);
  const isInCart = cartItems.some((cartItem: any) => cartItem.productId === item.id);
  const cartItem = cartItems.find((cartItem: any) => cartItem.productId === item.id);
  const storeId = cartItem?.storeId;
  return (
    <View
      style={{
        flexDirection: 'row',
        overflow: 'hidden',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 10,
      }}>
      <TouchableOpacity
        style={{
          flex: 0.4,
          height: 175,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: COLORS.grey,
          borderWidth: 2,
        }}>
        <FastImage
         source={item.avatar ? { uri: getImageUrl(item.avatar) } : item.image ? item.image : require('../../../assets/images/FoodItems/img1.png')}
         style={{ width: '100%', height: '100%' }}
         resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 0.6,
          padding: 9,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <RegularText style={{ fontSize: 18 }}>{item.name}</RegularText>
          <AntDesign
            onPress={() => dispatch(removeFromWishlist(item.id))}
            name={'heart'}
            size={20}
            color={COLORS.primary}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 8,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name="star"
              size={15}
              style={{ marginHorizontal: 2 }}
              color={COLORS.primary}
            />
            <SmallText style={{ color: 'grey' }}>{item.rating}</SmallText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign
              name="clockcircleo"
              size={15}
              style={{ marginHorizontal: 2 }}
              color={COLORS.grey}
            />
            <SmallText style={{ color: 'grey' }}> {item.unit || ''}</SmallText>
          </View>
        </View>
        <SmallText style={{ color: COLORS.primary, fontWeight: 'bold' }}>$ {item.price}</SmallText>
        <SmallText style={{ marginTop: 5 }}>{item.storeName}</SmallText>
        {/* Add/Remove from Cart Button */}
        <TouchableOpacity
          style={{
            marginTop: 10,
            backgroundColor: isInCart ? COLORS.white : COLORS.primary,
            borderColor: COLORS.primary,
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 16,
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={() => {
            if (isInCart && storeId) {
              dispatch(removeFromCartAction({ storeId, productId: item.id }));
            } else {
              const normalizedProduct = {
                ...item,
                id: item._id || item.id,
                storeId: item.restaurantId?._id || item.storeId,
                storeName: item.restaurantId?.display_name || item.restaurantId?.name || item.storeName || 'Unknown Store',
              };
              dispatch(addToCart({ product: normalizedProduct, quantity: 1 }));
            }
          }}
        >
          <AntDesign
            name={isInCart ? 'shoppingcart' : 'plus'}
            size={18}
            color={isInCart ? COLORS.primary : COLORS.white}
            style={{ marginRight: 8 }}
          />
          <RegularText style={{ color: isInCart ? COLORS.primary : COLORS.white }}>
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </RegularText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WishlistScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  return (
    <MainLayout
      title="Wishlist"
      onBack={navigation.goBack}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 20,
            paddingBottom: 25,
          }}
          data={wishlistItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <FoodItem item={item} />}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <AntDesign name="hearto" size={60} color={COLORS.grey} />
              <RegularText style={{ color: COLORS.grey, marginTop: 20 }}>Your wishlist is empty</RegularText>
            </View>
          )}
        />
      </View>
    </MainLayout>
  );
};

export default WishlistScreen;