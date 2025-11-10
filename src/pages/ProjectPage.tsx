import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Home, ChevronLeft, ChevronRight } from 'lucide-react'
import projects from '../data/projects'

type DescriptionBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; heading: string; items: string[] }

function ProjectDescription({ description }: { description?: string | null }) {
  // Memoize parsing so the hook is always called in the same order
  const blocks = useMemo((): DescriptionBlock[] => {
    if (!description || typeof description !== 'string') return []

    // Split sentences by ., ? or ! followed by whitespace. Keep abbreviations/simple cases intact.
    const sentences = description
      .split(/(?<=[.?!])\s+/)
      .map((s) => s.trim())
      .filter(Boolean)

    const result: DescriptionBlock[] = []

    for (const s of sentences) {
      if (s.includes('>')) {
        const parts = s.split('>').map((p) => p.trim()).filter(Boolean)

        if (s.startsWith('>')) {
          const last = result[result.length - 1]
          if (last && last.type === 'list') {
            last.items.push(...parts)
          } else {
            result.push({ type: 'list', heading: '', items: parts })
          }
        } else {
          if (parts.length >= 2) {
            const heading = parts.shift() || ''
            result.push({ type: 'list', heading, items: parts })
          } else {
            result.push({ type: 'paragraph', text: s })
          }
        }
      } else {
        result.push({ type: 'paragraph', text: s })
      }
    }

    return result
  }, [description])

  if (blocks.length === 0) return null

  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'paragraph') {
          return (
            <p key={`p-${i}`} className="text-lg sm:text-xl font-light mb-4 last:mb-0">
              {b.text}
            </p>
          )
        }

        return (
          <div key={`l-${i}`} className="mb-4">
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

  // Índice e navegação entre projetos (anterior/próximo)
  const currentIndex = projects.findIndex((p) => p.id === project.id)
  // Navegação circular: se não houver anterior/próximo, volta para o último/primeiro respectivamente
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1]
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0]

  return (
    <main className="max-w-400 mx-auto p-5 mt-16 text-primary space-y-4">

      <div className="rounded-xl bg-foreground p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Icone de home */}
          <Link to="/projetos" aria-label="Ir para projetos" className="p-2 rounded-md hover:bg-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary">
            <Home size={20} aria-hidden />
          </Link>
        </div>

        <p className="flex-1 text-center font-medium text-2xl font-title">Projeto {project.id.padStart(2, '0')}</p>

        <div className="flex items-center space-x-2">
          {/* Anterior */}
          {prevProject ? (
            <Link to={`/projetos/${prevProject.id}`} aria-label={`Projeto anterior ${prevProject.title ?? prevProject.id}`} className="p-2 rounded-md hover:bg-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary">
              <ChevronLeft size={18} aria-hidden />
            </Link>
          ) : (
            <button disabled className="p-2 rounded-md opacity-40 cursor-not-allowed" aria-hidden>
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Próximo */}
          {nextProject ? (
            <Link to={`/projetos/${nextProject.id}`} aria-label={`Próximo projeto ${nextProject.title ?? nextProject.id}`} className="p-2 rounded-md hover:bg-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary">
              <ChevronRight size={18} aria-hidden />
            </Link>
          ) : (
            <button disabled className="p-2 rounded-md opacity-40 cursor-not-allowed" aria-hidden>
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-stretch justify-center space-x-4">
        {typeof project.src === 'string' ? (
          <img
            src={project.src}
            alt={altText}
            className="w-full h-auto object-contain max-w-180"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div role="img" aria-label={altText} className="p-6 max-w-180 w-full bg-foreground rounded-xl">
            {project.src}
          </div>
        )}

        <div className='space-y-4 flex items-stretch flex-col'>
          <div className="bg-foreground rounded-xl p-4 sm:p-6 space-y-3">
            <h2 id="about-heading" className="font-title text-2xl sm:text-3xl">
              {project.title}
            </h2>

            {/* Renderiza a descrição em parágrafos e listas (não altera aparência) */}
            <ProjectDescription description={project.description ?? undefined} />
          </div>
          {Array.isArray(project.content?.['Paleta de cores']) && (
            <div className='bg-foreground rounded-xl flex-1 pb-4 sm:pb-6 flex items-stretch flex-col'>
              <h2 id="palette-heading" className="font-title text-2xl sm:text-3xl p-4 sm:p-6">
                Paleta de cores
              </h2>

              <div className='flex items-stretch justify-center flex-1'>
                {project.content?.['Paleta de cores'].map((color, index) => (
                  <div key={index} className='w-full h-full flex items-end' style={{ backgroundColor: color }} title={color}>
                    <p>{color}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
