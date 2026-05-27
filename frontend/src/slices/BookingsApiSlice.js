import { apiSlice } from './apiSlice';

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // GET /api/bookings/my — termini prijavljenog korisnika
    getMyBookings: builder.query({
      query: () => '/api/bookings/my',
      providesTags: ['Booking'],
    }),

    // POST /api/bookings — novi termin
    createBooking: builder.mutation({
      query: (data) => ({
        url: '/api/bookings',
        method: 'POST',
        body: data,
        // Šta backend očekuje:
        // {
        //   serviceId, serviceName, servicePrice,
        //   technicianId, technicianName,
        //   date, timeSlot,
        //   paymentMethod, note
        // }
      }),
      invalidatesTags: ['Booking'],
    }),

    // PUT /api/bookings/:id/cancel — otkazivanje termina
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/api/bookings/${id}/cancel`,
        method: 'PUT',
      }),
      invalidatesTags: ['Booking'],
    }),

    // GET /api/bookings — svi termini (samo admin)
    getAllBookings: builder.query({
      query: () => '/api/bookings',
      providesTags: ['Booking'],
    }),

    // PUT /api/bookings/:id/status — promeni status (samo admin)
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/bookings/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Booking'],
    }),

  }),
});

export const {
  useGetMyBookingsQuery,
  useCreateBookingMutation,
  useCancelBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} = bookingsApiSlice;
