export type RootStackParams = {
  OnBoarding: undefined;
  Welcome: undefined;
  Signup: undefined;
  PrivacyPolicy: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  VerifyOtp: { 
    email: string; 
    token?: string; 
    otp?: string;
    fromScreen?: 'signup' | 'forgotPassword'; 
  };
  SetNewPassword: { token: string };
  DrawerNavigator: undefined;
  Pdf: undefined;
  YourActivity: undefined;
  Setting: undefined;
  CloseFriends: undefined;
  Favorite: undefined;
  Saved: undefined;
  ArchivePosts: undefined;
  FillProfile: undefined;
  AllowNotification: undefined;
  PostCreate: undefined;
  SpecialOffers: undefined;
  Interest: undefined;
  PostSubmit: {selectImages: any};
  MainTab: undefined;
  LanguageSelect: undefined;
  Filter: undefined;
  ProfileSetting: undefined;
  SetLocation: undefined;
  StoryScreen: undefined;
  AccountCreated: undefined;
  OthersStory: undefined;
  Splash: undefined;
  EditProfile: undefined;
  Search: undefined;
  Logout: undefined;
  NearByYou: undefined;
  TrendingMeals: undefined;
  PopularRestaurant: undefined;
  OfferAndBenefit: undefined;
  CancelOrder: undefined;
  DriverReview: undefined;
  TrackOrder: undefined;
  NotificationOption: undefined;
  ThankYou: undefined;
  Language: undefined;
  EditAddress: undefined;
  AddNewAddress: undefined;
  MyAddress: undefined;
  PaymentOptions: undefined;
  AboutUs: undefined;
  FAQs: undefined;
  PaymentMethod: undefined;
  ContactUs: undefined;
  InviteFriends: undefined;
  MyOrders: undefined;
  MyWallet: undefined;
  SingleRestaurant: undefined;
  SingleItem: undefined;
  DeliveryAddress: undefined;
  DriverTip: undefined;
  AddNewCard: undefined;
  LeaveReview: undefined;
  Notification: undefined;
  SingleResDineOut: undefined;
  BookTable: undefined;
  BookingDetails: undefined;
  BookingSuccessfull: undefined;
  PremiumMembership: undefined;
  Call: undefined;
  WaitlistStatus: undefined;
  TermsAndCondition: undefined;
  // New grocery app screens
  ProductDetail: { productId: string };
  Cart: undefined;
  Checkout: { 
    isBuyNow?: boolean;
    productId?: string;
    slot?: string;
    slots?: { [storeId: string]: { option: string; timeSlot?: string } };
  };
  OrderConfirmation: { 
    orderId: string;
    isBuyNow?: boolean;
  };
  TimeSelection: { isBuyNow?: boolean };
  Orders: undefined;
  Wishlist: undefined;
  AllFeaturedProducts: undefined;
  Settings: undefined;
  StoreDetail: { storeId: string };
  CategoryProducts: { categoryId: string };
  RecentOrders: undefined;
  Payment: undefined;
  DeleteAccount: undefined;
 
};

// TABS ====>
export type TabNavigatorParams = {
  HomeTab: undefined;
  WishlistTab: undefined;
  CartTab: undefined;
  NotificationTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParams = {
  Home: undefined;
  StoryScreen: undefined;
  Activity: undefined;
  Message: undefined;
  Search: undefined;
  ChatScreen: undefined;
  SingleItem: undefined;
  OtherUserProfile: {otherUserId: string};

};

export type WishlistStackParams = {
  Wishlist: undefined;
};

export type NotificationStackParams = {
  Notification: undefined;
};

export type CartStackParams = {
  Cart: { isBuyNow?: boolean };
  ThankYou: { orderId: string; isBuyNow?: boolean };
  TrackOrder: { orderId: string };
  DriverInformation: { orderId: string };
  DriverRating: { orderId: string };
  CancelOrder: { orderId: string };
  TimeSelection: { isBuyNow?: boolean };
};

export type ProfileStackParams = {
  Profile: {postId: string};
  EditProfile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParams {}
  }
}
