import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Product } from '../../../types';

// New Cart State: Grouped by store
interface StoreCartGroup {
  storeId: string;
  storeName: string;
  scheduledTime?: string;
  items: CartItem[];
}

interface CartState {
  itemsByStore: {
    [storeId: string]: StoreCartGroup;
  };
  totalAmount: number;
  itemCount: number;
  loaded: boolean;
}

const initialState: CartState = {
  itemsByStore: {},
  totalAmount: 0,
  itemCount: 0,
  loaded: false,
};

const CART_STORAGE_KEY = 'CART';

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ [storeId: string]: StoreCartGroup }>) => {
      state.itemsByStore = action.payload;
      // Recalculate totals
      let totalAmount = 0;
      let itemCount = 0;
      Object.values(state.itemsByStore).forEach(group => {
        group.items.forEach(item => {
          totalAmount += item.product.price * item.quantity;
          itemCount += item.quantity;
        });
      });
      state.totalAmount = totalAmount;
      state.itemCount = itemCount;
      state.loaded = true;
    },
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number }>) => {
      const { product, quantity } = action.payload;
      
      console.log('CartSlice - Adding product to cart:', {
        productId: product.id,
        productName: product.name,
        hasAvatar: !!product.avatar,
        hasImage: !!product.image,
        avatar: product.avatar,
        image: product.image
      });
      
      let storeId = product.storeId;
      let storeName = product.storeName;
      // Patch: Always set storeName from restaurantId if missing
      if ((!storeId || !storeName) && (product as any).restaurantId) {
        const rest = (product as any).restaurantId;
        storeId = storeId || rest._id;
        storeName = storeName || rest.display_name || rest.name || '';
      }
      if (!storeId) return;
      if (!state.itemsByStore[storeId]) {
        state.itemsByStore[storeId] = {
          storeId,
          storeName: storeName || 'Unknown Store',
          items: [],
        };
      } else if (!state.itemsByStore[storeId].storeName) {
        state.itemsByStore[storeId].storeName = storeName || 'Unknown Store';
      }
      const group = state.itemsByStore[storeId];
      const existingItem = group.items.find(item => item.productId === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        const cartItem = {
          productId: product.id,
          product: { ...product, storeId, storeName },
          quantity,
          storeId,
        };
        
        console.log('CartSlice - Created cart item:', {
          productId: cartItem.productId,
          productName: cartItem.product.name,
          hasAvatar: !!cartItem.product.avatar,
          hasImage: !!cartItem.product.image,
          avatar: cartItem.product.avatar,
          image: cartItem.product.image
        });
        
        group.items.push(cartItem);
      }
      // Recalculate totals
      let totalAmount = 0;
      let itemCount = 0;
      Object.values(state.itemsByStore).forEach(group => {
        group.items.forEach(item => {
          totalAmount += item.product.price * item.quantity;
          itemCount += item.quantity;
        });
      });
      state.totalAmount = totalAmount;
      state.itemCount = itemCount;
    },
    removeFromCart: (state, action: PayloadAction<{ storeId: string; productId: string }>) => {
      const { storeId, productId } = action.payload;
      const group = state.itemsByStore[storeId];
      if (!group) return;
      group.items = group.items.filter(item => item.productId !== productId);
      if (group.items.length === 0) {
        delete state.itemsByStore[storeId];
      }
      // Recalculate totals
      let totalAmount = 0;
      let itemCount = 0;
      Object.values(state.itemsByStore).forEach(group => {
        group.items.forEach(item => {
          totalAmount += item.product.price * item.quantity;
          itemCount += item.quantity;
        });
      });
      state.totalAmount = totalAmount;
      state.itemCount = itemCount;
    },
    updateQuantity: (state, action: PayloadAction<{ storeId: string; productId: string; quantity: number }>) => {
      const { storeId, productId, quantity } = action.payload;
      const group = state.itemsByStore[storeId];
      if (!group) return;
      const item = group.items.find(item => item.productId === productId);
      if (item) {
        if (quantity <= 0) {
          group.items = group.items.filter(item => item.productId !== productId);
        } else {
          item.quantity = quantity;
        }
        if (group.items.length === 0) {
          delete state.itemsByStore[storeId];
        }
      }
      // Recalculate totals
      let totalAmount = 0;
      let itemCount = 0;
      Object.values(state.itemsByStore).forEach(group => {
        group.items.forEach(item => {
          totalAmount += item.product.price * item.quantity;
          itemCount += item.quantity;
        });
      });
      state.totalAmount = totalAmount;
      state.itemCount = itemCount;
    },
    clearCart: (state) => {
      state.itemsByStore = {};
      state.totalAmount = 0;
      state.itemCount = 0;
    },
    removeStore: (state, action: PayloadAction<string>) => {
      delete state.itemsByStore[action.payload];
      // Recalculate totals
      let totalAmount = 0;
      let itemCount = 0;
      Object.values(state.itemsByStore).forEach(group => {
        group.items.forEach(item => {
          totalAmount += item.product.price * item.quantity;
          itemCount += item.quantity;
        });
      });
      state.totalAmount = totalAmount;
      state.itemCount = itemCount;
    },
    setScheduledTime: (state, action: PayloadAction<{ storeId: string; scheduledTime: string }>) => {
      const { storeId, scheduledTime } = action.payload;
      if (state.itemsByStore[storeId]) {
        state.itemsByStore[storeId].scheduledTime = scheduledTime;
      }
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart, removeStore, setScheduledTime } = cartSlice.actions;
export default cartSlice.reducer;

// Thunks for persistence
export const loadCart = () => async (dispatch: any) => {
  try {
    const data = await AsyncStorage.getItem(CART_STORAGE_KEY);
    if (data) {
      dispatch(setCart(JSON.parse(data)));
    } else {
      dispatch(setCart({}));
    }
  } catch (e) {
    dispatch(setCart({}));
  }
};

export const saveCart = () => async (dispatch: any, getState: any) => {
  const { cart } = getState();
  await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.itemsByStore));
}; 