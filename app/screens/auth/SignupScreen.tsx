import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Modal, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import React, { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/types';
import { BigText, MediumText, RegularText } from '../../components/MyText';
import { COLORS } from '../../styles';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { api_Signup } from '../../api/auth';
import Feather from 'react-native-vector-icons/Feather';
import KeyboardAvoidingContainer from '../../components/KeyboardAvoidingContainer';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/feature/auth/authSlice';
import { AppDispatch } from '../../redux/store';

const genderOptions = [
    { label: 'Male', value: 'male', icon: 'user' },
    { label: 'Female', value: 'female', icon: 'user' },
    { label: 'Other', value: 'other', icon: 'users' },
];

const SignupScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const validationSchema = Yup.object().shape({
        fullname: Yup.string().required('Full name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Enter a valid email address'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
        gender: Yup.string().required('Gender is required')
    });

    interface FormValues {
        fullname: string;
        email: string;
        password: string;
        confirmPassword: string;
        gender: string;
    }

    const handleSignup = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        try {
            setLoading(true);
            const payload = {
            fullname: values.fullname,
            email: values.email,
            password: values.password,
            dob: "2025-07-04T10:53:45.760Z",
            gender: values.gender,
            role: "68675f781c12ee0198a10911",
            contact_number: "string",
        };
        
            const response = await api_Signup(payload);
            if (response.isSuccess) {
                setShowSuccessModal(true);
            }
        } catch (error: any) {   
            Alert.alert('Signup failed', error?.message || 'Something went wrong');
            throw error;
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <MainLayout onBack={navigation.goBack}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <ScrollView 
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: 40,
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ alignItems: 'center', paddingTop: 20 }}>
                        <FastImage 
                            style={{ height: 150, width: 150 }} 
                            source={require('../../../assets/images/Logo.jpg')} 
                        />
                        <BigText style={{ textAlign: 'center', marginBottom: 10, fontSize: 25 }}>
                            Create Account
                        </BigText>
                    </View>
                    <Formik<FormValues>
                        initialValues={{
                            fullname: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            gender: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSignup}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, isSubmitting }) => (
                            <View style={{ padding: 20 }}>
                                {/* Full Name */}
                                <View style={styles.inputContainer}>
                                    <Feather name="user" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <TextInput
                                        placeholder="Full Name"
                                        placeholderTextColor={COLORS.black}
                                        style={styles.input}
                                        onChangeText={handleChange('fullname')}
                                        onBlur={handleBlur('fullname')}
                                        value={values.fullname}
                                    />
                                </View>
                                {touched.fullname && errors.fullname && (
                                    <Text style={styles.errorText}>{errors.fullname}</Text>
                                )}

                                {/* Gender Selection */}
                                <TouchableOpacity 
                                    style={[styles.inputContainer, !values.gender && styles.placeholderText]}
                                    onPress={() => setGenderModalVisible(true)}
                                >
                                    <Feather name="user" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <Text style={[styles.genderText, !values.gender && { color: '#999' }]}>
                                        {values.gender ? values.gender.charAt(0).toUpperCase() + values.gender.slice(1) : 'Select Gender'}
                                    </Text>
                                </TouchableOpacity>

                                {/* Email */}
                                <View style={styles.inputContainer}>
                                    <Feather name="mail" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <TextInput
                                        placeholder="Email Address"
                                        placeholderTextColor={COLORS.black}
                                        style={styles.input}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </View>
                                {touched.email && errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}

                                {/* Password */}
                                <View style={styles.inputContainer}>
                                    <Feather name="lock" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor={COLORS.black}
                                        style={[styles.input, { flex: 1 }]}
                                        secureTextEntry={!showPassword}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    <TouchableOpacity 
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={{ padding: 5 }}
                                    >
                                        <Feather 
                                            name={showPassword ? 'eye-off' : 'eye'} 
                                            size={20} 
                                            color="#666"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}

                                {/* Confirm Password */}
                                <View style={styles.inputContainer}>
                                    <Feather name="lock" size={20} color="#666" style={{ marginRight: 10 }} />
                                    <TextInput
                                        placeholder="Confirm Password"
                                        placeholderTextColor={COLORS.black}
                                        style={[styles.input, { flex: 1 }]}
                                        secureTextEntry={!showConfirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                    />
                                    <TouchableOpacity 
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={{ padding: 5 }}
                                    >
                                        <Feather 
                                            name={showConfirmPassword ? 'eye-off' : 'eye'} 
                                            size={20} 
                                            color="#666"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}

                                {/* Login Link */}
                                <View style={styles.loginContainer}>
                                    <Text style={styles.loginText}>Already have an account? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                        <Text style={styles.loginLink}>Login</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Sign Up Button */}
                                <TouchableOpacity 
                                    style={[styles.signupButton, (loading || isSubmitting) && styles.disabledButton]}
                                    onPress={() => handleSubmit()}
                                    disabled={loading || isSubmitting}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="white" />
                                    ) : (
                                        <Text style={styles.signupButtonText}>Sign Up</Text>
                                    )}
                                </TouchableOpacity>

                                {/* Gender Selection Modal */}
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={genderModalVisible}
                                    onRequestClose={() => setGenderModalVisible(false)}
                                >
                                    <View style={styles.modalOverlay}>
                                        <View style={styles.modalContent}>
                                            <Text style={styles.modalTitle}>Select Gender</Text>
                                            {genderOptions.map((option) => (
                                                <TouchableOpacity
                                                    key={option.value}
                                                    style={[
                                                        styles.genderOption,
                                                        values.gender === option.value && styles.selectedGenderOption
                                                    ]}
                                                    onPress={() => {
                                                        setFieldValue('gender', option.value);
                                                        setGenderModalVisible(false);
                                                    }}
                                                >
                                                    <Feather 
                                                        name={option.icon as any} 
                                                        size={20} 
                                                        color={values.gender === option.value ? COLORS.primary : '#666'} 
                                                        style={styles.genderIcon}
                                                    />
                                                    <Text style={styles.genderOptionText}>
                                                        {option.label}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                            <TouchableOpacity
                                                style={styles.modalCloseButton}
                                                onPress={() => setGenderModalVisible(false)}
                                            >
                                                <Text style={styles.modalCloseText}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>

                                {/* Success Modal */}
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Success Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showSuccessModal}
                onRequestClose={() => {
                    setShowSuccessModal(false);
                    navigation.navigate('Login');
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                            <Feather name="check-circle" size={60} color="green" />
                        </View>
                        <BigText style={{ textAlign: 'center', marginBottom: 10 }}>Account Created!</BigText>
                        <RegularText style={{ textAlign: 'center', marginBottom: 20 }}>
                            Your account has been created successfully.
                        </RegularText>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setShowSuccessModal(false);
                                navigation.navigate('Login');
                            }}
                        >
                            <Text style={styles.modalButtonText}>Go to Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </MainLayout>
    );
};

