import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Easing, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../styles';

const { width } = Dimensions.get('window');

interface CartConfirmationModalProps {
  visible: boolean;
  onContinueShopping: () => void;
  onViewCart: () => void;
  itemCount: number;
  itemName: string;
  itemImage?: string;
}

const CartConfirmationModal: React.FC<CartConfirmationModalProps> = ({
  visible,
  onContinueShopping,
  onViewCart,
  itemCount,
  itemName,
  itemImage,
}) => {
  const { colors } = useTheme();
  const scaleValue = useRef(new Animated.Value(0.8)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
          tension: 30,
          friction: 7,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
      scaleValue.setValue(0.8);
    }
  }, [visible, scaleValue, opacityValue]);

  if (!visible) return null;

  return (
    <View style={[StyleSheet.absoluteFill, styles.centeredView]} pointerEvents="box-none">
      <Animated.View 
        style={[
          StyleSheet.absoluteFill,
          { 
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: opacityValue,
          }
        ]}
        pointerEvents="auto"
      >
        <TouchableOpacity 
          style={StyleSheet.absoluteFill} 
          activeOpacity={1} 
          onPress={onContinueShopping}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.modalView,
          {
            backgroundColor: colors.card,
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
        pointerEvents="auto"
      >
        <View style={[styles.iconContainer, { backgroundColor: COLORS.primary + '20' }]}>
          <Ionicons name="checkmark-done-circle" size={50} color={COLORS.primary} />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>{itemName}</Text>
        <Text style={[styles.message, { color: colors.text }]}>
          {itemCount} {itemCount > 1 ? 'items' : 'item'} added to your cart
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.continueButton, { borderColor: COLORS.primary }]}
            onPress={onContinueShopping}
          >
            <Text style={[styles.buttonText, { color: COLORS.primary }]}>
              Continue Shopping
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.viewCartButton, { backgroundColor: COLORS.primary }]}
            onPress={onViewCart}
          >
            <Text style={[styles.buttonText, { color: '#000' }]}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalView: {
    width: width * 0.85,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    borderRadius: 25,
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    borderWidth: 1,
    marginBottom: 10,
  },
  viewCartButton: {
    // Background color will be set in the style prop
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartConfirmationModal;
