import api from "./api"

export interface User {
  _id: string
  fullName: string
  email: string
  phoneNo: string
  address: string
  balance: number
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export const authService = {
  // Login user
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post("/auth/login", { email, password })
    console.log("response", response)
    return response.data as AuthResponse
  },

  // Register new user
  async register(
    fullName: string,
    email: string,
    password: string,
    phoneNo: string,
    address: string
  ): Promise<AuthResponse> {
    const response = await api.post("/auth/register", {
      fullName,
      email,
      password,
      phoneNo,
      address,
    })
    console.log("response", response)
    if (response.status === 201) {
      this.login(email, password)
    }
    return response.data as AuthResponse
  },

  // Logout user
  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  },
  

  // Get user from localStorage
  getStoredUser(): User | null {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  },

  // Store auth token and user in localStorage
  storeAuth(accessToken: string, user: User) {
    localStorage.setItem("token", accessToken)
    localStorage.setItem("user", JSON.stringify(user))
  },
}
