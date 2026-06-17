import { apiSlice } from './ApiSlice';

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByService: builder.query({
      query: (id) => `/api/reviews/${id}`,
      providesTags: ['Review'],
    }),
    createReview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/reviews/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const { useGetReviewsByServiceQuery, useCreateReviewMutation } = reviewsApiSlice;