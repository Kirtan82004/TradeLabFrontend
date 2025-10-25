import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
  title: string
  excerpt: string
  level: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
  href: string
  coverImage?: string
  className?: string
}

export function DocCard({ title, excerpt, level, tags, href, coverImage, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-lg border bg-card text-card-foreground hover:shadow-md transition-shadow",
        className,
      )}
    >
      {coverImage ? (
        <div className="h-36 w-full overflow-hidden rounded-t-lg">
          <img src={coverImage || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
        </div>
      ) : null}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-pretty">{title}</h3>
          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{level}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((t) => (
            <span key={t} className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
