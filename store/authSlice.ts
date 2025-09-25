import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: string
  email: string
  // aur jo bhi fields tumhare backend se aa rahi hain
}

interface AuthState {
  user: User | null
  status: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  status: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.status = true
      state.loading = false
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
    logout: (state) => {
      state.user = null
      state.status = false
      state.loading = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { setLoading, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions
export default authSlice.reducer
