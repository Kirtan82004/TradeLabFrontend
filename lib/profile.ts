import api from "./api"
import type { User } from "./auth"

export interface UserProfile extends User {
  avatar?: string
}

export interface ProfileSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  priceAlerts: boolean
  tradeAlerts: boolean
  marketNews: boolean
  theme: "dark" | "light" | "system"
  language: string
  timezone: string
  currency: string
}

export const profileService = {
  async getProfile(): Promise<UserProfile> {
    const response = await api.get("/user/profile")
    return response
  },

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await api.put("/user/update-profile", data)
    return response
  },

  async uploadAvatar(file: File): Promise<{ avatar: string }> {
    const formData = new FormData()
    formData.append("avatar", file)
    const response = await api.post("/profile/update-image", formData)
    return response
  },

  async getSettings(): Promise<ProfileSettings> {
    const response = await api.get("/profile/settings")
    return response
  },

  async updateSettings(settings: Partial<ProfileSettings>): Promise<ProfileSettings> {
    const response = await api.put("/profile/settings", settings)
    return response
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post("/profile/change-password", { currentPassword, newPassword })
  },

  async deleteAccount(): Promise<void> {
    await api.delete("/profile/account")
  },

  async enable2FA(): Promise<{ qrCode: string; secret: string }> {
    const response = await api.post("/profile/2fa/enable")
    return response
  },

  async verify2FA(token: string): Promise<void> {
    await api.post("/profile/2fa/verify", { token })
  },

  async disable2FA(token: string): Promise<void> {
    await api.post("/profile/2fa/disable", { token })
  },
}
