import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MediumText, RegularText, SmallText } from '../../components/MyText';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation/types';
import PrimaryBtn from '../../components/PrimaryBtn';
import { COLORS } from '../../styles';
 //@ts-ignore
import { OrderDetails } from '../../types';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getImageUrl } from '../../api';

const OrderConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // Access order details directly from route.params since they are spread in navigation
  const orderDetails = route.params as OrderDetails;
console.log(JSON.stringify(orderDetails))
  if (!orderDetails) {
    return (
      <View style={styles.errorContainer}>
        <MediumText style={styles.errorText}>Order details not found</MediumText>
      </View>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleProceedToPayment = () => {
     //@ts-ignore
    navigation.navigate('Payment', { orderDetails });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        {/* Success Icon */}
        <View style={styles.successIconContainer}>
          <AntDesign name="checkcircle" size={60} color={COLORS.primary} />
        </View>

        <MediumText style={styles.title}>Order Confirmed!</MediumText>
        <SmallText style={styles.subtitle}>Your order has been successfully placed</SmallText>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <MediumText style={styles.summaryTitle}>Order Summary</MediumText>

          <View style={styles.orderInfoRow}>
            <Feather name="hash" size={16} color={COLORS.grey} />
            <RegularText style={styles.orderInfoText}>Order #{orderDetails.orderNumber}</RegularText>
          </View>

          <View style={styles.orderInfoRow}>
            <Feather name="calendar" size={16} color={COLORS.grey} />
            <RegularText style={styles.orderInfoText}>
              Order Date: {formatDate(orderDetails.orderDate)}
            </RegularText>
          </View>

          <View style={styles.orderInfoRow}>
            <FontAwesome5 name="store" size={14} color={COLORS.grey} />
            <RegularText style={styles.orderInfoText}>{orderDetails.storeName}</RegularText>
          </View>

          <View style={styles.orderInfoRow}>
            <Feather name="clock" size={16} color={COLORS.grey} />
            <RegularText style={styles.orderInfoText}>Pickup: {orderDetails.pickupTime}</RegularText>
          </View>

          <View style={styles.orderInfoRow}>
            <Feather name="credit-card" size={16} color={COLORS.grey} />
            <RegularText style={styles.orderInfoText}>
              Payment: {orderDetails.paymentMethod === 'card' ? 'Credit/Debit Card' : orderDetails.paymentMethod}
            </RegularText>
          </View>

          {orderDetails.paymentIntentId && (
            <View style={styles.orderInfoRow}>
              <Feather name="credit-card" size={16} color={COLORS.grey} />
              <RegularText style={styles.orderInfoText}>
                Payment ID: {orderDetails.paymentIntentId.slice(-8)}
              </RegularText>
            </View>
          )}
        </View>

        {/* Order Items */}
        <View style={styles.itemsSection}>
          <MediumText style={styles.sectionTitle}>Order Items</MediumText>
          {orderDetails.items && orderDetails.items.length > 0 ? (
             //@ts-ignore
            orderDetails.items.map((item) => (
              <View key={item.productId} style={styles.orderItem}>
                      <FastImage
                        source={
                          item.imageUrl
                            ? { uri: item.imageUrl }
                            : require('../../../assets/images/FoodItems/img1.png')
                        }
                        style={styles.itemImage}
                        resizeMode="cover"
                      />
                <View style={styles.itemInfo}>
                  <RegularText style={styles.itemName}>{item.productName}</RegularText>
                  <SmallText style={styles.itemQuantity}>Qty: {item.quantity}</SmallText>
                </View>
                <MediumText style={styles.itemPrice}>{formatCurrency(item.totalPrice)}</MediumText>
              </View>
            ))
          ) : (
            <View style={styles.noItemsContainer}>
              <RegularText style={styles.noItemsText}>No items found in order</RegularText>
            </View>
          )}
        </View>

        {/* Cost Breakdown */}
        <View style={styles.costSection}>
          <MediumText style={styles.sectionTitle}>Cost Breakdown</MediumText>

          <View style={styles.costRow}>
            <RegularText style={styles.costLabel}>Subtotal</RegularText>
            <RegularText style={styles.costValue}>{formatCurrency(orderDetails.subtotal)}</RegularText>
          </View>

          <View style={styles.costRow}>
            <RegularText style={styles.costLabel}>Tax</RegularText>
            <RegularText style={styles.costValue}>{formatCurrency(orderDetails.tax)}</RegularText>
          </View>

          <View style={styles.divider} />

          <View style={styles.costRow}>
            <MediumText style={styles.totalLabel}>Total</MediumText>
            <MediumText style={styles.totalValue}>{formatCurrency(orderDetails.totalAmount)}</MediumText>
          </View>
        </View>

        {/* Notes */}
        {/* {orderDetails.note && (
          <View style={styles.notesSection}>
            <MediumText style={styles.sectionTitle}>Order Notes</MediumText>
            <View style={styles.noteBox}>
              <Feather name="info" size={16} color={COLORS.primary} />
              <SmallText style={styles.noteText}>{orderDetails.note}</SmallText>
            </View>
          </View>
        )} */}

        {/* Payment Button */}
        <PrimaryBtn
          text={`Proceed to Payment • ${formatCurrency(orderDetails.totalAmount)}`}
          onPress={handleProceedToPayment}
          containerStyle={[styles.button, { alignSelf: 'center' }]}
        />
      </View>
    </ScrollView>
  );
};

// Styles (same as your first screen)
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    color: COLORS.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 24,
  },
  summarySection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 12,
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
  itemsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 12,
    color: COLORS.grey,
  },
  itemPrice: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  costSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  },
  costValue: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
  noItemsContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noItemsText: {
    color: COLORS.grey,
    fontSize: 14,
  },
  notesSection: {
    marginBottom: 16,
  },
  noteBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f7ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  noteText: {
    flex: 1,
    marginLeft: 8,
    color: '#0066cc',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default OrderConfirmationScreen;
