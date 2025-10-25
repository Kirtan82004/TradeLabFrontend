import { DocList } from "@/components/docs/doc-list"

export default function DocsPage() {
  return (
    <main className="p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-pretty">TradeLab Documentation</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Trading se related har topic ke bare me deep explanations with diagrams and images.
        </p>
      </header>
      <DocList />
    </main>
  )
}
