import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { clearCart } from '../../redux/feature/cart/cartSlice';
import { COLORS } from '../../styles';
import { MediumText, RegularText, SmallText } from '../../components/MyText';
import OrderProcessingModal from '../../components/OrderProcessingModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ConfirmOrderModal from '../../modals/ConfirmOrderModal';
import { api_orderCreate } from '../../api/order';
import { getImageUrl } from '../../api';
import {  CreateOrderPayload, CartItem } from '../../types';

// Inline types for cart summary
type StoreCartGroup = {
  storeId: string;
  storeName: string;
  scheduledTime?: string;
  items: CartItem[];
};

interface OrderDetails {
  _id: string;
  orderNumber: string;
  userId: string;
  storeId: string;
  items: Array<{
    productId: string;
    productName: string;
    productImage?: string | { uri: string };
    quantity: number;
    price: number;
    totalPrice: number;
  }>;
  subtotal: number;
  tax: number;
  totalAmount: number;
  pickupSlot: string;
  pickupTime: string;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: string;
  paymentMethod: string;
  paymentIntentId?: string;
  // Additional fields from API
  name?: string;
  display_name?: string;
  description?: string;
  note?: string;
  admin_note?: string;
  is_activated?: boolean;
  is_deleted?: boolean;
  updated_at?: string;
}

