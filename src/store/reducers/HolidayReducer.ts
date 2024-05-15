// Reducer that changes the state based on the action
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '..'
import {
  fetchAllHolidays,
  changeHoliday,
  addHoliday,
  deleteHoliday,
} from '../actions/HolidayAction'

export const holidaySlice = createSlice({
  name: 'holidays',
  initialState: {
    isLoading: false,
    error: null,
    holiday: [],
    pages: 0,
    deleteMessage: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAllHolidays.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [fetchAllHolidays.fulfilled]: (
      state: { pages: number; holiday: any; isLoading: boolean },
      action,
    ) => {
      state.holiday = action.payload.holidays
      state.pages = action.payload.pages
      state.isLoading = false
    },
    [fetchAllHolidays.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },

    // change holiday reducer
    [changeHoliday.pending]: (state) => {
      state.isLoading = true
    },
    [changeHoliday.fulfilled]: (state) => {
      state.isLoading = false
    },
    [changeHoliday.rejected]: (state) => {
      state.isLoading = false
    },

    // Add holiday reducer
    [addHoliday.pending]: (state) => {
      state.isLoading = true
    },
    [addHoliday.fulfilled]: (state) => {
      state.isLoading = false
    },
    [addHoliday.rejected]: (state) => {
      state.isLoading = false
    },

    // Delete holiday reducer
    [deleteHoliday.pending]: (state) => {
      state.isLoading = true
    },
    [deleteHoliday.fulfilled]: (state, action) => {
      state.isLoading = false
      state.deleteMessage = action.payload
    },
    [deleteHoliday.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

export const useAllHolidays = () =>
  useSelector((state: RootState) => state.holiday.holiday)
export const useGetHolidayPages = () =>
  useSelector((state: RootState) => state.holiday.pages)
export const useIsHolidayLoading = () =>
  useSelector((state: RootState) => state.holiday.isLoading)
export const useDeletedHolidayMessage = () =>
  useSelector((state: RootState) => state.holiday.deleteMessage)

export default holidaySlice.reducer
