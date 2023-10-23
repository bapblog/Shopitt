// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { productSliceProp } from '../../types/types';
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    // for login of user
    getAllProducts: builder.query({
      query: (products: string) => `${products}`
    }),
    getProduct: builder.query({
      query:(id: number) => `products/${id}`
    }),
    // for user signup
    creteProduct: builder.mutation({
      query:(body: productSliceProp) => {
        return {
          url: "admin/product/new",
          method: "post",
          body
        }
      }
    })
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllProductsQuery,useGetProductQuery,useCreteProductMutation } = productApi