import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import React, { useState, useRef } from 'react';
import MainLayout from '../../components/MainLayout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/types';
import { BigText, RegularText, SmallText } from '../../components/MyText';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../styles';
import { Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { api_login } from '../../api/auth';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/feature/auth/authSlice';
import { AppDispatch } from '../../redux/store';
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer';
import LoginSuccessModal from '../../components/LoginSuccessModal';
import LottieView from 'lottie-react-native';

const LoginScreen = () => {
    const [termsAccepted, setTermsAccepted] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const animationRef = useRef<LottieView>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const dispatch = useDispatch<AppDispatch>();

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Enter a valid email address'),
        password: Yup.string().required('Password is required'),
    });

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            setLoading(true);
            // Reset the error state
            setFormErrors({});
            
            // Check for terms acceptance
            if (!termsAccepted) {
                setFormErrors({ terms: 'Please accept the terms and conditions' });
                setLoading(false);
                return;
            }
            
            // Submit login request to API
            const payload = {
                email: values.email.trim(),
                password: values.password,
            };

            const response = await api_login(payload);
            if (response.isSuccess) {
                setShowSuccessModal(true);
                await dispatch(loginUser(response.data) as any);

                // Navigate to MainTab after successful login
                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigation.navigate('MainTab');
                }, 2000);
            } else {
                Alert.alert('Login Failed', response.error || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Login Failed', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout onBack={navigation.goBack}>
            <KeyboardAvoidingContainer style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <FastImage 
                            style={{ 
                                height: 120, 
                                width: 120,
                                marginBottom: 15
                            }} 
                            source={require('../../../assets/images/Logo.jpg')} 
                            resizeMode="cover"
                        />
                        <BigText style={{ 
                            textAlign: 'center', 
                            marginBottom: 30, 
                            fontSize: 25,
                            color: COLORS.black
                        }}>
                            Lets You In
                        </BigText>
                    </View>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleLogin(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                            
                            {/* Email Input */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 50,
                                borderWidth: 2,
                                borderColor: 'black',
                                borderRadius: 50,
                                marginHorizontal: 15,
                                paddingLeft: 15,
                                marginVertical: 15,
                            }}>
                                <Feather name="mail" size={20} color="#666" style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder="Enter Email"
                                    placeholderTextColor={COLORS.black}
                                    style={{
                                        flex: 1,
                                        color: 'black',
                                        paddingRight: 15,
                                    }}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            {touched.email && errors.email && (
                                <Text style={{ color: 'red', marginLeft: 30, marginTop: -10, marginBottom: 5 }}>{errors.email}</Text>
                            )}

                            {/* Password Input */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                height: 50,
                                borderWidth: 2,
                                borderColor: 'black',
                                borderRadius: 50,
                                marginHorizontal: 15,
                                paddingLeft: 15,
                                marginVertical: 15,
                            }}>
                                <Feather name="lock" size={20} color="#666" style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder="Enter Password"
                                    placeholderTextColor={COLORS.black}
                                    style={{
                                        flex: 1,
                                        color: 'black',
                                        paddingRight: 15,
                                    }}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={!showPassword}
                                />
                                <TouchableOpacity 
                                    onPress={() => setShowPassword(!showPassword)}
                                    style={{ padding: 10, marginRight: 5 }}
                                >
                                    <Feather 
                                        name={showPassword ? 'eye-off' : 'eye'} 
                                        size={20} 
                                        color="#666" 
                                    />
                                </TouchableOpacity>
                            </View>
                            {touched.password && errors.password && (
                                <Text style={{ color: 'red', marginLeft: 30, marginTop: -10, marginBottom: 5 }}>{errors.password}</Text>
                            )}

                            {/* Forgot Password */}
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ForgotPassword')}
                                style={{ alignItems: 'flex-end', marginRight: 15, marginTop: 5, marginBottom: 10 }}
                            >
                                <SmallText style={{
                                    color: COLORS.primary,
                                    textAlign: 'right',
                                    textDecorationLine: 'underline',
                                    fontWeight: 'bold',
                                    fontSize: 15,
                                }}>
                                    Forgot Password?
                                </SmallText>
                            </TouchableOpacity>

                         

                            {/* Login Button */}
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                style={{
                                    height: 50,
                                    borderWidth: 2,
                                    borderColor: 'black',
                                    borderRadius: 50,
                                    marginHorizontal: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.primary,
                                }}
                            >
                                <RegularText style={{ fontSize: 15, color: 'white' }}>Login</RegularText>
                            </TouchableOpacity>
                               {/* Terms & Conditions Checkbox */}
                               <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15, marginBottom: 20,marginTop:20 }}>
                                <TouchableOpacity
                                    onPress={() => setTermsAccepted(!termsAccepted)}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderWidth: 2,
                                        borderColor: termsAccepted ? COLORS.primary : '#666',
                                        borderRadius: 4,
                                        marginRight: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: termsAccepted ? COLORS.primary : 'transparent',
                                    }}
                                >
                                    {termsAccepted && (
                                        <Feather name="check" size={16} color="white" />
                                    )}
                                </TouchableOpacity>
                                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                                    <SmallText>I agree to the </SmallText>
                                    <TouchableOpacity 
                                        onPress={() => navigation.navigate('TermsAndCondition' as any)}
                                    >
                                        <SmallText style={{ color: COLORS.primary, textDecorationLine: 'underline' }}>
                                            Terms & Conditions
                                        </SmallText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {formErrors.terms && (
                                <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
                                    {formErrors.terms}
                                </Text>
                            )}

                            {/* Signup Link */}
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Signup' as any)}
                                style={{ marginTop: 10, marginBottom: 40, alignItems: 'center' }}
                            >
                                <SmallText style={{ color: COLORS.grey, textAlign: 'center' }}>
                                    New user? <SmallText style={{ color: COLORS.primary, textDecorationLine: 'underline', fontWeight: 'bold' }}>Sign up</SmallText>
                                </SmallText>
                            </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </KeyboardAvoidingContainer>

            {/* Success Modal */}
            <LoginSuccessModal
                visible={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    navigation.navigate('MainTab');
                }}
                title="Welcome Back!"
                message="You have successfully logged in to your JustSkipLine account."
            />

            {/* Loading Animation */}
            {loading && (
                <LottieView
                    ref={animationRef}
                    source={require('../../../assets/animations/loading.json')}
                    autoPlay
                    loop
                    style={{
                        position: 'absolute',
                        top: '40%',
                        left: '40%',
                        width: 100,
                        height: 100,
                    }}
                />
            )}
        </MainLayout>
    );
};

export default LoginScreen;
