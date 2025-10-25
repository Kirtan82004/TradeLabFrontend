"use client"

import { useMemo, useState } from "react"
import { listDocs } from "@/lib/docs"
import { DocCard } from "./doc-card"

export function DocList() {
  const allDocs = listDocs()
  const [q, setQ] = useState("")
  const [level, setLevel] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All")

  const filtered = useMemo(() => {
    return allDocs.filter((d) => {
      const matchesQ =
        !q ||
        d.title.toLowerCase().includes(q.toLowerCase()) ||
        d.excerpt.toLowerCase().includes(q.toLowerCase()) ||
        d.tags.join(" ").toLowerCase().includes(q.toLowerCase())
      const matchesLevel = level === "All" ? true : d.level === level
      return matchesQ && matchesLevel
    })
  }, [q, level, allDocs])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search documentation..."
          className="w-full sm:w-80 rounded-md border bg-background px-3 py-2 text-sm outline-none"
        />
        <div className="flex items-center gap-2">
          {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              className={`text-xs px-2 py-1 rounded border ${
                level === l ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((d) => (
          <DocCard
            key={d.id}
            title={d.title}
            excerpt={d.excerpt}
            level={d.level}
            tags={d.tags}
            coverImage={d.coverImage}
            href={`/docs/${d.slug}`}
          />
        ))}
      </div>
    </div>
  )
}
