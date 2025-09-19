import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../../types';

interface TemporaryCartItem {
  product: Product;
  quantity: number;
}

interface TemporaryCartState {
  items: TemporaryCartItem[];
  isTemporary: boolean;
  lastUpdated?: number;
}

const initialState: TemporaryCartState = {
  items: [],
  isTemporary: false,
};

const temporaryCartSlice = createSlice({
  name: 'temporaryCart',
  initialState,
  reducers: {
    setTemporaryCart: (state, action: PayloadAction<{product: Product; quantity: number}>) => {
      const { product, quantity } = action.payload;
      state.items = [{
        product,
        quantity,
      }];
      state.isTemporary = true;
      state.lastUpdated = Date.now();
    },
    clearTemporaryCart: (state) => {
      state.items = [];
      state.isTemporary = false;
      state.lastUpdated = undefined;
    },
  },
});

export const { setTemporaryCart, clearTemporaryCart } = temporaryCartSlice.actions;
export default temporaryCartSlice.reducer;

// Selectors
export const selectTemporaryCart = (state: { temporaryCart: TemporaryCartState }) => state.temporaryCart;
export const selectTemporaryCartItems = (state: { temporaryCart: TemporaryCartState }) => state.temporaryCart.items;
export const selectIsTemporaryCart = (state: { temporaryCart: TemporaryCartState }) => state.temporaryCart.isTemporary;