interface CheckoutScreenProps {
  route: {
    params?: {
      slot?: string;
      slots?: { [storeId: string]: { option: string; timeSlot?: string } };
    };
  };
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const [imageAvatar, setImageAvatar] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);
  // console.log('CheckoutScreen - User:', user?._id);
  // Use grouped cart state for multi-store
  const itemsByStore = useSelector((state: RootState) => state.cart.itemsByStore);
  const storeGroups: StoreCartGroup[] = Object.values(itemsByStore);
  // Get all cart items from all store groups
  const cartItems: CartItem[] = storeGroups.flatMap(group => group.items);

  React.useEffect(() => {
    if (cartItems?.length > 0) {
      const imageUris = cartItems
      //@ts-ignore
        .map(item => item.product?.image?.uri)
        .filter((uri): uri is string => !!uri);
      
      setImageAvatar(prevUris => {
        // Only update if there are new URIs that aren't already in the state
        const newUris = [...new Set([...prevUris, ...imageUris])];
        return newUris.length !== prevUris.length ? newUris : prevUris;
      });
    }
  }, [cartItems]);

  // console.log('imageAvatar', imageAvatar);
  // Debug cart data
  // console.log('CheckoutScreen - Cart data:', {
  //   storeGroupsCount: storeGroups.length,
  //   cartItemsCount: cartItems.length,
  //   storeGroups: storeGroups.map(group => ({
  //     storeId: group.storeId,
  //     storeName: group.storeName,
  //     itemsCount: group.items.length,
  //     items: group.items.map(item => ({
  //       productId: item.productId,
  //       productName: item.product.name,
  //       hasImage: !!item.product.image,
  //       hasAvatar: !!item.product.avatar,
  //       image: item.product.image,
  //       avatar: item.product.avatar
  //     }))
  //   }))
  // });
  
  // Route params typing
  const params = route.params as { slot?: string; slots?: { [storeId: string]: { option: string; timeSlot?: string } } } | undefined;
  const slot = params?.slot || 'Immediate';
  const slots = params?.slots || null;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryAddress] = useState({
    name: 'John Doe',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    phone: '+1 (555) 123-4567'
  });

  const tax = 1.50;
  const subtotal = useSelector((state: RootState) => state.cart.totalAmount);
  const total = subtotal + tax;



  // Helper function to generate dynamic order name
  const generateOrderName = (storeName: string) => {
    const timestamp = new Date().toLocaleString();
    return `Order from ${storeName} - ${timestamp}`;
  };

  // Helper function to generate dynamic description
  const generateOrderDescription = (items: CartItem[], storeName: string) => {
    const itemCount = items.length;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return `Order containing ${itemCount} products (${totalItems} items) from ${storeName}`;
  };

  const paymentMethods = [
    { id: 'card', name: 'creditcard', icon: 'creditcard', iconFamily: 'AntDesign' },
    { id: 'paypal', name: 'PayPal', icon: 'paypal', iconFamily: 'Entypo' },
    { id: 'apple', name: 'apple', icon: 'apple-pay', iconFamily: 'FontAwesome5' },
    { id: 'google', name: 'google', icon: 'google-pay', iconFamily: 'FontAwesome5' },
  ];
  const handlePlaceOrder = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = async () => {
    setShowConfirmModal(false);
    setIsProcessing(true);
    try {
      // Get the first store group (assuming single store for now)
      const firstStoreGroup = storeGroups[0];
      if (!firstStoreGroup) {
        throw new Error('No items in cart');
      }

      // Create order payload with dynamic data
      const orderPayload: CreateOrderPayload = {
         //@ts-ignore
        userId:  user?._id, // This should come from user context/auth
        name: generateOrderName(firstStoreGroup.storeName), // Dynamic store name
        display_name: `Food Order - ${new Date().toLocaleDateString()}`, // Dynamic with date
        description: generateOrderDescription(cartItems, firstStoreGroup.storeName), // Dynamic description
        products: storeGroups.flatMap(group => 
          group.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          }))
        ),
        slot: slot, // Dynamic slot from user selection
        note: `Order placed via mobile app at ${new Date().toLocaleTimeString()} - Payment Method: ${selectedPaymentMethod}`, // Dynamic with timestamp and payment method
        admin_note: `Mobile order - Total: $${total.toFixed(2)}, Items: ${cartItems.length}, Store: ${firstStoreGroup.storeName}`, // Dynamic with order details
      };

      // Call API to create order
      let response;
      try {
        // console.log('CheckoutScreen - Creating order with payload:', orderPayload);
        response = await api_orderCreate(orderPayload);
        // console.log('CheckoutScreen - Raw API Response:', JSON.stringify(response, null, 2));
        
        if (!response.isSuccess) {
          throw new Error(response.message || 'Failed to create order');
        }
        
        
        // Validate that payment intent ID exists
         //@ts-ignore
        if (!response.data.paymentIntentId) {
          // console.log('CheckoutScreen - ERROR: Payment Intent ID is missing from response');
          // console.log('CheckoutScreen - Available fields in response.data:', Object.keys(response.data));
          throw new Error('Payment Intent ID not received from server');
        }
        
        
      } catch (error: any) {
        console.log('CheckoutScreen - API call failed:', error);
        console.log('CheckoutScreen - Error message:', error.message);
        console.log('CheckoutScreen - Error stack:', error.stack);
        Alert.alert(
          'Order Creation Failed', 
          `Failed to create order: ${error.message}`,
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Go to Home', 
              onPress: () => navigation.navigate('MainTab')
            }
          ]
        );
        return; // Exit early if order creation fails
      }

      // Create order details for confirmation screen using the actual API response
  const data = response.data as any;

  // Process items from store groups to create order items
  const orderItems = storeGroups.flatMap(storeGroup => 
    storeGroup.items.map(item => {
      const product = item.product;
      const imageUrl = typeof product.avatar === 'string' ? product.avatar : 
                      typeof product.image === 'string' ? product.image : '';
      
      return {
        productId: item.productId,
        productName: product.name || 'Unknown Product',
        imageUrl: imageUrl ? getImageUrl(imageUrl) : '',
        quantity: item.quantity,
        price: product.price || 0,
        totalPrice: (product.price || 0) * item.quantity,
        product: {
          ...product,
          image: imageUrl,
          images: product.images || [{ uri: imageUrl }]
        }
      };
    })
  );

  // Create the order details object
  const orderDetails = {
    _id: data._id || `temp-${Date.now()}`,
    orderNumber: data.orderNumber || `ORD-${Date.now()}`,
    userId: data.userId || user?._id,
    storeId: data.storeId || storeGroups[0]?.storeId || '',
    storeName: storeGroups[0]?.storeName || 'Store',
    items: orderItems,
    subtotal: data.subtotal || subtotal,
    tax: data.tax || tax,
    totalAmount: data.total_price || total,
    pickupSlot: data.slot || 'Immediate',
    pickupTime: data.slot || 'Immediate',
    orderDate: data.created_at || new Date().toISOString(),
    status: data.status || 'pending',
    paymentStatus: data.paymentStatus || 'pending',
    paymentMethod: selectedPaymentMethod,
    paymentIntentId: data.paymentIntentId,
    ...data
  };

      console.log('CheckoutScreen - Order Details being passed:', orderDetails);
      
      dispatch(clearCart());
      navigation.navigate('OrderConfirmation', { 
        ...orderDetails,
        isBuyNow: false
      });
    } catch (error: any) {
      Alert.alert('Order Error', error?.message || 'Something went wrong while placing the order.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
  };

  const handleAddressPress = () => {
    // Navigate to address selection
    console.log('Navigate to address selection');
  };

  const handlePaymentPress = () => {
    // Navigate to payment method selection
    console.log('Navigate to payment method selection');
  };

  console.log('imageAvatar', imageAvatar);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <MediumText style={styles.headerTitle}>Checkout</MediumText>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MediumText style={styles.sectionTitle}>Delivery Address</MediumText>
            <TouchableOpacity onPress={handleAddressPress}>
              <RegularText style={styles.editText}>Edit</RegularText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <Feather name="map-pin" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.addressInfo}>
              <MediumText style={styles.addressName}>{deliveryAddress.name}</MediumText>
              <RegularText style={styles.addressText}>
                {deliveryAddress.address}
              </RegularText>
              <RegularText style={styles.addressText}>
                {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.zipCode}
              </RegularText>
              <RegularText style={styles.addressPhone}>
                {deliveryAddress.phone}
              </RegularText>
            </View>
          </View>
        </View>

      
    {/* Payment Method */}
    <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <MediumText style={styles.sectionTitle}>Payment Method</MediumText>
      <TouchableOpacity onPress={handlePaymentPress}>
        <RegularText style={styles.editText}>Edit</RegularText>
      </TouchableOpacity>
    </View>
    
    {paymentMethods.map((method) => {
      const IconComponent = 
        method.iconFamily === 'Feather' ? Feather :
        method.iconFamily === 'AntDesign' ? AntDesign :
        method.iconFamily === 'Entypo' ? Entypo :
        FontAwesome5;
        
      return (
        <TouchableOpacity
          key={method.id}
          style={[
            styles.paymentMethodCard,
            selectedPaymentMethod === method.id && styles.selectedPaymentMethod
          ]}
          onPress={() => setSelectedPaymentMethod(method.id)}
        >
          <View style={styles.paymentMethodInfo}>
            <IconComponent 
              name={method.icon} 
              size={20} 
              color={selectedPaymentMethod === method.id ? COLORS.primary : COLORS.black} 
            />
            <RegularText 
              style={[
                styles.paymentMethodName,
                selectedPaymentMethod === method.id && { color: COLORS.primary }
              ]}
            >
              {method.name}
            </RegularText>
          </View>
          {selectedPaymentMethod === method.id && (
            <AntDesign name="checkcircle" size={20} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      );
    })}
  </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <MediumText style={styles.sectionTitle}>Order Summary</MediumText>
          {storeGroups.length > 1 && slots ? (
            storeGroups.map((group: StoreCartGroup) => (
              <View key={group.storeId} style={{ marginBottom: 20, borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 12 }}>
                <MediumText style={{ fontSize: 16 }}>{group.storeName}</MediumText>
                <RegularText style={{ color: COLORS.primary, marginBottom: 4 }}>
                  Pickup Time: {slots[group.storeId]?.option === 'immediate' ? 'Immediate' : slots[group.storeId]?.timeSlot}
                </RegularText>
                {group.items.map((item: CartItem) => {
                  console.log('CheckoutScreen - Item image data:', {
                    productId: item.productId,
                    productName: item.product.name,
                    avatar: item.product.avatar,
                    image: item.product.image,
                    imageType: typeof item.product.avatar,
                    imageUrl: item.product.avatar ? getImageUrl(item.product.avatar) : 'No image'
                  });
                  
                  return (
                    <View key={item.productId} style={styles.orderItem}>
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
                        style={styles.orderItemImage}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                      <View style={styles.orderItemInfo}>
                        <RegularText style={styles.orderItemName}>
                          {item.product.name}
                        </RegularText>
                        <RegularText style={styles.orderItemQuantity}>
                          Qty: {item.quantity}
                        </RegularText>
                      </View>
                      <MediumText style={styles.orderItemPrice}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </MediumText>
                    </View>
                  );
                })}
              </View>
            ))
          ) : (
            cartItems.map((item: CartItem) => {
              console.log('CheckoutScreen - Single store item image data:', {
                productId: item.productId,
                productName: item.product.name,
                avatar: item.product.avatar,
                image: item.product.image,
                imageType: typeof item.product.avatar,
                imageUrl: item.product.avatar ? getImageUrl(item.product.avatar) : 'No image'
              });
              
              return (
                <View key={item.productId} style={styles.orderItem}>
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
                    style={styles.orderItemImage}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  <View style={styles.orderItemInfo}>
                    <RegularText style={styles.orderItemName}>
                      {item.product.name}
                    </RegularText>
                    <RegularText style={styles.orderItemStore}>{item.product.storeName}</RegularText>
                    <RegularText style={styles.orderItemQuantity}>
                      Qty: {item.quantity}
                    </RegularText>
                    <RegularText style={{ color: COLORS.primary, marginTop: 2 }}>
                      Pickup Time: {slot}
                    </RegularText>
                  </View>
                  <MediumText style={styles.orderItemPrice}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </MediumText>
                </View>
              );
            })
          )}
        </View>

        {/* Cost Breakdown */}
        <View style={styles.section}>
          <MediumText style={styles.sectionTitle}>Cost Breakdown</MediumText>
          
          <View style={styles.costRow}>
            <RegularText style={styles.costLabel}>Subtotal</RegularText>
            <RegularText style={styles.costValue}>${subtotal.toFixed(2)}</RegularText>
          </View>
          
          <View style={styles.costRow}>
            <RegularText style={styles.costLabel}>Tax</RegularText>
            <RegularText style={styles.costValue}>${tax.toFixed(2)}</RegularText>
          </View>
          
          <View style={styles.costRow}>
            <RegularText style={styles.costLabel}>Pickup Slot</RegularText>
            <RegularText style={styles.costValue}>{slot}</RegularText>
          </View>

          <View style={styles.divider} />
          
          <View style={styles.costRow}>
            <MediumText style={styles.totalLabel}>Total</MediumText>
            <MediumText style={styles.totalValue}>${total.toFixed(2)}</MediumText>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <MediumText style={styles.placeOrderText}>
            Place Order • ${total.toFixed(2)}
          </MediumText>
        </TouchableOpacity>
      </View>

      {/* Order Processing Modal */}
      <OrderProcessingModal
        visible={isProcessing}
        status="processing"
        message="Please wait while we process your order..."
      />

      {/* Confirm Order Modal */}
      <ConfirmOrderModal
        visible={showConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmOrder}
        totalAmount={total}
        itemCount={storeGroups.reduce((total, group) => total + group.items.length, 0)}
        products={storeGroups.flatMap(group => 
          group.items.map(item => ({
            productId: item.productId,
            name: item.product.name,
            avatar: item.product.avatar,
            image: item.product.image,
            price: item.product.price,
            quantity: item.quantity,
          }))
        )}
        pickupSlot={slot}
      />
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
  section: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  editText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 2,
  },
  addressPhone: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 4,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginBottom: 10,
  },
  selectedPaymentMethod: {
    backgroundColor: '#fff3cd',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentMethodName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  orderItemInfo: {
    flex: 1,
  },
  orderItemName: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 4,
    fontWeight: '500',
  },
  orderItemStore: {
    fontSize: 12,
    color: COLORS.grey,
    marginBottom: 2,
  },
  orderItemQuantity: {
    fontSize: 12,
    color: COLORS.grey,
  },
  orderItemPrice: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  costValue: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '500',
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
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  placeOrderButton: {
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
  placeOrderText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CheckoutScreen; 













