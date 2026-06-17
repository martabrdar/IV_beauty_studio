import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const BASE_URL = 'http://localhost:5000';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    // Automatski dodaje JWT token u svaki zahtev
   prepareHeaders: (headers, { getState }) => {
  const token = getState().user?.userInfo?.token || 
    getState().admin?.adminInfo?.token ||
    JSON.parse(localStorage.getItem('userInfo') || '{}')?.token ||
    JSON.parse(localStorage.getItem('adminInfo') || '{}')?.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
},
  }),
  // Tagovi za cache invalidaciju
  tagTypes: ['User', 'Booking', 'Service', 'Admin', 'Technician', 'Review'],
  endpoints: () => ({}),
});
