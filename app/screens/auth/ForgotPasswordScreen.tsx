import { View, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Modal, KeyboardAvoidingView, Platform } from 'react-native';
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
import { api_forgotpassword } from '../../api/auth';
import Feather from 'react-native-vector-icons/Feather';
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email address'),
  });

  const handleGetOtp = async (values: { email: string }) => {
    setLoading(true);
    const payload = {
      email: values.email,
    };

    try {
      const response = await api_forgotpassword(payload);
      if (response?.otp && response?.token) {
        setEmail(values.email);
        setOtp(response.otp);
        setToken(response.token);
        setShowSuccessModal(true);
      } else {
        Alert.alert('Error', 'OTP or token missing from the response.');
      }
    } catch (error: any) {
      console.error(error, "Error in forgot password API");
      const errorMessage = error?.response?.data?.message || error?.message || 'An error occurred';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToOTP = () => {
    setShowSuccessModal(false);
    navigation.navigate('VerifyOtp', {
      email: email,
      otp: otp,
      token: token,
      fromScreen: 'forgotPassword'
    });
  };

  return (
    <MainLayout>
      <KeyboardAvoidingContainer 
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <FastImage 
              style={styles.logo} 
              source={require('../../../assets/images/Logo.jpg')} 
              resizeMode="contain"
            />
          </View>
          
          <BigText style={styles.title}>Forgot Password</BigText>
          <SmallText style={styles.subtitle}>
            Enter your email address and we'll send you an OTP to reset your password.
          </SmallText>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleGetOtp}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Feather name="mail" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor="#999"
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                {touched.email && errors.email && (
                  <SmallText style={styles.errorText}>{errors.email}</SmallText>
                )}

                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.submitButton}
                  disabled={loading}
                >
                  <RegularText style={styles.submitButtonText}>
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </RegularText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backToLogin}
                  onPress={() => navigation.goBack()}
                >
                  <Feather name="arrow-left" size={16} color={COLORS.primary} />
                  <RegularText style={styles.backToLoginText}>Back to Login</RegularText>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>

        {/* Success Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showSuccessModal}
          onRequestClose={handleContinueToOTP}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <Feather name="mail" size={50} color={COLORS.primary} />
              </View>
              <BigText style={styles.modalTitle}>Check Your Email</BigText>
              <RegularText style={styles.modalText}>
                We've sent a password reset OTP to your email address. Please check your inbox and enter the OTP to continue.
              </RegularText>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleContinueToOTP}
              >
                <RegularText style={styles.modalButtonText}>Continue to OTP</RegularText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingContainer>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    height: 150,
    width: 150,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
    color: COLORS.black,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 50,
    marginBottom: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: COLORS.black,
    height: '100%',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    marginLeft: 15,
    marginBottom: 15,
    fontSize: 13,
  },
  submitButton: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  backToLoginText: {
    color: COLORS.primary,
    marginLeft: 8,
    fontSize: 15,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  modalIconContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;