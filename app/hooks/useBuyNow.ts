import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { Product, ApiResponse, OrderCreateResponse, CreateOrderPayload } from '../types';
import { RootStackParams } from '../navigation/types';
import { setTemporaryCart, clearTemporaryCart } from '../redux/feature/temporaryCart/temporaryCartSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../redux';
import { normalizeProduct, validateProductForCheckout } from '../utils/productUtils';
import { api_orderCreate } from '../api/order';
import { useState, useEffect } from 'react';
import { setCurrentStore } from '../redux/feature/store/storeSlice';

type UseBuyNowReturn = {
  buyNow: (product: Product | any, quantity?: number) => Promise<boolean>;
  clearTemporaryCart: () => void;
  isLoading: boolean;
  error: string | null;
};

export const useBuyNow = (): UseBuyNowReturn => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get user and store info from Redux
  const { user } = useSelector((state: RootState) => state.auth);
  const { currentStore } = useSelector((state: RootState) => state.store || {});
  const deliveryAddress = useSelector((state: RootState) => state.user?.deliveryAddress);

  const clearError = () => setError(null);

  // Function to extract store from product if available
  const getStoreFromProduct = (product: any) => {
    if (product.store) return product.store;
    if (product.storeId && typeof product.storeId === 'object') return product.storeId;
    return null;
  };

  const buyNow = async (productData: Product | any, quantity: number = 1): Promise<boolean> => {
    try {
      setIsLoading(true);
      clearError();

      // Normalize product data from API response if needed
      const product = 'data' in productData ? normalizeProduct(productData.data) : normalizeProduct(productData);
      
      // Validate product
      const validation = validateProductForCheckout(product);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Check if user is logged in
      if (!user?._id) {
        throw new Error('Please login to continue');
      }

      // Try to get store from product if not in Redux
      const productStore = getStoreFromProduct(product);
      const effectiveStore = currentStore || productStore;
      
      if (!effectiveStore?._id) {
        throw new Error('No store information available. Please select a store first.');
      }

      // If we have store from product but not in Redux, update Redux
      if (productStore?._id && !currentStore?._id) {
        dispatch(setCurrentStore(productStore));
      }

      if (!deliveryAddress) {
        throw new Error('Please set a delivery address');
      }

      // Rest of your buyNow implementation...
      const orderPayload: CreateOrderPayload = {
        userId: user._id,
        storeId: effectiveStore._id,
        items: [{
          productId: product.id,
          quantity: Math.max(1, quantity),
          price: product.price
        }],
        deliveryAddress: deliveryAddress,
        paymentMethod: 'cod',
        totalAmount: product.price * Math.max(1, quantity),
        status: 'pending',
        isBuyNow: true
      };

      // Set temporary cart for immediate UI feedback
      dispatch(setTemporaryCart({
        product: {
          ...product,
          storeId: effectiveStore._id,
          storeName: effectiveStore.name || 'Store'
        },
        quantity: Math.max(1, quantity),
        isBuyNow: true
      }));

      // Navigate to checkout
      navigation.navigate('Checkout', {
        isBuyNow: true,
        productId: product.id
      });

      return true;
    } catch (err) {
      console.error('Error in buyNow:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to process your request';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearTemporaryCart = () => {
    dispatch(clearTemporaryCart());
    clearError();
  };

  return {
    buyNow,
    clearTemporaryCart: handleClearTemporaryCart,
    isLoading,
    error
  };
};
