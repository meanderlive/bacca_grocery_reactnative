import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../styles';

interface ProfileUpdateSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const ProfileUpdateSuccessModal: React.FC<ProfileUpdateSuccessModalProps> = ({ visible, onClose }) => {
  const AntDesignIcon = AntDesign as unknown as React.ComponentType<any>;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <AntDesignIcon name="checkcircle" size={70} color={COLORS.primary} style={{ backgroundColor: COLORS.black, borderRadius: 30, padding: 8 }} />
          </View>
          <Text style={styles.title}>Profile Updated!</Text>
          <Text style={styles.message}>Your profile has been updated successfully.</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.black,
    borderRadius: 20,
    padding: 42,
    alignItems: 'center',
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfileUpdateSuccessModal; 