import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, BookOpen, Play, CheckCircle } from "lucide-react"
import { type Tutorial, getDifficultyColor, formatDuration } from "@/lib/tutorials"
import Link from "next/link"
import Image from "next/image"

interface TutorialCardProps {
  tutorial: Tutorial
  progress?: number
  completed?: boolean
}

export function TutorialCard({ tutorial, progress = 0, completed = false }: TutorialCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative">
        <Image
          src={tutorial.thumbnailUrl || "/placeholder.svg?height=200&width=400&query=tutorial"}
          alt={tutorial.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        {tutorial.videoUrl && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-12 w-12 text-white" />
          </div>
        )}
        {completed && (
          <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
            <CheckCircle className="h-4 w-4 text-white" />
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {tutorial.title}
          </h3>
          <Badge className={getDifficultyColor(tutorial.difficulty)}>{tutorial.difficulty}</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{tutorial.description}</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {formatDuration(tutorial.duration)}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {tutorial.content.length} sections
          </div>
        </div>

        {progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="flex flex-wrap gap-1 mt-3">
          {tutorial.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tutorial.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{tutorial.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link href={`/tutorials/${tutorial.id}`}>
            {completed ? "Review" : progress > 0 ? "Continue" : "Start Learning"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
