import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../../Services/ApiService'
import { editPayloadInterfaceHoliday } from '../../types'

export const fetchAllHolidays: any = createAsyncThunk(
  'admin/holidays/get',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.admin.getAllHolidays()

      if (res.data && res.data.success) {
        const holidays = res.data
        return holidays
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const changeHoliday: any = createAsyncThunk(
  'admin/holiday/update',
  async (payload: object, thunkAPI) => {
    try {
      let res = await ApiService.admin.changeHolidaysDetails(payload)

      if (res.data && res.data.success) {
        const holidays = res.data
        return holidays
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const addHoliday: any = createAsyncThunk(
  'admin/holiday',
  async (payload: editPayloadInterfaceHoliday, thunkAPI) => {
    try {
      let res = await ApiService.admin.addHolidays(payload)

      if (res.data && res.data.success) {
        const holidays = res.data
        return holidays
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const deleteHoliday:any = createAsyncThunk(
  'admin/holiday/delete',
  async (payload:number, thunkAPI) => {
    try {
      let res = await ApiService.admin.deleteHolidays(payload)
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
