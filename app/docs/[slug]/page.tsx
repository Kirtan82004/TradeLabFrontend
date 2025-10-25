import { notFound } from "next/navigation"
import { findDocBySlug } from "@/lib/docs"
import { DocContent } from "@/components/docs/doc-content"

export default function DocDetail({ params }: { params: { slug: string } }) {
  const doc = findDocBySlug(params.slug)
  if (!doc) return notFound()

  return (
    <main className="p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-pretty">{doc.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{doc.excerpt}</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">{doc.level}</span>
          <span className="text-xs text-muted-foreground">{new Date(doc.updatedAt).toLocaleDateString()}</span>
        </div>
      </header>
      <DocContent doc={doc} />
    </main>
  )
}
