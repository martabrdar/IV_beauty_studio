import { apiSlice } from './ApiSlice';

export const techniciansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTechnicians: builder.query({
      query: () => '/api/technicians',
      providesTags: ['Technician'],
    }),
    getTechnicianById: builder.query({
      query: (id) => `/api/technicians/${id}`,
      providesTags: ['Technician'],
    }),
  }),
});

export const { useGetTechniciansQuery, useGetTechnicianByIdQuery } = techniciansApiSlice;