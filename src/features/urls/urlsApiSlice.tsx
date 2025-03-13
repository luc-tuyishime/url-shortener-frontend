import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    Url,
    CreateUrlRequest,
    UrlStats,
    UserStats,
    PaginatedUrlsResponse
} from '../../types/url.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const urlsApi = createApi({
    reducerPath: 'urlsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Url', 'Stats'],
    endpoints: (builder) => ({
        createUrl: builder.mutation<Url, CreateUrlRequest>({
            query: (urlData) => ({
                url: '/shorten',
                method: 'POST',
                body: urlData,
            }),
            invalidatesTags: ['Url', 'Stats']
        }),

        getUrls: builder.query<Url[], void>({
            query: () => '/urls',
            providesTags: ['Url']
        }),

        getPaginatedUrls: builder.query<PaginatedUrlsResponse, { page: number, limit: number }>({
            query: ({ page, limit }) => `/urls?page=${page}&limit=${limit}`,
            providesTags: ['Url']
        }),


        deleteUrl: builder.mutation<void, string>({
            query: (shortCode) => ({
                url: `/urls/${shortCode}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Url', 'Stats']
        }),


        getUrlStats: builder.query<UrlStats, string>({
            query: (shortCode) => `/analytics/${shortCode}`,
            providesTags: ['Stats']
        }),

        getUserStats: builder.query<UserStats, void>({
            query: () => '/analytics',
            providesTags: ['Stats']
        }),
    }),
});

export const {
    useCreateUrlMutation,
    useGetUrlsQuery,
    useGetPaginatedUrlsQuery,
    useDeleteUrlMutation,
    useGetUrlStatsQuery,
    useGetUserStatsQuery,
} = urlsApi;