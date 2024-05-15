// Reducer that changes the state based on the action
import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '..'
import {
  addCategory,
  changeCategory,
  deleteCategory,
  fetchAllCatergory,
  // changeMembership,
  // addMembership,
  // deleteMembership,
} from '../actions/CategoryAction'

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    isLoading: false,
    error: null,
    categories: [],
    deleteMessage: null,
  },
  reducers: {},
  extraReducers: {
    [fetchAllCatergory.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [fetchAllCatergory.fulfilled]: (
      state: { categories: any; isLoading: boolean },
      action,
    ) => {
      state.categories = action.payload.categories
      state.isLoading = false
    },
    [fetchAllCatergory.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },

    // change membership reducer
    [changeCategory.pending]: (state) => {
      state.isLoading = true
    },
    [changeCategory.fulfilled]: (state) => {
      state.isLoading = false
    },
    [changeCategory.rejected]: (state) => {
      state.isLoading = false
    },

    // Add membership reducer
    [addCategory.pending]: (state) => {
      state.isLoading = true
    },
    [addCategory.fulfilled]: (state) => {
      state.isLoading = false
    },
    [addCategory.rejected]: (state) => {
      state.isLoading = false
    },

    // Delete Category reducer
    [deleteCategory.pending]: (state) => {
      state.isLoading = true
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.isLoading = false
      state.deleteMessage = action.payload
    },
    [deleteCategory.rejected]: (state) => {
      state.isLoading = false
    },
  },
})

export const useAllCategories = () =>
  useSelector((state: RootState) => state.Category.categories)
export const useIsCategoryLoading = () =>
  useSelector((state: RootState) => state.Category.isLoading)
export const useDeletedCategoryMessage = () =>
  useSelector((state: RootState) => state.Category.deleteMessage)

export default categorySlice.reducer
