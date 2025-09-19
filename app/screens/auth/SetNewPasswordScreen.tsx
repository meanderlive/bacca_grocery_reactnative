import { View, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert, Platform, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/types';
import { BigText, RegularText, SmallText } from '../../components/MyText';
import { COLORS } from '../../styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Feather from 'react-native-vector-icons/Feather';
import { api_changePassword } from '../../api/auth';
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer';

const SetNewPasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = navigation.getState().routes[navigation.getState().index];
  const routeParams = route.params as { email?: string; token?: string; otp?: string; fromScreen?: string } | undefined;
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email address'),
    newPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSetPassword = async (values: { email: string; newPassword: string; confirmPassword: string }) => {
    try {
      setLoading(true);
      const response = await api_changePassword(values.email, values.newPassword);
      
      if (response?.isSuccess) {
        console.log("response--------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",response)
        setShowSuccessModal(true);
      } else {
        Alert.alert('Error', response?.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Update password error:', error);
      Alert.alert('Error', 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessContinue = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  return (
    <MainLayout onBack={navigation.goBack}>
      <KeyboardAvoidingContainer 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <FastImage 
              style={styles.logo} 
              source={require('../../../assets/images/Logo.jpg')} 
              resizeMode="contain"
            />
          </View>
          
          <BigText style={styles.title}>Set New Password</BigText>

        <Formik
          initialValues={{ email: routeParams?.email || '', newPassword: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSetPassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={[
                styles.inputContainer,
                touched.email && errors.email ? styles.inputError : {},
              ]}>
                <Feather 
                  name="mail" 
                  size={20} 
                  color="#666" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.black}
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!routeParams?.email}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={[styles.errorText, styles.errorContainer]}>{errors.email}</Text>
              )}

              {/* New Password Input */}
              <View style={[
                styles.inputContainer,
                touched.newPassword && errors.newPassword ? styles.inputError : {},
              ]}>
                <Feather 
                  name="lock" 
                  size={20} 
                  color="#666" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  placeholder="Enter New Password"
                  placeholderTextColor={COLORS.black}
                  style={styles.input}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Feather 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>
              {touched.newPassword && errors.newPassword && (
                <Text style={[styles.errorText, styles.errorContainer]}>{errors.newPassword}</Text>
              )}

              {/* Confirm Password Input */}
              <View style={[
                styles.inputContainer,
                touched.confirmPassword && errors.confirmPassword ? styles.inputError : {},
              ]}>
                <Feather 
                  name="lock" 
                  size={20} 
                  color="#666" 
                  style={styles.inputIcon} 
                />
                <TextInput
                  placeholder="Confirm New Password"
                  placeholderTextColor={COLORS.black}
                  style={styles.input}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity 
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Feather 
                    name={showConfirmPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={[styles.errorText, styles.errorContainer]}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <RegularText style={styles.buttonText}>
                  {loading ? 'Updating...' : 'Update Password'}
                </RegularText>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <Modal
          visible={showSuccessModal}
          transparent={true}
          animationType="slide"
          onRequestClose={handleSuccessContinue}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Feather name="check-circle" size={60} color="green" style={styles.successIcon} />
              <BigText style={styles.modalTitle}>Success!</BigText>
              <RegularText style={styles.modalText}>
                Your password has been updated successfully.
              </RegularText>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={handleSuccessContinue}
              >
                <RegularText style={styles.modalButtonText}>Continue to Login</RegularText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingContainer>
  </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 200,
    width: 200,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    paddingLeft: 15,
    marginVertical: 15,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: 'red',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'black',
    paddingRight: 15,
  },
  eyeIcon: {
    padding: 10,
    marginRight: 5,
  },
  errorContainer: {
    marginLeft: 30,
    marginTop: -10,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
  },
  button: {
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginTop: 25,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '80%',
  },
  successIcon: {
    marginBottom: 20,
    color: COLORS.primary,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: COLORS.black,
  },
  modalText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButton: {
    width: '100%',
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  }
});

export default SetNewPasswordScreen;