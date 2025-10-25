export type Tutorial = {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  duration: number // minutes
  isPublished: boolean
  updatedAt: Date
}

// Mock data to satisfy current admin UI
const mockTutorials: Tutorial[] = [
  {
    id: "1",
    title: "Cryptocurrency Basics",
    description: "Fundamentals of crypto, exchanges, wallets, and order types.",
    category: "Fundamentals",
    difficulty: "beginner",
    duration: 30,
    isPublished: true,
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Technical Analysis 101",
    description: "Support/Resistance, trends, and common indicators.",
    category: "Analysis",
    difficulty: "intermediate",
    duration: 45,
    isPublished: false,
    updatedAt: new Date(),
  },
]

// Named export expected by imports
export async function getTutorials(): Promise<Tutorial[]> {
  // In real app, fetch from API
  return new Promise((resolve) => setTimeout(() => resolve(mockTutorials), 300))
}
