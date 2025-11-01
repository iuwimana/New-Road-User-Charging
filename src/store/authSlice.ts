// store/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import auth from '../services/authService';

interface AuthState {
  user: any;
  isAuthenticated: boolean;
  authChecked: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authChecked: false,
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    try {
      const user = auth.getCurrentUser();
      if (user) {
        return dispatch(loginSuccess(user));
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      dispatch(setAuthChecked());
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.authChecked = true;
    },
    logoutSuccess(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.authChecked = true;
    },
    setAuthChecked(state) {
      state.authChecked = true;
    },
  },
});

export const { loginSuccess, logoutSuccess, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;