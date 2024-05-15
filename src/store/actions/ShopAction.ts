import { createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../../Services/ApiService'
import { GetAllShopsPayload } from '../types/auth'

export const fetchAllShops:any = createAsyncThunk(
    "admin/shops",
    async (payload:GetAllShopsPayload, thunkAPI) => {
      try {
        let res = await ApiService.admin.getAllShops(payload);
        if (res.data && res.data.success) {
          const shops = res.data;
          return shops;
        } else {
          return thunkAPI.rejectWithValue(res.data.message);
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(`Request failed with error: ${error}`);
      }
    }
  );

  export const deleteShop:any = createAsyncThunk(
    "admin/shop/id",
    async (payload:number, thunkAPI) => {
      try {
        let res = await ApiService.admin.deleteShop(payload);
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

  export const deleteAllShop:any = createAsyncThunk(
    "admin/shop/id",
    async (payload, thunkAPI) => {
      try {
        let res = await ApiService.admin.deleteAllShop();
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
