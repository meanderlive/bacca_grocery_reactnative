import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../../../../types';

interface StoreState {
  currentStore: Store | null;
  loading: boolean;
  error: string | null;
}

const initialState: StoreState = {
  currentStore: null,
  loading: false,
  error: null
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setCurrentStore: (state, action: PayloadAction<Store | null>) => {
      state.currentStore = action.payload;
      state.error = null;
    },
    setStoreLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setStoreError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearStoreState: (state) => {
      state.currentStore = null;
      state.loading = false;
      state.error = null;
    }
  },
});

export const { 
  setCurrentStore, 
  setStoreLoading, 
  setStoreError, 
  clearStoreState 
} = storeSlice.actions;

export default storeSlice.reducer;
