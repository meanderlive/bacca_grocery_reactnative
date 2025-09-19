import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MediumText, RegularText } from '../../components/MyText';
import { RootStackParams } from '../../navigation/types';
import MainLayout from '../../components/MainLayout';
import { COLORS } from '../../styles';

const TermsAndConditionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <MainLayout title="Terms & Conditions" onBack={navigation.goBack}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          <RegularText style={styles.paragraph}>
            Welcome to JustSkipLine! These Terms of Service ("Terms") govern your use of the JustSkipLine mobile application and any related services (the "Application"). By accessing or using the Application, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the Application.
          </RegularText>

          <MediumText style={styles.sectionTitle}>1. Your Use of the Application</MediumText>
          <RegularText style={styles.paragraph}>
            You agree to use the Application only for its intended purpose and in compliance with these Terms. You may not use the Application for any illegal or unauthorized purpose.
          </RegularText>

          <MediumText style={styles.sectionTitle}>2. User Accounts</MediumText>
          <RegularText style={styles.paragraph}>
            To access certain features of the Application, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </RegularText>

          <MediumText style={styles.sectionTitle}>3. Products, Services, and Orders</MediumText>
          <RegularText style={styles.paragraph}>
            The Application provides access to products and services from third-party vendors. All orders placed through the Application are subject to the vendor's terms and availability.
          </RegularText>

          <MediumText style={styles.sectionTitle}>4. Billing and Payment</MediumText>
          <RegularText style={styles.paragraph}>
            You agree to provide current, complete, and accurate purchase and account information for all purchases made through the Application.
          </RegularText>

          <MediumText style={styles.sectionTitle}>5. Returns and Refunds</MediumText>
          <RegularText style={styles.paragraph}>
            Due to the perishable nature of many products available through the Application, all sales are final and we do not offer refunds or exchanges, except as required by law.
          </RegularText>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.btn, styles.declineBtn]}>
              <RegularText style={styles.btnText}>Decline</RegularText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[styles.btn, styles.acceptBtn]}>
              <RegularText style={[styles.btnText, {color: COLORS.white}]}>Accept</RegularText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default TermsAndConditionScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  content: {
    paddingBottom: 20,
  },
  paragraph: {
    fontSize: 14,
    color: COLORS.grey,
    lineHeight: 20,
    marginBottom: 15,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  btn: {
    width: '48%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  declineBtn: {
    borderWidth: 2,
    borderColor: COLORS.grey,
  },
  acceptBtn: {
    backgroundColor: COLORS.primary,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
  },
});