const styles = StyleSheet.create({
    disabledButton: {
        opacity: 0.6,
    },
    signupButton: {
        backgroundColor: COLORS.primary,
        padding: 0,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: 50,
        borderWidth: 2,
        borderColor: 'black',
    },
    signupButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        paddingVertical: 13,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 2,
        borderColor: COLORS.black,
        borderRadius: 50,
        marginBottom: 15,
        paddingLeft: 15,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        color: COLORS.black,
        height: '100%',
        paddingRight: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        padding: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginLeft: 20,
        marginTop: -10,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    modalButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    loginText: {
        color: '#666',
    },
    loginLink: {
        color: COLORS.primary,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginLeft: 5
    },
    genderText: {
        color: COLORS.black,
        fontSize: 16,
    },
    placeholderText: {
        opacity: 0.7,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.black,
    },
    genderOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
        backgroundColor: '#f8f9fa',
    },
    selectedGenderOption: {
        backgroundColor: '#e8f4ff',
        borderWidth: 1,
        borderColor: COLORS.primary + '40',
    },
    genderIcon: {
        marginRight: 15,
    },
    genderOptionText: {
        flex: 1,
        fontSize: 16,
    },
    checkIcon: {
        marginLeft: 10,
    },
    modalCloseButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    modalCloseText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    // Success Modal Styles
    successModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    successModalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        width: '100%',
        maxWidth: 350,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    successIconContainer: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    successTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    successMessage: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 24,
    },
    successButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        width: '100%',
        alignItems: 'center',
    },
    successButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default SignupScreen;
