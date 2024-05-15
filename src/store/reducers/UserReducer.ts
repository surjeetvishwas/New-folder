// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '..'
import { deleteUser, fetchAllUsers, deleteAllUser } from '../actions/UserAction'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    error: null,
    user: [],
    pages: 0,
    deleteMessage: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [fetchAllUsers.fulfilled]: (
      state: { user: any; isLoading: boolean, pages: number },
      action,
    ) => {
      state.user = action.payload.users
      state.pages = action.payload.pages
      state.isLoading = false
    },
    [fetchAllUsers.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
    [deleteUser.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [deleteUser.fulfilled]: (
      state: { deleteMessage: string | null ; isLoading: boolean },
      action,
    ) => {
      state.deleteMessage = action.payload.users
      state.isLoading = false
    },
    [deleteUser.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
    [deleteAllUser.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [deleteAllUser.fulfilled]: (
      state: { deleteMessage: string | null ; isLoading: boolean },
      action,
    ) => {
      state.deleteMessage = action.payload.message
      state.isLoading = false
    },
    [deleteAllUser.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const useAllUsers = () =>
  useSelector((state: RootState) => state.Users.user)
export const useGetUsersPages = () =>
  useSelector((state: RootState) => state.Users.pages)
export const useIsUserLoading = () =>
  useSelector((state: RootState) => state.Users.isLoading)
export const useDeletedMessage = () =>
  useSelector((state: RootState) => state.Users.deleteMessage)

export default userSlice.reducer
