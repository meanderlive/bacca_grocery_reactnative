import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/types';
import { BigText, RegularText, SmallText, MediumText } from '../../components/MyText';
import { COLORS } from '../../styles';
import { api_otpVerify, api_sendOTP } from '../../api/auth';
import PrimaryBtn from '../../components/PrimaryBtn';
import AntDesign from 'react-native-vector-icons/AntDesign';

type VerifyOtpRouteProp = RouteProp<RootStackParams, 'VerifyOtp'>;

interface VerifyOtpScreenProps {
  email?: string;
  token?: string;
  fromScreen?:  'forgotPassword';
}

const VerifyOtpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<VerifyOtpRouteProp>();
  
  // Get params from route or use defaults
  const { email, otp: paramOtp, token, fromScreen = 'signup' } = route.params || {};
  console.log("email", email);
  console.log("paramOtp", paramOtp);
  console.log("token", token);
  console.log("fromScreen", fromScreen);
  // State management
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;

  // Refs for OTP inputs
  const inputRefs = useRef<TextInput[]>([]);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Format countdown for display
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle OTP input change
  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); // Clear error when user types
  };

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Validate OTP
  const validateOtp = () => {
    const otpString = otp.join('');
    if (otpString.length !== 4) {
      setError('Please enter a 4-digit OTP');
      return false;
    }
    if (!/^\d{4}$/.test(otpString)) {
      setError('OTP should contain only numbers');
      return false;
    }
    return true;
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (!validateOtp()) return;
    
    if (attempts >= maxAttempts) {
      Alert.alert(
        'Too Many Attempts',
        'You have exceeded the maximum number of attempts. Please request a new OTP.',
        [
          { text: 'OK', onPress: () => handleResendOtp() }
        ]
      );
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const otpString = otp.join('');
      console.log("otpString", otpString);
      console.log("token", token);
      const response = await api_otpVerify(otpString, token || '');
      
      if (response.isSuccess) {
        // Success - navigate based on fromScreen
        if (fromScreen === 'forgotPassword') {
          navigation.navigate('SetNewPassword', { token: response.data?.token || token });
        } else {
          navigation.navigate('LanguageSelect');
        }
      } else {
        setError(response.error || 'Invalid OTP. Please try again.');
        setAttempts(attempts + 1);
      }
    } catch (error: any) {
      setError(error.message || 'Something went wrong. Please try again.');
      setAttempts(attempts + 1);
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsResending(true);
    setError('');

    try {
      const response = await api_sendOTP(email || '');
      
      if (response.isSuccess) {
        // Reset OTP and timer
        setOtp(['', '', '', '']);
        setCountdown(60);
        setCanResend(false);
        setAttempts(0);
        setError('');
        
        Alert.alert(
          'OTP Sent',
          'A new verification code has been sent to your email.',
          [{ text: 'OK' }]
        );
      } else {
        setError(response.error || 'Failed to send OTP. Please try again.');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  // Mask email for display
  const maskEmail = (email: string) => {
    if (!email) return '';
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 
      ? username.substring(0, 2) + '*'.repeat(username.length - 2)
      : username;
    return `${maskedUsername}@${domain}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
                     <TouchableOpacity 
             onPress={() => navigation.goBack()} 
             style={styles.backButton}
           >
             <Text style={styles.backIcon}>←</Text>
           </TouchableOpacity>
          <BigText style={styles.headerTitle}>Verify Email</BigText>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          {/* Email Display */}
          <View style={styles.emailContainer}>
            <RegularText style={styles.emailLabel}>
              We've sent a verification code to:
            </RegularText>
            <MediumText style={styles.emailText}>
              {maskEmail(email || 'user@example.com')}
            </MediumText>
          </View>

          {/* OTP Input */}
          <View style={styles.otpContainer}>
            <RegularText style={styles.otpLabel}>Enter 4-digit code</RegularText>
            
            <View style={styles.otpInputContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                                     style={[
                     styles.otpInput,
                     digit ? styles.otpInputFilled : {},
                     error ? styles.otpInputError : {}
                   ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={false}
                />
              ))}
            </View>

                         {/* Error Message */}
             {error ? (
               <View style={styles.errorContainer}>
                 <Text style={styles.errorIcon}>⚠️</Text>
                 <RegularText style={styles.errorText}>Invalid OTP. Please try again.</RegularText>
               </View>
             ) : null}

            {/* Attempts Counter */}
            {attempts > 0 && (
              <RegularText style={styles.attemptsText}>
                Attempts remaining: {maxAttempts - attempts}
              </RegularText>
            )}
          </View>

          {/* Resend Section */}
          <View style={styles.resendContainer}>
            <RegularText style={styles.resendLabel}>Didn't receive the code?</RegularText>
            
            {canResend ? (
              <TouchableOpacity 
                onPress={handleResendOtp}
                disabled={isResending}
                style={styles.resendButton}
              >
                {isResending ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <RegularText style={styles.resendButtonText}>Resend Code</RegularText>
                )}
              </TouchableOpacity>
            ) : (
              <View style={styles.countdownContainer}>
                <RegularText style={styles.countdownText}>
                  Resend in {formatCountdown(countdown)}
                </RegularText>
              </View>
            )}
          </View>

          {/* Verify Button */}
          <View style={styles.buttonContainer}>
            <PrimaryBtn
              onPress={handleVerifyOtp}
              text={isLoading ? "Verifying..." : "Verify Email"}
              disabled={otp.join('').length !== 4 || isLoading}
              loading={isLoading}
            />
          </View>

          {/* Timer Display */}
          <View style={styles.timerContainer}>
            <View style={styles.timerCircle}>
              <BigText style={styles.timerText}>{formatCountdown(countdown)}</BigText>
              <RegularText style={styles.timerLabel}>remaining</RegularText>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.black,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  emailContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emailLabel: {
    fontSize: 16,
    color: COLORS.grey,
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  otpContainer: {
    marginBottom: 30,
  },
  otpLabel: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  otpInput: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.black,
    fontWeight: 'bold',
    backgroundColor: COLORS.white,
  },
  otpInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: '#f8f9fa',
  },
  otpInputError: {
    borderColor: '#FF6B6B',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginLeft: 8,
  },
  errorIcon: {
    fontSize: 16,
  },
  attemptsText: {
    color: '#FF6B6B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendLabel: {
    fontSize: 16,
    color: COLORS.grey,
    marginBottom: 10,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resendButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  countdownContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  countdownText: {
    color: COLORS.grey,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 40,
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  timerText: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: 12,
    color: COLORS.grey,
    marginTop: 2,
  },
});

export default VerifyOtpScreen;