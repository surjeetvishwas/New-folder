// Reducer that changes the state based on the action
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '..'
import {
  fetchAllMemberships,
  changeMembership,
  addMembership,
  deleteMembership,
} from '../actions/MembershipAction'

export const memberSlice = createSlice({
  name: 'memberships',
  initialState: {
    isLoading: false,
    error: null,
    membership: [],
    deleteMessage: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAllMemberships.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [fetchAllMemberships.fulfilled]: (
      state: { membership: any; isLoading: boolean },
      action,
    ) => {
      state.membership = action.payload.memberships
      state.isLoading = false
    },
    [fetchAllMemberships.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },

    // change membership reducer
    [changeMembership.pending]: (state) => {
      state.isLoading = true
    },
    [changeMembership.fulfilled]: (state) => {
      state.isLoading = false
    },
    [changeMembership.rejected]: (state) => {
      state.isLoading = false
    },

    // Add membership reducer
    [addMembership.pending]: (state) => {
      state.isLoading = true
    },
    [addMembership.fulfilled]: (state) => {
      state.isLoading = false
    },
    [addMembership.rejected]: (state) => {
      state.isLoading = false
    },

    // Delete membership reducer
    [deleteMembership.pending]: (state) => {
      state.isLoading = true
    },
    [deleteMembership.fulfilled]: (state, action) => {
      state.isLoading = false
      state.deleteMessage = action.payload
    },
    [deleteMembership.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

export const useAllMemberships = () =>
  useSelector((state: RootState) => state.membership.membership)
export const useIsMembershipLoading = () =>
  useSelector((state: RootState) => state.membership.isLoading)
export const useDeletedMembershipMessage = () =>
  useSelector((state: RootState) => state.membership.deleteMessage)

export default memberSlice.reducer
