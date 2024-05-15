import axios, { AxiosHeaders } from 'axios'
import { GetAllShopsPayload, GetAllUsersPayload, SignInPayload } from '../../store/types/auth'

axios.defaults.baseURL = 'http://localhost:5000/api'
axios.defaults.timeout = 10000
axios.defaults.validateStatus = (status: number) =>
  status >= 200 && status < 500

const post = (url: string, body = {}) => axios.post(url, body)
const get = (url: string, params = {}) => axios.get(url, { params })
const put = (url: string, body = {}) => axios.put(url, body)
const del = (url: string, params = {}) => axios.delete(url, { params })

const ApiService = {
  axios,
  setAuthHeader: (
    token:
      | string
      | number
      | boolean
      | AxiosHeaders
      | string[]
      | null
      | undefined,
  ) => {
    axios.defaults.headers.common['x-auth-token'] = token
  },
  admin: {
    login: (params:SignInPayload) => post(`/admin/login`, params),
    getAllUsers: (params:GetAllUsersPayload) => get(`/admin/users/${params.id}?search=${params.search}`),
    getAllShops: (params:GetAllShopsPayload) => get(`/admin/shops/${params.id}?search=${params.search}`),
    getAllMemberships: () => get("/admin/membership"),
    getAllHolidays: () => get("/admin/holidays"),
    deleteUser: (params:number) => del(`/admin/user/${params}?`),
    deleteAllUser: () => del("/admin/allusers"),
    deleteShop: (params:number) => del(`/admin/shop/${params}?`),
    deleteAllShop: () => del("/admin/allshops"),
    changeMembershipDetails: (params: any) => put(`/admin/membership/${params.id}`, params.values),
    addMemberships: (params:any) => post(`/admin/membership`, params),
    deleteMemberships: (params:number) => del(`/admin/membership/${params}?`),
    changeHolidaysDetails: (params: any) => put(`/admin/holiday/${params.id}`, params.values),
    addHolidays: (params:any) => post(`/admin/holiday`, params),
    deleteHolidays: (params:number) => del(`/admin/holiday/${params}?`),
    getAllCategories: () => get("/admin/categories"),
    deleteCategories: (params:number) => del(`/admin/category/${params}?`),
    changeCategoryDetails: (params: any) => put(`/admin/category/${params.id}`, params.values),
    addCategory: (params:any) => post(`/admin/category`, params),
  },
}

export default ApiService
