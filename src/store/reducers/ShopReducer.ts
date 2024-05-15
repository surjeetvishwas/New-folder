// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { RootState } from '..'
import { deleteAllShop, deleteShop, fetchAllShops } from '../actions/ShopAction'

export const shopSlice = createSlice({
  name: 'shops',
  initialState: {
    isLoading: false,
    error: null,
    shop: [],
    pages: 0,
    deleteMessage: null
  },
  reducers: {},
  extraReducers: {
    [fetchAllShops.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [fetchAllShops.fulfilled]: (
      state: { shop: any; isLoading: boolean, pages: number },
      action,
    ) => {
      state.shop = action.payload.shops
      state.pages = action.payload.pages
      state.isLoading = false
    },
    [fetchAllShops.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
    [deleteShop.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [deleteShop.fulfilled]: (
      state: { deleteMessage: string | null ; isLoading: boolean },
      action,
    ) => {
      state.deleteMessage = action.payload.users
      state.isLoading = false
    },
    [deleteShop.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
    [deleteAllShop.pending]: (state: { isLoading: boolean }, action) => {
      state.isLoading = true
    },
    [deleteAllShop.fulfilled]: (
      state: { deleteMessage: string | null ; isLoading: boolean },
      action,
    ) => {
      state.deleteMessage = action.payload.users
      state.isLoading = false
    },
    [deleteAllShop.rejected]: (
      state: { isLoading: boolean; error: any },
      action,
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const useAllShops = () =>
  useSelector((state: RootState) => state.Shops.shop)
export const useGetShopsPages = () =>
  useSelector((state: RootState) => state.Shops.pages)
export const useIShopLoading = () =>
  useSelector((state: RootState) => state.Shops.isLoading)
export const useDeletedMessage = () =>
  useSelector((state: RootState) => state.Shops.deleteMessage)

export default shopSlice.reducer
