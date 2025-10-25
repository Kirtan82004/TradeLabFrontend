"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { UserIcon, Camera, Shield, CheckCircle } from "@/components/ui/icons"
import type { UserProfile } from "@/lib/profile"

interface ProfileHeaderProps {
  profile: UserProfile
  onAvatarUpload: (file: File) => void
}

export function ProfileHeader({ profile, onAvatarUpload }: ProfileHeaderProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      try {
        await onAvatarUpload(file)
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center overflow-hidden">
            {profile.avatar ? (
              <img src={profile.avatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <UserIcon className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          <label className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1.5 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
            <Camera className="h-3 w-3" />
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={isUploading} />
          </label>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-foreground">
              {profile.fullName
                ? `${profile.fullName}`
                : profile.email.split("@")[0]}
            </h1>
          </div>
          <p className="text-muted-foreground mb-3">{profile.email}</p>
          <p className="text-muted-foreground mb-3">{profile.phoneNo}</p>
          <p className="text-muted-foreground mb-3">{profile.address}</p>
            <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">Verified User</span>
            </div>
        </div>
      </div>
    </div>
  )
}
