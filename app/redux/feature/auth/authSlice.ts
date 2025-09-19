import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { destroyLocalStorage, setLocalUser } from '../../../utils/helper';

export interface User {
    _id: string;
    fullname: string;
    email: string;
    contact_number?: string;
    dob?: string;
    gender?: string;
    profileImage?: string;
    token: string;
    [key: string]: any; // For any additional properties
}

export interface authState {
    user: User | null;
    accessToken: string | null;
}

const initialState: authState = {
    user: null,
    accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
        const user = action.payload;
        const accessToken = user.token;
        state.user = user;
        state.accessToken = accessToken;
      },
      updateUser: (state, action: PayloadAction<any>) => {
        const user = action.payload;
        const newUser = {...state.user ,...user};
        state.user = newUser;
      },
      logOut: (state) => {
        state.user = null;
        state.accessToken = null;
      },
  },
})

// Thunks for login and logout
export const loginUser = (user: any) => async (dispatch: any) => {
  await setLocalUser(user);
  dispatch(setAuth(user));
};

export const logoutUser = () => async (dispatch: any) => {
  await destroyLocalStorage();
  dispatch(logOut());
};

export const {setAuth, updateUser, logOut } = authSlice.actions
export const tokenSelector = (s: any) => s.auth.accessToken;
export const 
authSelector = (s: any) => s.auth.user;

export default authSlice.reducer