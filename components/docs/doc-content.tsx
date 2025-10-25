import type { DocArticle, DocSection } from "@/lib/docs"

export function DocContent({ doc }: { doc: DocArticle }) {
  return (
    <article className="prose prose-invert max-w-4xl mx-auto">
      {doc.coverImage && (
        <figure className="my-8">
          <img
            src={doc.coverImage || "/placeholder.svg"}
            alt={doc.title}
            className="rounded-lg border border-border w-full h-auto"
          />
        </figure>
      )}
      {doc.sections.map((section, idx) => (
        <SectionRenderer key={idx} section={section} />
      ))}
    </article>
  )
}

function SectionRenderer({ section }: { section: DocSection }) {
  switch (section.type) {
    case "heading": {
      const Tag = section.level === 1 ? "h1" : section.level === 2 ? "h2" : "h3"
      return (
        <Tag
          className={
            section.level === 1
              ? "text-3xl font-bold mt-8 mb-4"
              : section.level === 2
                ? "text-2xl font-semibold mt-6 mb-3"
                : "text-xl font-semibold mt-4 mb-2"
          }
        >
          {section.text}
        </Tag>
      )
    }
    case "paragraph":
      return <p className="text-base leading-relaxed mb-4 text-foreground">{section.text}</p>
    case "list":
      return (
        <ul className="list-disc list-inside space-y-2 mb-4 text-foreground">
          {section.items.map((item, i) => (
            <li key={i} className="text-base">
              {item}
            </li>
          ))}
        </ul>
      )
    case "image":
      return (
        <figure className="my-6">
          <img
            src={section.src || "/placeholder.svg?height=500&width=800&query=trading diagram"}
            alt={section.alt}
            width={section.width || 800}
            height={section.height || 500}
            className="rounded-lg border border-border w-full h-auto"
          />
          {section.caption ? (
            <figcaption className="text-sm text-muted-foreground mt-3 text-center italic">{section.caption}</figcaption>
          ) : null}
        </figure>
      )
    case "code":
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 border border-border">
          <code className="text-sm text-foreground font-mono">{section.content}</code>
        </pre>
      )
    case "table":
      return (
        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse border border-border">
            <thead>
              <tr className="bg-muted">
                {section.headers.map((header, i) => (
                  <th key={i} className="border border-border px-4 py-2 text-left font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                  {row.map((cell, j) => (
                    <td key={j} className="border border-border px-4 py-2 text-sm">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}
