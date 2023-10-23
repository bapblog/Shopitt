// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  endpoints: (builder) => ({
    // for login of user
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "login",
          method: "post",
          body,
        };
      },
    }),
    // for user signup
    signupUser: builder.mutation({
      query: (body: {
        name: string;
        number: number;
        email: string;
        password: string;
      }) => {
        return {
          url: "signup",
          method: "post",
          body,
        };
      },
    }),
    sendVerifyMail: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "send-verify-mail",
          method: "post",
          body,
        };
      },
    }),
    verifyUserMail: builder.mutation({
      query: (body: { token: string }) => {
        return {
          url: "verify-user-mail",
          method: "post",
          body,
        };
      },
    }),

    sendForgotPassMail: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "forgot-passport",
          method: "post",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (body: { token: string; password: string }) => {
        return {
          url: "verify-forgot-mail",
          method: "post",
          body,
        };
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useSendVerifyMailMutation,
  useVerifyUserMailMutation,
  useResetPasswordMutation,
  useSendForgotPassMailMutation,
} = authApi;
