export interface SignInPayload {
  email: string
  password: string
}

export interface GetAllUsersPayload {
  id: number|string
  search?: string
}

export interface GetAllShopsPayload {
  id: number|string
  search?: string
}

export interface GetAllMembershipsPayload {
  id: number|string
}
