import { apiSlice } from './ApiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // POST /api/admin/login — poseban admin login
    adminLogin: builder.mutation({
      query: (data) => ({
        url: '/api/admin/login',
        method: 'POST',
        body: data, // { email, password }
      }),
    }),

    // GET /api/admin/users — svi korisnici
    getAllUsers: builder.query({
      query: () => '/api/admin/users',
      providesTags: ['Admin'],
    }),

    // DELETE /api/admin/users/:id — obriši korisnika
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),

    // GET /api/admin/stats — statistike za dashboard
    getStats: builder.query({
      query: () => '/api/admin/stats',
      providesTags: ['Admin'],
      // Backend vraća:
      // { totalBookings, totalUsers, totalRevenue, todayBookings }
    }),

  }),
});

export const {
  useAdminLoginMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useGetStatsQuery,
} = adminApiSlice;
