import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import projects from '../data/projects'

type DescriptionBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; heading: string; items: string[] }

function ProjectDescription({ description }: { description?: string | null }) {
  if (!description || typeof description !== 'string') return null

  // Split sentences by ., ? or ! followed by whitespace. Keep abbreviations/simple cases intact.
  const sentences = description
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const blocks: DescriptionBlock[] = []

  for (const s of sentences) {
    if (s.includes('>')) {
      const parts = s.split('>').map((p) => p.trim()).filter(Boolean)

      if (s.startsWith('>')) {
        const last = blocks[blocks.length - 1]
        if (last && last.type === 'list') {
          last.items.push(...parts)
        } else {
          blocks.push({ type: 'list', heading: '', items: parts })
        }
      } else {
        if (parts.length >= 2) {
          const heading = parts.shift() || ''
          blocks.push({ type: 'list', heading, items: parts })
        } else {
          blocks.push({ type: 'paragraph', text: s })
        }
      }
    } else {
      blocks.push({ type: 'paragraph', text: s })
    }
  }

  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'paragraph') {
          return (
            <p key={i} className="text-lg sm:text-xl font-light mb-4">
              {b.text}
            </p>
          )
        }

        return (
          <div key={i} className="mb-4">
            {b.heading && (
              <p className="text-lg sm:text-xl font-light mb-4">{b.heading}</p>
            )}
            {b.items.length > 0 && (
              <ul className="list-disc ml-6 space-y-1">
                {b.items.map((item, idx) => (
                  <li key={idx} className="text-lg sm:text-xl font-light">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </>
  )
}

export default function ProjectPage() {
  const { id } = useParams<{ id?: string }>()

  const project = useMemo(() => projects.find((p) => p.id === id), [id])

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Projeto não encontrado</h1>
        <p className="mb-4">Não foi possível localizar o projeto com ID “{id}”.</p>
        <Link to="/projetos" className="text-primary underline">
          Voltar para projetos
        </Link>
      </main>
    )
  }

  const altText = project.alt ?? project.title ?? 'Projeto'

  return (
    <main className="max-w-400 mx-auto p-5 mt-16 text-primary">
      <div className="flex items-start justify-center space-x-5">
        {typeof project.src === 'string' ? (
          <img src={project.src} alt={altText} className="w-full h-auto object-contain max-w-180" />
        ) : (
          <div role={project.alt ? 'img' : undefined} aria-label={altText} className="p-6 max-w-180 w-full bg-foreground rounded-xl">
            {project.src}
          </div>
        )}

        <div className="bg-foreground rounded-xl p-4 sm:p-6 space-y-3 col-span-6">
          <h2 id="about-heading" className="font-title text-2xl sm:text-3xl">
            {project.title}
          </h2>

          {/* Renderiza a descrição em parágrafos e listas (não altera aparência) */}
          <ProjectDescription description={project.description ?? undefined} />
        </div>
      </div>
    </main>
  )
}
