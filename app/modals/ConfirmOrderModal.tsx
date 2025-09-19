import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ScrollView as RNScrollView,
} from 'react-native';
import { COLORS } from '../styles';
import { MediumText, RegularText, SmallText } from '../components/MyText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { getImageUrl } from '../api';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

interface ProductSummary {
  productId: string;
  name: string;
  avatar?: string;
  image?: any;
  price: number;
  quantity: number;
}
interface ConfirmOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalAmount: number;
  itemCount: number;
  products: ProductSummary[];
  pickupSlot: string;
}

const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({
  visible,
  onClose,
  onConfirm,
  totalAmount,
  itemCount,
  products = [],
  pickupSlot = '',
}) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, scaleValue, opacityValue]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: opacityValue,
            },
          ]}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: scaleValue }],
                maxHeight: height * 0.8,
              },
            ]}
          >
            <ScrollView
              style={{ flexGrow: 0 }}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <Feather name="shopping-bag" size={32} color={COLORS.primary} />
                </View>
                <MediumText style={styles.title}>Confirm Your Order</MediumText>
                <RegularText style={styles.subtitle}>
                  Please review your order details before placing it
                </RegularText>
              </View>

              {/* Centered Item Count */}
              <View style={styles.topSummaryRow}>
                <View style={styles.topSummaryItemLeft}>
                  <Feather name="package" size={18} color={COLORS.primary} style={{ marginRight: 6 }} />
                  <MediumText style={styles.itemCountLeftText}>{itemCount} Items</MediumText>
                </View>
                <View style={styles.topSummaryItemRight}>
                  <Feather name="clock" size={16} color={COLORS.primary} style={{ marginRight: 4 }} />
                  <RNScrollView style={styles.pickupTimingRightScroll} showsVerticalScrollIndicator={false}>
                    <SmallText style={styles.pickupTimingRightText}>{pickupSlot || '-'}</SmallText>
                  </RNScrollView>
                </View>
              </View>
            

              {/* Vertically scrollable product list with pickup timing and quantity */}
              <View style={styles.productListVerticalContainer}>
                <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={true}>
                  {products.map((item) => (
                    <View key={item.productId} style={styles.productListItemCard}>
                      <View style={styles.productListItemLeft}>
                        <FastImage
                          source={item.avatar ? { uri: getImageUrl(item.avatar) } : item.image ? (typeof item.image === 'string' ? { uri: item.image } : item.image) : require('../../assets/images/FoodItems/img1.png')}
                          style={styles.productListImage}
                        />
                        <SmallText style={styles.productListName}>
                          <Text numberOfLines={2} ellipsizeMode="tail">{item.name}</Text>
                        </SmallText>
                      </View>
                      <View style={styles.productListItemRight}>
                        <View style={styles.productListPickupQtyRow}>
                          <SmallText style={styles.productListQty}>x{item.quantity}</SmallText>
                        </View>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>

              
              {/* Total Amount */}
              <View style={styles.totalSection}>
                <View style={styles.totalRow}>
                  <RegularText style={styles.totalLabel}>Total Amount</RegularText>
                  <MediumText style={styles.totalAmount}>
                    ${totalAmount.toFixed(2)}
                  </MediumText>
                </View>
                <SmallText style={styles.totalNote}>
                  Includes taxes
                </SmallText>
              </View>

              {/* Order Details */}
              <View style={styles.detailsSection}>
                <MediumText style={styles.detailsTitle}>What happens next?</MediumText>
                
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <RegularText style={styles.stepTitle}>Order Processing</RegularText>
                    <SmallText style={styles.stepDescription}>
                      We'll start preparing your order immediately
                    </SmallText>
                  </View>
                </View>
                
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <RegularText style={styles.stepTitle}>Ready for Pickup</RegularText>
                    <SmallText style={styles.stepDescription}>
                      You'll get a notification when it's ready
                    </SmallText>
                  </View>
                </View>
                
                <View style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <RegularText style={styles.stepTitle}>Collect & Enjoy</RegularText>
                    <SmallText style={styles.stepDescription}>
                      Show your order ID at the store to collect
                    </SmallText>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                  activeOpacity={0.8}
                >
                  <RegularText style={styles.cancelButtonText}>Review Order</RegularText>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={onConfirm}
                  activeOpacity={0.8}
                >
                  <Feather name="check" size={20} color={COLORS.black} />
                  <MediumText style={styles.confirmButtonText}>
                    Place Order
                  </MediumText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    // Remove static height, use maxHeight dynamically in component
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff3cd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 24,
    color: COLORS.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    lineHeight: 22,
  },
  summarySection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginBottom: 8,
    gap: 12,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryText: {
    alignItems: 'center',
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.grey,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  totalSection: {
    backgroundColor: '#fff3cd',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  totalLabel: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 24,
    color: COLORS.black,
    fontWeight: '700',
  },
  totalNote: {
    fontSize: 12,
    color: COLORS.grey,
    textAlign: 'center',
  },
  detailsSection: {
    marginBottom: 24,
  },
  detailsTitle: {
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 16,
    fontWeight: '600',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 4,
    fontWeight: '500',
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  confirmButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
  },
  summaryItemEnhanced: {
    flex: 1,
    minWidth: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
  },
  summaryIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff3cd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    flexShrink: 0,
  },
  summaryTextEnhanced: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  summaryLabelEnhanced: {
    fontSize: 15,
    color: COLORS.grey,
    marginBottom: 2,
    fontWeight: '500',
    flexShrink: 0,
  },
  summaryValueEnhanced: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: '700',
    flexShrink: 1,
    flexWrap: 'wrap',
    minWidth: 30,
    maxWidth: 120,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  productCard: {
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    width: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  productImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginBottom: 4,
  },
  productName: {
    maxWidth: 60,
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.black,
  },
  productQty: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  productListScroll: {
    maxHeight: 120,
  },
  pickupTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    minWidth: 80,
    maxWidth: 180,
    flexShrink: 1,
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  pickupTimeText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '700',
    flexShrink: 1,
    flexWrap: 'wrap',
    textAlign: 'left',
    maxWidth: 130,
  },
  pickupTimeValue: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
    paddingLeft: 2,
    paddingRight: 2,
  },
  pickupTimeScroll: {
    maxHeight: 36,
    minHeight: 18,
  },
  itemCountCenterContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  itemCountCenterText: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: '700',
    textAlign: 'center',
  },
  productListVerticalContainer: {
    marginBottom: 18,
    marginTop: 2,
  },
  productListItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1,
  },
  productListItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  productListImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 6,
  },
  productListName: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
    flex: 1,
    flexWrap: 'wrap',
  },
  productListItemRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minWidth: 70,
  },
  productListPickupQtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productListPickupTime: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '700',
    maxWidth: 60,
  },
  productListQty: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '700',
  },
  pickupTimingTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  pickupTimingTopText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 120,
  },
  topSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 2,
    paddingHorizontal: 4,
  },
  topSummaryItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemCountLeftText: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '700',
  },
  topSummaryItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  pickupTimingRightText: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '500',
    textAlign: 'right',
    maxWidth: 120,
  },
  pickupTimingRightScroll: {
    maxHeight: 32,
    minHeight: 16,
  },
});

export default ConfirmOrderModal; 