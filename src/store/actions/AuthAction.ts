import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../../Services/ApiService'
import { SignInPayload } from '../types/auth'

export const signIn:any = createAsyncThunk(
  'admin/login',
  async (payload:SignInPayload, thunkAPI) => {
    try {
      let res = await ApiService.admin.login(payload)
      if (res.data && res.data.success) {
        const { token } = res.data
        if (token) {
          ApiService.setAuthHeader(token)
          localStorage.setItem('AUTH_TOKEN', token)
          return { token }
        }
      } else {
        return thunkAPI.rejectWithValue(res.data.message)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(`Request failed with error: ${error}`)
    }
  },
)
