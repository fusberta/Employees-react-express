import { User } from "@prisma/client";
import { api } from "./api";

export type UserData = Omit<User, "id">;
type ResponseUserData = User & { token: string };

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseUserData, UserData>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            })
        }),
        register: builder.mutation<ResponseUserData, UserData>({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData
            })
        }),
        current: builder.query<ResponseUserData, void>({
            query: (userData) => ({
                url: '/user/current',
                method: 'GET'
            })
        }),
    })
});

export const { useCurrentQuery, useLoginMutation, useRegisterMutation } = authApi;

export const { endpoints: { login, register, current } } = authApi;