import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// backend, menja se URL
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // Automatski dodaje JWT token u svaki zahtev
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Tagovi za cache invalidaciju
  tagTypes: ['User', 'Booking', 'Service', 'Admin'],
  endpoints: () => ({}),
});
