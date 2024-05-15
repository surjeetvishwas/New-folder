// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '..'
import { signIn } from '../actions/AuthAction'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    authToken: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.authToken = action.payload.authToken
    },
    logoutUser: (state, action) => {
        state.isLoading = false;
        state.authToken = null;
        state.error = null;
      },
  },
  extraReducers: {
    [signIn.pending]: (state: { isLoading: boolean }, action: any) => {
      state.isLoading = true
    },
    [signIn.fulfilled]: (
      state: { authToken: any; isLoading: boolean },
      action: { payload: { token: null } },
    ) => {
      if (action.payload) {
        state.authToken = action.payload.token
      }
      state.isLoading = false
    },
    [signIn.rejected]: (
      state: { isLoading: boolean; error: any },
      action: { payload: null },
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setAuthData, logoutUser } = authSlice.actions

export const useToken = () =>
  useSelector((state: RootState) => state.Auth.authToken)
export const useIsLoading = () =>
  useSelector((state: RootState) => state.Auth.isLoading)

export default authSlice.reducer
