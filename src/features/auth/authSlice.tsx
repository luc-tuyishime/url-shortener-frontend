import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { authApi } from './authApiSlice';
import { AuthState, AuthCredentials, User } from '../../types/auth.types';
import { RootState } from '../../app/store';


const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;

    try {
        const decoded: { exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000;


        return decoded.exp > currentTime;
    } catch (error: any) {
        return error;
    }
};


const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const initialState: AuthState = {
    user: null,
    accessToken: accessToken,
    refreshToken: refreshToken,
    isAuthenticated: isTokenValid(accessToken),
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthCredentials>) => {
            const { accessToken, refreshToken, user } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            if (user) state.user = user;
            state.isAuthenticated = true;
            state.status = 'succeeded';

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addMatcher(
                authApi.endpoints.login.matchPending,
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    const { accessToken, refreshToken } = action.payload;
                    state.accessToken = accessToken;
                    state.refreshToken = refreshToken;
                    state.isAuthenticated = true;
                    state.status = 'succeeded';

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                }
            )
            .addMatcher(
                authApi.endpoints.login.matchRejected,
                (state, action) => {
                    console.log('actions ==>', action)
                    state.status = 'failed';
                    // @ts-ignore
                    state.error = action.payload?.data?.message || action.error.message || 'Login failed';
                }
            )
            // Register
            .addMatcher(
                authApi.endpoints.register.matchPending,
                (state) => {
                    state.status = 'loading';
                    state.error = null;
                }
            )
            .addMatcher(
                authApi.endpoints.register.matchFulfilled,
                (state) => {
                    state.status = 'succeeded';
                }
            )
            .addMatcher(
                authApi.endpoints.register.matchRejected,
                (state, action) => {
                    console.log('actions ==>', action)
                    state.status = 'failed';
                    // @ts-ignore
                    state.error = action.payload?.data?.message || action.error.message || 'Registration failed';
                }
            )
            // Get profile
            .addMatcher(
                authApi.endpoints.getProfile.matchFulfilled,
                (state, action) => {
                    state.user = action.payload;
                }
            )
            // Logout
            .addMatcher(
                authApi.endpoints.logout.matchFulfilled,
                (state) => {
                    state.user = null;
                    state.accessToken = null;
                    state.refreshToken = null;
                    state.isAuthenticated = false;

                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            )
            // Refresh token
            .addMatcher(
                authApi.endpoints.refresh.matchFulfilled,
                (state, action) => {
                    const { accessToken, refreshToken } = action.payload;
                    state.accessToken = accessToken;
                    state.refreshToken = refreshToken;
                    state.isAuthenticated = true;

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                }
            );
    },
});

export const { setCredentials, logout, setUser, clearError } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;

export default authSlice.reducer;