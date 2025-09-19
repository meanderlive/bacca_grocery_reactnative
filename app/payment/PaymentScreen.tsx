import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Alert, 
  ActivityIndicator, 
  ImageBackground, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  TextInput, 
  Keyboard,
  Dimensions
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { CardField, CardFieldInput, useStripe } from '@stripe/stripe-react-native';
import { useStripePayment } from './useStripePayment';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { getImageUrl } from '../api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/types';
import { COLORS } from '../styles';
import PrimaryBtn from '../components/PrimaryBtn';
import { MediumText, RegularText, SmallText } from '../components/MyText';
import * as Animatable from 'react-native-animatable';
// Define OrderDetails interface if not already defined
interface OrderDetails {
  orderId: string;
  orderNumber: string;
  storeName: string;
  pickupTime: string;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    totalPrice: number;
    imageUrl?: string;
  }>;
  subtotal: number;
  tax: number;
  totalAmount: number;
  paymentIntentId?: string;
}
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VisaCard from '../../assets/images/PaymentSvg/VisaCard.svg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const PaymentScreen = () => {
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('visa');
  const scrollViewRef = useRef<ScrollView>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);
  const { confirmPayment } = useStripe();
  const stripePayment = useStripePayment();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute();
  
  // Get order details from navigation params
  const params = route.params as { orderDetails: OrderDetails } | undefined;
  const orderDetails = params?.orderDetails;

  if (!orderDetails) {
    return (
      <View style={styles.errorContainer}>
        <MediumText style={styles.errorText}>Order details not found</MediumText>
      </View>
    );
  }


  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      Alert.alert(
        'Error', 
        'Please enter complete card details',
        [
          { text: 'OK', style: 'default' },
          { 
            text: 'Go to Home', 
            onPress: () => navigation.navigate('MainTab')
          }
        ]
      );
      return;
    }
    setLoading(true);
    try {
      // Use paymentIntentId from order details - this should be the dynamic ID from API
      const paymentIntentId = orderDetails.paymentIntentId;
      
      console.log('PaymentScreen - Order Details received:', orderDetails);
      console.log('PaymentScreen - Payment Intent ID from order details:', paymentIntentId);
      console.log('PaymentScreen - Payment Intent ID type:', typeof paymentIntentId);
      console.log('PaymentScreen - Payment Intent ID length:', paymentIntentId?.length);
      
      if (!paymentIntentId) {
        console.log('PaymentScreen - ERROR: Payment Intent ID is undefined');
        console.log('PaymentScreen - Available fields in orderDetails:', Object.keys(orderDetails));
        Alert.alert(
          'Payment Error', 
          'Payment Intent ID is missing. Please try creating the order again.',
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Go to Home', 
              onPress: () => navigation.navigate('MainTab')
            }
          ]
        );
        return;
      }
      
      console.log('PaymentScreen - Using paymentIntentId:', paymentIntentId);
      console.log('PaymentScreen - Order Details:', orderDetails);
      console.log('PaymentScreen - Order ID:', orderDetails.orderId);
      
      const clientSecret = await stripePayment.fetchClientSecret(paymentIntentId);
      if (!clientSecret) {
        console.log('PaymentScreen - Failed to get client secret');
        console.log('PaymentScreen - Stripe payment error:', stripePayment.error);
        Alert.alert(
          'Payment Error', 
          stripePayment.error || 'Could not get client secret. Please try again.',
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Go to Home', 
              onPress: () => navigation.navigate('MainTab')
            }
          ]
        );
        return;
      }
      
      console.log('PaymentScreen - Got client secret, proceeding with payment');
      
      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {},
      });
      
      if (error) {
        console.log('PaymentScreen - Payment failed:', error.message);
        Alert.alert(
          'Payment failed', 
          error.message,
          [
            { text: 'OK', style: 'default' },
            { 
              text: 'Go to Home', 
              onPress: () => navigation.navigate('MainTab')
            }
          ]
        );
      } else if (paymentIntent) {
        console.log('PaymentScreen - Payment successful:', paymentIntent.status);
        console.log('PaymentScreen - Payment Intent ID:', paymentIntent.id);
        console.log('PaymentScreen - Order ID:', orderDetails.orderId);
        
        // Here you could call an API to update the payment status
        
        // Alert.alert('Success', `Payment successful! Status: ${paymentIntent.status}`);
        navigation.replace('ThankYou');
      }
    } catch (err) {
      console.log('PaymentScreen - Payment error:', err);
      Alert.alert(
        'Error', 
        'Payment failed.',
        [
          { text: 'OK', style: 'default' },
          { 
            text: 'Go to Home', 
            onPress: () => navigation.navigate('MainTab')
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle keyboard behavior
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // This will be handled automatically by the system
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        enabled
      >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <MediumText style={styles.headerTitle}>Payment</MediumText>
        <TouchableOpacity style={styles.addButton}>
          <AntDesign name="plus" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Order Summary Section */}
        <View style={styles.section}>
          <MediumText style={styles.sectionTitle}>Order Summary</MediumText>
          
          <View style={styles.orderSummaryCard}>
            <View style={styles.orderInfoRow}>
              <Feather name="hash" size={16} color={COLORS.grey} />
              <RegularText style={styles.orderInfoText}>
                Order #{orderDetails.orderNumber}
              </RegularText>
            </View>
            
            <View style={styles.orderInfoRow}>
               <FontAwesome5 name="store" size={14} color={COLORS.grey} />
              <RegularText style={styles.orderInfoText}>
                {orderDetails.storeName}
              </RegularText>
            </View>
            
            <View style={styles.orderInfoRow}>
              <Feather name="clock" size={16} color={COLORS.grey} />
              <RegularText style={styles.orderInfoText}>
                Pickup: {orderDetails.pickupTime}
              </RegularText>
            </View>
          </View>
        </View>

        {/* Order Items Preview */}
        <View style={styles.section}>
          <MediumText style={styles.sectionTitle}>Order Items ({orderDetails.items.length})</MediumText>
          
          <View style={styles.itemsPreviewCard}>
            
            {orderDetails.items.slice(0, 3).map((item: { productId: string; productName: string; quantity: number; totalPrice: number; imageUrl?: string }, index: number) => (
             
            
             <View key={item.productId} style={styles.previewItem}>
                <FastImage
                  source={
                    item.imageUrl
                      ? { uri: item.imageUrl }
                      : require('../../assets/images/FoodItems/img1.png')
                  }
                  style={styles.previewImage}
                  resizeMode="cover"
                />
                <View style={styles.previewItemInfo}>
                  <RegularText style={styles.previewItemName}>{item.productName}</RegularText>
                  <SmallText style={styles.previewItemQty}>Qty: {item.quantity}</SmallText>
                </View>
                <MediumText style={styles.previewItemPrice}>
                  ${item.totalPrice.toFixed(2)}
                </MediumText>
              </View>
            ))}
            {orderDetails.items.length > 3 && (
              <View style={styles.moreItems}>
                <SmallText style={styles.moreItemsText}>
                  +{orderDetails.items.length - 3} more items
                </SmallText>
              </View>
            )}
          </View>
        </View>

        {/* Cost Breakdown */}
        <View style={styles.section}>
          <MediumText style={styles.sectionTitle}>Cost Breakdown</MediumText>
          
          <View style={styles.costBreakdownCard}>
            <View style={styles.costRow}>
              <RegularText style={styles.costLabel}>Subtotal</RegularText>
              <RegularText style={styles.costValue}>${orderDetails.subtotal.toFixed(2)}</RegularText>
            </View>
            <View style={styles.costRow}>
              <RegularText style={styles.costLabel}>Tax</RegularText>
              <RegularText style={styles.costValue}>${orderDetails.tax.toFixed(2)}</RegularText>
            </View>
            <View style={styles.divider} />
            <View style={styles.costRow}>
              <MediumText style={styles.totalLabel}>Total</MediumText>
              <MediumText style={styles.totalValue}>${orderDetails.totalAmount.toFixed(2)}</MediumText>
            </View>
          </View>
        </View>

        {/* Payment Details Section */}
        <View style={styles.paymentSection}>
          <MediumText style={styles.sectionTitle}>Payment Details</MediumText>
          
          <View style={styles.paymentCard}>
            <View style={styles.paymentHeader}>
                             <VisaCard width={260} height={200} />
              <MediumText style={styles.paymentTitle}>Enter Card Information</MediumText>
              <RegularText style={styles.paymentLabel}>
                Securely enter your card details below
              </RegularText>
            </View>

            <Animatable.View
              animation="fadeIn"
              delay={300}
              style={styles.cardInputContainer}
            >
              <CardField
                postalCodeEnabled={true}
                placeholders={{
                  number: '4242 4242 4242 4242',
                  expiration: 'MM/YY',
                  cvc: 'CVC',
                  postalCode: 'ZIP'
                }}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',
                  borderRadius: 16,
                  fontSize: 16,
                  placeholderColor: '#CCCCCC'
                }}
                style={styles.cardField}
                onCardChange={(details) => setCardDetails(details)}
              />
            </Animatable.View>

            {loading || stripePayment.loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <RegularText style={styles.loadingText}>Processing Payment...</RegularText>
              </View>
            ) : (
              <Animatable.View
                animation="fadeInUp"
                delay={800}
                style={styles.buttonContainer}
              >
                <PrimaryBtn
                  text={`Pay $${orderDetails.totalAmount.toFixed(2)}`}
                  onPress={handlePayPress}
                  containerStyle={styles.payBtn}
                  textStyle={styles.payBtnText}
                  disabled={loading || stripePayment.loading || !cardDetails?.complete}
                />
                <View style={styles.securityInfo}>
                  <AntDesign name="Safety" size={16} color={COLORS.grey} />
                  <RegularText style={styles.securityText}>
                    Your payment is securely processed by Stripe
                  </RegularText>
                </View>
              </Animatable.View>
            )}
          </View>
        </View>


      </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.grey,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 15,
  },
  contentContainer: {
    paddingBottom: 20,
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
  addButton: {
    padding: 5,
  },
  
  // Sections
  section: {
    marginTop: 20,
  },
  // Payment section with subtle background
  paymentSection: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: -16,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 16,
  },
  
  // Payment Card
  paymentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  paymentHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  paymentTitle: {
    fontSize: 24,
    color: COLORS.primary,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  paymentLabel: {
    color: COLORS.grey,
    marginBottom: 18,
    textAlign: 'center',
    fontSize: 14,
  },
  cardInputContainer: {
    width: '100%',
    marginVertical: 15,
  },
  cardField: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#e1e5eb',
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  loaderContainer: {
    marginVertical: 25,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.grey,
    fontSize: 14,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  payBtn: {
    width: '100%',
    height: 56,
    alignSelf: 'center',
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  payBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  
  // Order Summary
  orderSummaryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  orderInfoText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  
  // Items Preview
  itemsPreviewCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  previewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  previewImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  previewItemInfo: {
    flex: 1,
  },
  previewItemName: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
    marginBottom: 2,
  },
  previewItemQty: {
    fontSize: 12,
    color: COLORS.grey,
  },
  previewItemPrice: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '600',
  },
  moreItems: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  moreItemsText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  
  // Cost Breakdown
  costBreakdownCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  costValue: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '700',
  },
  
  // Security Info
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  securityText: {
    fontSize: 12,
    color: COLORS.grey,
  },
  
  // Payment Button
  paymentButtonContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  paymentButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});