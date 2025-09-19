import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import {RootStackParams} from './types';
import {useNavigation} from '@react-navigation/native';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import VerifyOtpScreen from '../screens/auth/VerifyOtpScreen';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import AllowNotificationScreen from '../screens/AllowNotificationScreen';
import InterestScreen from '../screens/InterestsScreen';
import SetLocationScreen from '../screens/SetLocationScreen';
import AccountCreatedScreen from '../screens/AccountCreatedScreen';
import SearchScreen from '../screens/SearchScreen';
import SpecialOffersScreen from '../screens/SpecialOffersScreen';
import NearByYouScreen from '../screens/NearByYouScreen';
import TrendingMealsScreen from '../screens/TrendingMealsScreen';
import PopularRestaurantScreen from '../screens/PopularRestaurantScreen';
import FilterScreen from '../screens/FilterScreen';
import OfferAndBenefitScreen from '../screens/OfferAndBenefitScreen';
import ThankYouScreen from '../screens/cart/ThankYouScreen';
import TrackOrderScreen from '../screens/cart/TrackOrderScreen';
import CancelOrderScreen from '../screens/cart/CancelOrderScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import NotificationOptionScreen from '../screens/SettingScreen/NotificationOptionScreen';
import LanguageScreen from '../screens/SettingScreen/LanguageScreen';
import AboutUsScreen from '../screens/SettingScreen/AboutUsScreen';
import InviteFriendsScreen from '../screens/SettingScreen/InviteFriendsScreen';
import ContactUsScreen from '../screens/SettingScreen/ContactUsScreen';
import FAQsScreen from '../screens/SettingScreen/FAQsScreen';
import PrivacyPolicyScreen from '../screens/SettingScreen/PrivacyPolicyScreen';
import LogoutScreen from '../screens/LogoutScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import MyWalletScreen from '../screens/MyWalletScreen';
import PaymentMethodScreen from '../screens/PaymentMethods';
import AddNewCardScreen from '../screens/AddNewCardScreen';
import SingleRestaurantScreen from '../screens/SingleRestaurantScreen';
import SingleItemScreen from '../screens/SingleItemScreen';
import DeliveryAddressScreen from '../screens/DeliveryAddressScreen';
import PaymentOptionsScreen from '../screens/PaymentOptionsScreen';
import MyAddressScreen from '../screens/MyAddressScreen';
import AddNewAddressScreen from '../screens/AddNewAddress';
import EditAddressScreen from '../screens/EditAddress';
import DriverReviewScreen from '../screens/cart/DriverReviewScreen';
import DriverTipScreen from '../screens/cart/DriverTipScreen';
import LeaveReviewScreen from '../screens/LeaveReviewScreen';
import NotificationScreen from '../screens/NotificationScreen';
import CallScreen from '../screens/CallScreen';
import WaitlistStatusScreen from '../screens/WaitlistStatusScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import SetNewPasswordScreen from '../screens/auth/SetNewPasswordScreen';
// New grocery app screens
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderConfirmationScreen from '../screens/OrderConfirmationScreen';
import TimeSelectionScreen from '../screens/TimeSelectionScreen';
import AllFeaturedProductsScreen from '../screens/product/AllFeaturedProductsScreen';
import RecentOrdersScreen from '../screens/RecentOrdersScreen';
import { PaymentScreen } from '../payment/PaymentScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen/idenx';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootNavigator = ({localAuth, isFirstTimeOpen}: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  // Determine initial route
  let initialRouteName = 'Login';
  if (localAuth) {
    initialRouteName = 'MainTab';
  } else if (isFirstTimeOpen) {
    initialRouteName = 'OnBoarding';
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName as keyof RootStackParams}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
      <Stack.Screen name="Interest" component={InterestScreen} />
      <Stack.Screen name="SetLocation" component={SetLocationScreen} />
      <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="SpecialOffers" component={SpecialOffersScreen} />
      <Stack.Screen name="NearByYou" component={NearByYouScreen} />
      <Stack.Screen name="TrendingMeals" component={TrendingMealsScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
      <Stack.Screen name="OfferAndBenefit" component={OfferAndBenefitScreen} />
      <Stack.Screen name="ThankYou" component={ThankYouScreen} />
      <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
      <Stack.Screen name="DriverReview" component={DriverReviewScreen} />
      <Stack.Screen name="CancelOrder" component={CancelOrderScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} />
      <Stack.Screen name="FAQs" component={FAQsScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
      <Stack.Screen name="MyWallet" component={MyWalletScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="AddNewCard" component={AddNewCardScreen} />
      <Stack.Screen name="SingleItem" component={SingleItemScreen} />
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddressScreen} />
      <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
      <Stack.Screen name="MyAddress" component={MyAddressScreen} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
      <Stack.Screen name="EditAddress" component={EditAddressScreen} />
      <Stack.Screen name="DriverTip" component={DriverTipScreen} />
      <Stack.Screen name="LeaveReview" component={LeaveReviewScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Call" component={CallScreen} />
      <Stack.Screen name="WaitlistStatus" component={WaitlistStatusScreen} />
      <Stack.Screen name="TermsAndCondition" component={TermsAndConditionScreen} />
      <Stack.Screen
        name="SingleRestaurant"
        component={SingleRestaurantScreen}
      />
      <Stack.Screen
        name="NotificationOption"
        component={NotificationOptionScreen}
      />
      <Stack.Screen
        name="PopularRestaurant"
        component={PopularRestaurantScreen}
      />
      <Stack.Screen
        name="AllowNotification"
        component={AllowNotificationScreen}
      />
      <Stack.Screen name="MainTab" component={MainTabNavigator} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SetNewPassword" component={SetNewPasswordScreen} />
      {/* New grocery app screens */}
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="TimeSelection" component={TimeSelectionScreen} />
      <Stack.Screen name="AllFeaturedProducts" component={AllFeaturedProductsScreen} options={{ headerShown: true, title: 'All Featured Products' }} />
      <Stack.Screen name="RecentOrders" component={RecentOrdersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
