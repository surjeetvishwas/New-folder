import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../../Services/ApiService'
import { editCategoryPayloadInterface } from '../../types'

export const fetchAllCatergory: any = createAsyncThunk(
  'admin/categories/get',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.admin.getAllCategories()

      if (res.data && res.data.success) {
        const categories = res.data
        return categories
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const changeCategory: any = createAsyncThunk(
  'admin/category/update',
  async (payload: object, thunkAPI) => {
    try {
      let res = await ApiService.admin.changeCategoryDetails(payload)

      if (res.data && res.data.success) {
        const categories = res.data
        return categories
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const addCategory: any = createAsyncThunk(
  'admin/category',
  async (payload: editCategoryPayloadInterface, thunkAPI) => {
    try {
      let res = await ApiService.admin.addCategory(payload)
      if (res.data && res.data.success) {
        const categories = res.data
        return categories
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const deleteCategory: any = createAsyncThunk(
  'admin/category/delete',
  async (payload: number, thunkAPI) => {
    try {
      let res = await ApiService.admin.deleteCategories(payload)
      if (res.data && res.data.success) {
        const message = res.data.message
        return message
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)
