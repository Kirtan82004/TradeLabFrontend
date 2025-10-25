"use client"

import { useState, useEffect } from "react"
import { TutorialCard } from "./tutorial-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter } from "lucide-react"
import { type Tutorial, getTutorials } from "@/lib/tutorials"

export function TutorialList() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTutorials = async () => {
      try {
        const data = await getTutorials()
        setTutorials(data)
        setFilteredTutorials(data)
      } catch (error) {
        console.error("Failed to load tutorials:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTutorials()
  }, [])

  useEffect(() => {
    let filtered = tutorials

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (tutorial) =>
          tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutorial.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((tutorial) => tutorial.category === selectedCategory)
    }

    // Filter by difficulty
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((tutorial) => tutorial.difficulty === selectedDifficulty)
    }

    setFilteredTutorials(filtered)
  }, [tutorials, searchQuery, selectedCategory, selectedDifficulty])

  const categories = Array.from(new Set(tutorials.map((t) => t.category)))
  const difficulties = ["beginner", "intermediate", "advanced"]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-muted animate-pulse rounded-lg h-96" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {difficulties.map((difficulty) => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? "s" : ""} found
        </p>

        {(searchQuery || selectedCategory !== "all" || selectedDifficulty !== "all") && (
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="text-xs">
                  {selectedCategory}
                </Badge>
              )}
              {selectedDifficulty !== "all" && (
                <Badge variant="secondary" className="text-xs">
                  {selectedDifficulty}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tutorial grid */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              progress={Math.floor(Math.random() * 100)} // Mock progress
              completed={Math.random() > 0.7} // Mock completion
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">No tutorials found</div>
          <p className="text-sm text-muted-foreground">Try adjusting your search criteria or browse all tutorials</p>
        </div>
      )}
    </div>
  )
}