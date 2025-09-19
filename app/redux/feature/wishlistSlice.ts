import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: any;
  category: string;
  storeId: string;
  storeName: string;
  rating: number;
  reviewCount?: number;
  isAvailable?: boolean;
  isFavorite?: boolean;
  unit?: string;
  discount?: number;
  inStock?: boolean;
}

interface WishlistState {
  items: WishlistItem[];
  loaded: boolean;
}

const initialState: WishlistState = {
  items: [],
  loaded: false,
};

const WISHLIST_STORAGE_KEY = 'WISHLIST';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
      state.loaded = true;
    },
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      if (!state.items.find(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

// Thunks for persistence
export const loadWishlist = () => async (dispatch: any) => {
  try {
    const data = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
    if (data) {
      dispatch(setWishlist(JSON.parse(data)));
    } else {
      dispatch(setWishlist([]));
    }
  } catch (e) {
    dispatch(setWishlist([]));
  }
};

export const saveWishlist = () => async (dispatch: any, getState: any) => {
  const { wishlist } = getState();
  await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist.items));
}; 