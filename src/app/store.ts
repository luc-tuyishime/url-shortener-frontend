import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApiSlice';
import { urlsApi } from '../features/urls/urlsApiSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [urlsApi.reducerPath]: urlsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['auth/loginSuccess', 'auth/registerSuccess'],
                ignoredPaths: ['auth.user', 'auth.error'],
            },
        }).concat(authApi.middleware, urlsApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;