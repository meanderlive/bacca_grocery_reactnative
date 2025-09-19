import {configureStore} from '@reduxjs/toolkit';
import authReducer from './feature/auth/authSlice';
import cartReducer from './feature/cart/cartSlice';
import wishlistReducer from './feature/wishlistSlice';
import temporaryCartReducer from './feature/temporaryCart/temporaryCartSlice';
import storeReducer from './feature/store/storeSlice';
import { loadCart, saveCart } from './feature/cart/cartSlice';
import { loadWishlist, saveWishlist } from './feature/wishlistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    temporaryCart: temporaryCartReducer,
    store: storeReducer,
  },
});

// Load persisted state on app start
store.dispatch(loadCart());
store.dispatch(loadWishlist());

// Save to storage on state changes
let currentCart: any = null;
let currentWishlist: any[] = [];
store.subscribe(() => {
  const state = store.getState();
  if (state.cart.itemsByStore !== currentCart) {
    currentCart = state.cart.itemsByStore;
    store.dispatch(saveCart());
  }
  if (state.wishlist.items !== currentWishlist) {
    currentWishlist = state.wishlist.items;
    store.dispatch(saveWishlist());
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState, cart: CartState, wishlist: WishlistState, temporaryCart: TemporaryCartState, store: StoreState}
export type AppDispatch = typeof store.dispatch;
