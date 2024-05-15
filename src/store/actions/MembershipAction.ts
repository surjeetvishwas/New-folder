import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../../Services/ApiService'
import { editMembsershipPayloadInterface } from '../../types'

export const fetchAllMemberships: any = createAsyncThunk(
  'admin/membership/get',
  async (payload, thunkAPI) => {
    try {
      let res = await ApiService.admin.getAllMemberships()

      if (res.data && res.data.success) {
        const memberships = res.data
        return memberships
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const changeMembership: any = createAsyncThunk(
  'admin/membership/update',
  async (payload: object, thunkAPI) => {
    try {
      let res = await ApiService.admin.changeMembershipDetails(payload)

      if (res.data && res.data.success) {
        const memberships = res.data
        return memberships
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const addMembership: any = createAsyncThunk(
  'admin/membership',
  async (payload: editMembsershipPayloadInterface, thunkAPI) => {
    try {
      let res = await ApiService.admin.addMemberships(payload)

      if (res.data && res.data.success) {
        const memberships = res.data
        return memberships
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)

export const deleteMembership: any = createAsyncThunk(
  'admin/membership/delete',
  async (payload: number, thunkAPI) => {
    try {
      let res = await ApiService.admin.deleteMemberships(payload)
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
