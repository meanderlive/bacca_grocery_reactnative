import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PrimaryBtn from '../../components/PrimaryBtn';
import { api_deleteAccount } from '../../api/auth';
import { COLORS } from '../../styles';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/feature/auth/authSlice';

// Load icons
Ionicons.loadFont();
MaterialIcons.loadFont();

const DeleteAccountScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: ''
  });
const user = useSelector(authSelector);
const userId = user._id;
  const deleteReasons = [
    'I found a better alternative',
    'I don\'t use this app anymore',
    'I have privacy concerns',
    'I had a bad experience',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
      form: ''
    };
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOpenConfirmation = () => {
    if (!reason) {
      Alert.alert('Feedback Required', 'Please let us know why you\'re leaving to help us improve.');
      return;
    }
    setErrors({ email: '', password: '', form: '' });
    setIsConfirmModalVisible(true);
  };




  console.log(email, password, reason, userId)
  const handleDeleteAccount = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the delete account API
      console.log("userId in delete account screen----->>",userId)
      const response = await api_deleteAccount( userId);
      
      if (response.isSuccess) {
        // Clear any existing user data from storage
        // await AsyncStorage.removeItem('userToken');
        // await AsyncStorage.removeItem('userData');
        
        setIsLoading(false);
        setIsConfirmModalVisible(false);
        setIsSuccessModalVisible(true);
      } else {
        throw new Error(response.message || 'Failed to delete account');
      }
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert(
        'Error', 
        error.message || 'Failed to delete account. Please check your credentials and try again.'
      );
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalVisible(false);
    // Clear form
    setReason('');
    setEmail('');
    setPassword('');
    setErrors({ email: '', password: '', form: '' });
    
    // Navigate to login after a short delay for better UX
    setTimeout(() => {
      // @ts-ignore
      navigation.navigate('Login');
    }, 300);
  };
  
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };
  
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#000' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Delete Account</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={[styles.scrollContainer, { paddingBottom: insets.bottom + 20 }]}>

        <View style={styles.content}>
          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.warningHeader}>
              <MaterialIcons name="warning" size={24} color={COLORS.primary} style={styles.warningIcon} />
              <Text style={[styles.warningText, { color: COLORS.primary }]}>
                Warning: This action cannot be undone
              </Text>
            </View>
            <Text style={[styles.description, { color: colors.text, marginTop: 8 }]}>
              We're sorry to see you go. Your account and all associated data will be permanently deleted.
            </Text>
            
            <View style={[styles.sectionDivider, { backgroundColor: colors.border }]} />
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Help us improve (Optional)
            </Text>
            <Text style={[styles.label, { color: colors.text }]}>
              Why are you deleting your account?
            </Text>
            
            {deleteReasons.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.reasonButton,
                  {
                    borderColor: reason === item ? COLORS.primary : colors.border,
                    backgroundColor: reason === item ? `${COLORS.primary}20` : 'transparent'
                  }
                ]}
                onPress={() => setReason(item)}
                activeOpacity={0.7}
              >
                <Text style={[styles.reasonText, { 
                  color: colors.text,
                  fontWeight: reason === item ? '600' : '400'
                }]}>{item}</Text>
                {reason === item && (
                  <MaterialIcons name="check-circle" size={20} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            ))}

            <Text style={[styles.note, { color: colors.text }]}>
              We appreciate your feedback to help us improve our service.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <PrimaryBtn
              text="Continue to Delete Account"
              onPress={handleOpenConfirmation}
              containerStyle={[styles.deleteButton, { 
                backgroundColor: COLORS.primary,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }]}
              textStyle={[styles.deleteButtonText, { color: COLORS.black }]}
            />
          </View>
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={isConfirmModalVisible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => !isLoading && setIsConfirmModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text, fontSize: 20, fontWeight: '700' }]}>
                Confirm Account Deletion
              </Text>
              <TouchableOpacity 
                onPress={() => !isLoading && setIsConfirmModalVisible(false)}
                style={styles.closeButton}
                disabled={isLoading}
              >
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <View style={[
              styles.inputContainer,
              {
                borderColor: errors.email ? 'red' : colors.border,
                backgroundColor: errors.email ? `${colors.notification}15` : colors.card
              }
            ]}>
              <MaterialIcons 
                name="email" 
                size={20} 
                color={colors.text + '80'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[
                  styles.input, 
                  { color: colors.text }
                ]}
                placeholder="Email"
                placeholderTextColor={colors.text + '80'}
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>
            {errors.email ? (
              <Text style={[styles.errorText, { color: 'red' }]}>{errors.email}</Text>
            ) : null}
            
            <View style={[
              styles.inputContainer, 
              { 
                borderColor: errors.password ? 'red' : colors.border,
                backgroundColor: errors.password ? `${colors.notification}15` : colors.card,
                marginTop: 16
              }
            ]}>
              <MaterialIcons 
                name="lock" 
                size={20} 
                color={colors.text + '80'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[
                  styles.input, 
                  { color: colors.text }
                ]}
                placeholder="Password"
                placeholderTextColor={colors.text + '80'}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
                onSubmitEditing={handleDeleteAccount}
              />
            </View>
            {errors.password ? (
              <Text style={[styles.errorText, { color: 'red' }]}>{errors.password}</Text>
            ) : null}
            
            <View style={[styles.modalButtons, { marginTop: 8 }]}>
              <PrimaryBtn
                text="Cancel"
                onPress={() => !isLoading && setIsConfirmModalVisible(false)}
                disabled={isLoading}
                containerStyle={[
                  styles.modalButton, 
                  { 
                    flex: 1,
                    marginRight: 12,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: colors.border
                  }
                ]}
                textStyle={{ color: colors.text }}
              />
              <PrimaryBtn
                text={isLoading ? 'Deleting...' : 'Delete Account'}
                onPress={handleDeleteAccount}
                disabled={isLoading}
                containerStyle={[
                  styles.modalButton, 
                  { 
                    flex: 1,
                    backgroundColor: isLoading ? `${COLORS.primary}80` : COLORS.primary,
                    opacity: isLoading ? 0.8 : 1,
                  }
                ]}
                textStyle={{ 
                  color: COLORS.black,
                  fontWeight: '600'
                }}
                loading={isLoading}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={isSuccessModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={handleSuccessModalClose}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.successModalContent, { backgroundColor: colors.card }]}>
            <View style={styles.successIcon}>
              <MaterialIcons name="check-circle" size={64} color="#4CAF50" />
            </View>
            <Text style={[styles.successTitle, { color: colors.text }]}>
              Account Deleted Successfully
            </Text>
            <Text style={[styles.successText, { color: colors.text }]}>
              Your account and all associated data have been permanently deleted. We're sorry to see you go!
            </Text>
            <PrimaryBtn
              text="Return to Login"
              onPress={handleSuccessModalClose}
              containerStyle={[styles.successButton, { backgroundColor: '#4CAF50' }]}
              textStyle={styles.successButtonText}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warningIcon: {
    marginRight: 8,
  },
  sectionDivider: {
    height: 1,
    marginVertical: 20,
    opacity: 0.2,
  },
  warningText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: COLORS.primary,
  },
  label: {
    fontSize: 14,
    marginBottom: 12,
    fontWeight: '500',
  },
  reasonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    paddingVertical: 14,
  },
  reasonText: {
    fontSize: 14,
    flex: 1,
  },
  note: {
    fontSize: 13,
    marginTop: 12,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  deleteButton: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 400,
    alignSelf: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  modalText: {
    fontSize: 15,
    color: COLORS.black,
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 15,
    paddingVertical: 0,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 12,
    marginTop: -4,
    marginLeft: 4,
  },
  passwordContainer: {
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  modalButton: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  successModalContent: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: COLORS.black,
  },
  successText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  successButton: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    marginTop: 20,
    backgroundColor: COLORS.primary,
  },
  successButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});