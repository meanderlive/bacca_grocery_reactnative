import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { removeFromCart, updateQuantity, removeStore, setScheduledTime } from '../../redux/feature/cart/cartSlice';
import { COLORS } from '../../styles';
import { MediumText, RegularText, SmallText } from '../../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { getImageUrl } from '../../api';
import FastImage from 'react-native-fast-image';

const CartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const itemsByStore = useSelector((state: RootState) => state.cart.itemsByStore);
  const cartTotal = useSelector((state: RootState) => state.cart.totalAmount);

  // Convert itemsByStore to array for rendering
  const storeGroups = Object.values(itemsByStore);

  const [promoCode, setPromoCode] = useState('');
  const [deliveryFee] = useState(2.99);
  const [tax] = useState(1.50);

  const handleQuantityChange = (storeId: string, productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart({ storeId, productId }));
    } else {
      dispatch(updateQuantity({ storeId, productId, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (storeId: string, productId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => dispatch(removeFromCart({ storeId, productId })) },
      ]
    );
  };

  const handleRemoveStore = (storeId: string) => {
    Alert.alert(
      'Remove All Items',
      'Remove all items from this store?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', onPress: () => dispatch(removeStore(storeId)) },
      ]
    );
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      Alert.alert('Promo Code Applied', 'Your discount has been applied!');
    }
  };

  const handleCheckout = () => {
    if (storeGroups.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout.');
      return;
    }
    navigation.navigate('TimeSelection');
  };

  const subtotal = cartTotal;
  const discount = promoCode ? subtotal * 0.1 : 0; // 10% discount if promo code applied
  const finalTotal = subtotal + deliveryFee + tax - discount;

  if (storeGroups.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyContent}>
          <View style={styles.emptyIconContainer}>
            <Feather name="shopping-cart" size={80} color={COLORS.grey} />
          </View>
          <MediumText style={styles.emptyTitle}>Your cart is empty</MediumText>
          <RegularText style={styles.emptySubtitle}>
            Add some items to get started with your grocery shopping
          </RegularText>
          <TouchableOpacity
            style={styles.startShoppingButton}
            onPress={() => {
              const tabNavigation = navigation.getParent();
              if (tabNavigation) {
                tabNavigation.navigate('HomeTab');
              }
            }}
          >
            <RegularText style={styles.startShoppingText}>Start Shopping</RegularText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <MediumText style={styles.headerTitle}>Shopping Cart</MediumText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cart Items Grouped by Store */}
        <View style={styles.itemsSection}>
          <MediumText style={styles.sectionTitle}>Cart Items</MediumText>
          {storeGroups.map((group) => (
            <View key={group.storeId} style={{ marginBottom: 24, borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 16 }}>
              {/* Store Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <MediumText style={{ fontSize: 16 }}>{group.storeName}</MediumText>
                {/* Removed remove store button for better appearance */}
              </View>
              {/* Store Items */}
              {group.items.map((item) => (
                <View key={item.productId} style={styles.cartItem}>
                  <FastImage
                    source={
                      (item.product as any).image && typeof (item.product as any).image === 'object' && (item.product as any).image.uri
                        ? { 
                            uri: (item.product as any).image.uri,
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.immutable
                          }
                        : (item.product as any).avatar
                          ? { 
                              uri: getImageUrl((item.product as any).avatar),
                              priority: FastImage.priority.high,
                              cache: FastImage.cacheControl.immutable
                            }
                          : require('../../../assets/images/FoodItems/img1.png')
                    }
                    style={styles.itemImage}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.product.name}
                    </Text>
                    <RegularText style={styles.itemStore}>{group.storeName}</RegularText>
                    <View style={styles.itemPriceRow}>
                      <MediumText style={styles.itemPrice}>${Number(item.product.price || 0).toFixed(2)}</MediumText>
                      {item.product.originalPrice && (
                        <RegularText style={styles.itemOriginalPrice}>
                          ${item.product.originalPrice.toFixed(2)}
                        </RegularText>
                      )}
                    </View>
                  </View>
                  <View style={styles.itemActions}>
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(group.storeId, item.productId, item.quantity - 1)}
                      >
                        <AntDesign name="minus" size={16} color={COLORS.black} />
                      </TouchableOpacity>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => handleQuantityChange(group.storeId, item.productId, item.quantity + 1)}
                      >
                        <AntDesign name="plus" size={16} color={COLORS.black} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveItem(group.storeId, item.productId)}
                    >
                      <Feather name="trash-2" size={18} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Promo Code */}
        <View style={styles.promoSection}>
          <MediumText style={styles.sectionTitle}>Promo Code</MediumText>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              placeholderTextColor={COLORS.grey}
            />
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyPromo}
            >
              <RegularText style={styles.applyButtonText}>Apply</RegularText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <MediumText style={styles.sectionTitle}>Order Summary</MediumText>

          <View style={styles.summaryRow}>
            <RegularText style={styles.summaryLabel}>Subtotal</RegularText>
            <RegularText style={styles.summaryValue}>${subtotal.toFixed(2)}</RegularText>
          </View>

          <View style={styles.summaryRow}>
            <RegularText style={styles.summaryLabel}>Delivery Fee</RegularText>
            <RegularText style={styles.summaryValue}>${deliveryFee.toFixed(2)}</RegularText>
          </View>

          <View style={styles.summaryRow}>
            <RegularText style={styles.summaryLabel}>Tax</RegularText>
            <RegularText style={styles.summaryValue}>${tax.toFixed(2)}</RegularText>
          </View>

          {discount > 0 && (
            <View style={styles.summaryRow}>
              <RegularText style={styles.summaryLabel}>Discount</RegularText>
              <RegularText style={[styles.summaryValue, styles.discountText]}>
                -${discount.toFixed(2)}
              </RegularText>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <MediumText style={styles.totalLabel}>Total</MediumText>
            <MediumText style={styles.totalValue}>${finalTotal.toFixed(2)}</MediumText>
          </View>
        </View>

        {/* Bottom Spacing */}
        {/* <View style={styles.bottomSpacing} /> */}
        <View style={styles.bottomSpacing} />
        {/* Checkout Button */}
        <View style={styles.checkoutContainer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <MediumText style={styles.checkoutButtonText}>
              Proceed to Checkout
            </MediumText>
            <RegularText style={styles.checkoutSubtext}>
              ${finalTotal.toFixed(2)} • {storeGroups.reduce((sum, group) => sum + group.items.length, 0)} items
            </RegularText>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSpacing} />
        {/* <View style={styles.bottomSpacing} /> */}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  headerRight: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  startShoppingButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  startShoppingText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
  itemsSection: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 15,
    fontWeight: '600',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
    lineHeight: 20,
  },
  itemStore: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 8,
  },
  itemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
    marginRight: 8,
  },
  itemOriginalPrice: {
    fontSize: 14,
    color: COLORS.grey,
    textDecorationLine: 'line-through',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  quantityText: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  promoSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: COLORS.black,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  applyButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '600',
  },
  summarySection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  summaryValue: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  discountText: {
    color: '#4CAF50',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  totalLabel: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
  checkoutContainer: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  checkoutButtonText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  checkoutSubtext: {
    color: COLORS.black,
    fontSize: 14,
    opacity: 0.8,
  },
});

export default CartScreen; 