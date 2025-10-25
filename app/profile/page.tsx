"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileForm } from "@/components/profile/profile-form"
import { SecuritySettings } from "@/components/profile/security-settings"
import type { UserProfile } from "@/lib/profile"
import { authService } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const user = authService.getStoredUser()
    if (!user) {
      router.push("/login")
      return
    }

    // For now, use the stored user data and extend it
    // In a real app, you'd fetch from the profile service
    const mockProfile: UserProfile = {
      ...user
    }

    setProfile(mockProfile)
    setIsLoading(false)
  }, [router])

  const handleProfileUpdate = async (data: Partial<UserProfile>) => {
    if (!profile) return

    // In a real app, you'd call profileService.updateProfile(data)
    const updatedProfile = { ...profile, ...data }
    setProfile(updatedProfile)

    // Update stored user data
    authService.storeAuth(localStorage.getItem("token") || "", updatedProfile)
  }

  const handleAvatarUpload = async (file: File) => {
    if (!profile) return

    // In a real app, you'd call profileService.uploadAvatar(file)
    // For now, create a mock URL
    const mockAvatarUrl = URL.createObjectURL(file)
    const updatedProfile = { ...profile, avatar: mockAvatarUrl }
    setProfile(updatedProfile)

    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated successfully.",
    })
  }

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    // In a real app, you'd call profileService.changePassword
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Mock delay
  }

  const handleToggle2FA = async (enabled: boolean) => {
    if (!profile) return

    // In a real app, you'd call profileService.enable2FA or disable2FA
    const updatedProfile = { ...profile, twoFactorEnabled: enabled }
    setProfile(updatedProfile)
  }

  const handleDeleteAccount = async () => {
    // In a real app, you'd call profileService.deleteAccount
    authService.logout()
    router.push("/login")
  }

  if (isLoading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <ProfileHeader profile={profile} onAvatarUpload={handleAvatarUpload} />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileForm profile={profile} onUpdate={handleProfileUpdate} />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecuritySettings
              profile={profile}
              onChangePassword={handleChangePassword}
              onToggle2FA={handleToggle2FA}
              onDeleteAccount={handleDeleteAccount}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
