import {StyleSheet, View} from 'react-native';
import React from 'react';
import MainLayout from '../../../components/MainLayout';
import {BigText, SmallText} from '../../../components/MyText';
import {ScrollView} from 'react-native';
import PrimaryBtn from '../../../components/PrimaryBtn';
import ThankYouForOrderSvg from '../../../../assets/icon/svg/ThankYouForOrder.svg';
import {COLORS} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const ThankYouScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <MainLayout onBack={navigation.goBack} title="Confirmation">
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* Enhanced Success Animation Container */}
            <View style={styles.successContainer}>
              <LinearGradient
                colors={[COLORS.primary, '#E6A800']}
                style={styles.successIconGradient}
              >
                <ThankYouForOrderSvg width={80} height={80} />
              </LinearGradient>
              <View style={styles.successRings}>
                <View style={[styles.ring, styles.ring1]} />
                <View style={[styles.ring, styles.ring2]} />
                <View style={[styles.ring, styles.ring3]} />
              </View>
            </View>

            <BigText style={styles.title}>Thank You For Your Order!</BigText>
            <SmallText style={styles.subtitle}>
              Your order has been successfully placed and will be delivered on time
            </SmallText>

            {/* Order Status Card */}
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                <Feather name="check-circle" size={20} color={COLORS.primary} />
                <SmallText style={styles.statusTitle}>Order Status</SmallText>
              </View>
              <View style={styles.statusContent}>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <SmallText style={styles.statusText}>Payment Confirmed</SmallText>
                </View>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <SmallText style={styles.statusText}>Order Processing</SmallText>
                </View>
                <View style={styles.statusRow}>
                  <View style={[styles.statusDot, styles.statusDotPending]} />
                  <SmallText style={styles.statusTextPending}>Preparing Your Order</SmallText>
                </View>
              </View>
            </View>

            <View style={styles.divider} />
            
            {/* Enhanced Buttons */}
            <LinearGradient
              colors={[COLORS.primary, '#E6A800']}
              style={styles.gradientButton}
            >
              <PrimaryBtn
                onPress={() => navigation.navigate('MainTab')}
                text="Go To Home"
                containerStyle={styles.primaryBtn}
                textStyle={styles.primaryBtnText}
              />
            </LinearGradient>
            
            <PrimaryBtn
              // onPress={() => navigation.navigate('TrackOrder')}
              text="Track My Order"
              containerStyle={styles.outlineBtn}
              textStyle={styles.outlineBtnText}
            />
          </View>
        </ScrollView>
      </MainLayout>
    </LinearGradient>
  );
};

export default ThankYouScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 8,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 36,
    width: '96%',
    maxWidth: 420,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
    width: 160,
    height: 160,
    justifyContent: 'center',
  },
  successIconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    position: 'absolute',
    zIndex: 10,
  },
  successRings: {
    position: 'absolute',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  ring: {
    position: 'absolute',
    borderRadius: 80,
    borderWidth: 2,
    borderColor: COLORS.primary,
    opacity: 0.3,
  },
  ring1: {
    width: 160,
    height: 160,
  },
  ring2: {
    width: 140,
    height: 140,
  },
  ring3: {
    width: 120,
    height: 120,
  },
  title: {
    textAlign: 'center',
    width: '90%',
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
  },
  subtitle: {
    marginBottom: 32,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  statusTitle: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  statusContent: {
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  statusDotPending: {
    backgroundColor: '#E6A800',
  },
  statusText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  statusTextPending: {
    fontSize: 14,
    color: COLORS.grey,
  },
  divider: {
    width: '80%',
    height: 1.5,
    backgroundColor: '#e0e0e0',
    marginBottom: 24,
    borderRadius: 1,
    opacity: 0.7,
  },
  gradientButton: {
    width: '100%',
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 14,
  },
  primaryBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    textAlign: 'center',
  },
  primaryBtnText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    width: '100%',
  },
  outlineBtn: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  outlineBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 17,
  },
});
