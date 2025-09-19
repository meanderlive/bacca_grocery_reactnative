import { NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../navigation/types';
import { Product } from '../types';
import { AppDispatch } from '../redux';
import { setTemporaryCart } from '../redux/feature/temporaryCart/temporaryCartSlice';

export const handleBuyNow = (
  product: Product,
  navigation: NavigationProp<RootStackParams>,
  dispatch: AppDispatch,
  quantity: number = 1
) => {
  try {
    // 1. Set the temporary cart with the selected product
    dispatch(setTemporaryCart({ product, quantity }));
    
    // 2. Navigate directly to the checkout screen
    navigation.navigate('Checkout', { 
      isBuyNow: true,
      productId: product.id 
    });
    
  } catch (error) {
    console.error('Error in handleBuyNow:', error);
    // You might want to show an error message to the user here
  }
};

// This function can be used to check if the current cart is a temporary buy now cart
export const isBuyNowCart = (temporaryCart: any): boolean => {
  return temporaryCart?.isTemporary === true && temporaryCart.items?.length > 0;
};

// This function can be used to clear the temporary cart after order completion
export const clearTemporaryCartAfterOrder = (dispatch: AppDispatch) => {
  // You might want to add a small delay to ensure the order is processed
  setTimeout(() => {
    dispatch(clearTemporaryCart());
  }, 5000); // 5 seconds delay
};
