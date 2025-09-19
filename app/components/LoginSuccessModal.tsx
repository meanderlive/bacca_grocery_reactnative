import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { MediumText, RegularText } from './MyText';
import { COLORS } from '../styles';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

interface LoginSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const LoginSuccessModal: React.FC<LoginSuccessModalProps> = ({
  visible,
  onClose,
  title = 'Login Successful!',
  message = 'Welcome back to JustSkipLine. You have successfully logged in to your account.',
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/animations/success-animation.json')}
              autoPlay
              loop={false}
              style={styles.animation}
            />
          </View>
          
          <MediumText style={styles.title}>{title}</MediumText>
          <RegularText style={styles.message}>{message}</RegularText>
          
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <RegularText style={styles.buttonText}>Continue Shopping</RegularText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  modalView: {
    width: width * 0.85,
    backgroundColor: 'white',
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
  animationContainer: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '700',
  },
  message: {
    fontSize: 15,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginSuccessModal;
