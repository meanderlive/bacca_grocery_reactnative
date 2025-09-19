import React, { ReactNode } from 'react';
import { StripeProvider as RNStripeProvider } from '@stripe/stripe-react-native';
import { YOUR_STRIPE_PUBLISH_KEY } from '../constants/constant';

interface StripeProviderProps {
  children: ReactNode;
}

// Professional: Use env variable for publishable key
const publishableKey = YOUR_STRIPE_PUBLISH_KEY || '';

const StripeProvider = ({ children }: StripeProviderProps) => (
  <RNStripeProvider publishableKey={publishableKey}>
    {children}
  </RNStripeProvider>
);

export default StripeProvider; 