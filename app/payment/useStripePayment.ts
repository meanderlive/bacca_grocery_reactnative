import { useState } from 'react';
import { api_getPaymentIntent } from '../api/payment';

export const useStripePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = async (paymentIntentId: string) => {
    if (!paymentIntentId) {
      console.log('useStripePayment - ERROR: Payment Intent ID is empty or undefined');
      setError('Payment Intent ID is required');
      return null;
    }

    console.log('useStripePayment - Starting fetchClientSecret with paymentIntentId:', paymentIntentId);
    console.log('useStripePayment - Payment Intent ID type:', typeof paymentIntentId);
    console.log('useStripePayment - Payment Intent ID length:', paymentIntentId.length);

    setLoading(true);
    setError(null);
    try {
      console.log('useStripePayment - Fetching client secret for paymentIntentId:', paymentIntentId);
      
      const response = await api_getPaymentIntent(paymentIntentId);
      console.log('useStripePayment - API Response received:', response);
      console.log('useStripePayment - Response type:', typeof response);
      console.log('useStripePayment - Response keys:', Object.keys(response));
      
      if (!response.client_secret) {
        console.log('useStripePayment - ERROR: No client_secret in response');
        console.log('useStripePayment - Available response fields:', Object.keys(response));
        setError('No client_secret in response');
        return null;
      }
      
      console.log('useStripePayment - SUCCESS: Got client secret');
      console.log('useStripePayment - Client secret length:', response.client_secret.length);
      return response.client_secret;
    } catch (err: any) {
      console.log('useStripePayment - ERROR:', err.message);
      console.log('useStripePayment - Error stack:', err.stack);
      setError(err.message || 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchClientSecret,
  };
}; 