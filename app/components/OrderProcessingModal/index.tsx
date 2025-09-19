import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Modal, ActivityIndicator, Platform, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { COLORS } from '../../styles';
import { MediumText } from '../MyText';

const { width, height } = Dimensions.get('window');

interface OrderProcessingModalProps {
  visible: boolean;
  status: 'processing' | 'success' | 'error';
  message?: string;
}

const OrderProcessingModal: React.FC<OrderProcessingModalProps> = ({
  visible,
  status,
  message = 'Please wait while we process your order...',
}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, [status]);

  const renderAnimation = (source: any) => (
    <LottieView
      ref={animationRef}
      source={source}
      autoPlay
      loop={status === 'processing'}
      style={styles.animation}
      resizeMode='contain'
    />
  );

  const getStatusContent = () => {
    switch (status) {
      case 'processing':
        return (
          <View style={styles.content}>
            {renderAnimation(require('../../../assets/animations/processing-order.json'))}
            <MediumText style={styles.message}>{message}</MediumText>
            <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
          </View>
        );
      case 'success':
        return (
          <View style={styles.content}>
            {renderAnimation(require('../../../assets/animations/order-success.json'))}
            <MediumText style={[styles.message, styles.successText]}>
              Order Placed Successfully!
            </MediumText>
          </View>
        );
      case 'error':
        return (
          <View style={styles.content}>
            {renderAnimation(require('../../../assets/animations/order-error.json'))}
            <MediumText style={[styles.message, styles.errorText]}>
              {message || 'Failed to place order. Please try again.'}
            </MediumText>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          {getStatusContent()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  modalContainer: {
    width: width * 0.9,
    maxWidth: 350,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    elevation: 5,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  animation: {
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    color: COLORS.black,
  },
  successText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.red,
  },
  loader: {
    marginTop: 20,
  },
});

export default OrderProcessingModal;

