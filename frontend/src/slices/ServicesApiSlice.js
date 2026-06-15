import { apiSlice } from './ApiSlice';

export const servicesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // GET /api/services — sve usluge
    getServices: builder.query({
      query: () => '/api/services',
      providesTags: ['Service'],
    }),

    // GET /api/services/:id — jedna usluga
    getServiceById: builder.query({
      query: (id) => `/api/services/${id}`,
      providesTags: ['Service'],
    }),

    // POST /api/services — dodaj uslugu (samo admin)
    createService: builder.mutation({
      query: (data) => ({
        url: '/api/services',
        method: 'POST',
        body: data,
        // Šta backend očekuje:
        // { name, description, price, category, image, countInStock }
      }),
      invalidatesTags: ['Service'],
    }),

    // PUT /api/services/:id — izmeni uslugu (samo admin)
    updateService: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/api/services/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Service'],
    }),

    // DELETE /api/services/:id — obriši uslugu (samo admin)
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/api/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),

  }),
});

export const {
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApiSlice;
