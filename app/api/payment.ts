import { BASE_URL } from ".";

export const api_getPaymentIntent = async (paymentIntentId: string) => {
   console.log('api_getPaymentIntent - Starting API call');
   console.log('api_getPaymentIntent - PaymentIntentId:', paymentIntentId);
   console.log('api_getPaymentIntent - BASE_URL:', BASE_URL);
   
  const uri = `${BASE_URL}/stripe/payment-intent/${paymentIntentId}`;
  console.log('api_getPaymentIntent - Full URI:', uri);
  
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => {
        console.log('api_getPaymentIntent - Fetch response status:', res.status);
        console.log('api_getPaymentIntent - Fetch response ok:', res.ok);
        return res.json();
      });
      
      console.log('api_getPaymentIntent - Parsed Response:', response);
      console.log('api_getPaymentIntent - Response type:', typeof response);
      console.log('api_getPaymentIntent - Response keys:', Object.keys(response));
      
      // Check if response has error
      if (response.error) {
        console.log('api_getPaymentIntent - ERROR in response:', response.error);
        throw new Error(response.error);
      }
      
      // Check if response has client_secret
      if (!response.client_secret) {
        console.log('api_getPaymentIntent - ERROR: No client_secret in response');
        console.log('api_getPaymentIntent - Available fields:', Object.keys(response));
        throw new Error('Client secret not found in response');
      }
      
      console.log('api_getPaymentIntent - SUCCESS: Found client_secret');
      return response; 
}

