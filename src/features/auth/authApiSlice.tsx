import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    User,
    LoginRequest,
    RegisterRequest,
    LoginResponse,
    RegisterResponse,
    LogoutResponse
} from '../../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL}/auth/`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (userData) => ({
                url: 'register',
                method: 'POST',
                body: userData,
            }),
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
        getProfile: builder.query<User, void>({
            query: () => 'me',
        }),
        refresh: builder.mutation<LoginResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'POST',
            }),
        }),
        googleAuth: builder.query<void, void>({
            query: () => 'google',
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useRefreshMutation,
    useLazyGoogleAuthQuery,
} = authApi;