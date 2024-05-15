import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../../Services/ApiService'
import { GetAllUsersPayload } from '../types/auth'

export const fetchAllUsers:any = createAsyncThunk(
    "admin/user",
    async (payload:GetAllUsersPayload, thunkAPI) => {
      try {
        let res = await ApiService.admin.getAllUsers(payload);
        if (res.data && res.data.success) {
          const users = res.data;
          return users;
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
      }
    }
  );

export const deleteUser:any = createAsyncThunk(
    "admin/user/id",
    async (payload:number, thunkAPI) => {
      try {
        let res = await ApiService.admin.deleteUser(payload);
        if (res.data && res.data.success) {
          const message = res.data;
          return message;
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
      }
    }
  );

export const deleteAllUser:any = createAsyncThunk(
    "admin/user/id",
    async (payload, thunkAPI) => {
      try {
        let res = await ApiService.admin.deleteAllUser();
        if (res.data && res.data.success) {
          const message = res.data;
          return message;
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
      }
    }
  );
