import { useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import projects from "@/data/projects";
import ProjectDescription from "@/components/molecule/ProjectDescription";
import ColorPalette from "@/components/molecule/ColorPalette";
import ProjectHeader from "@/components/organism/ProjectHeader";
import CachedImage from "@/components/atom/CachedImage";

export default function ProjectPage() {
  const { id } = useParams<{ id?: string }>();

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  const project = useMemo(() => projects.find((p) => p.id === id), [id]);

  if (!project) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Projeto não encontrado</h1>
        <p className="mb-4">
          Não foi possível localizar o projeto com ID “{id}”.
        </p>
        <Link to="/projetos" className="text-primary underline">
          Voltar para projetos
        </Link>
      </main>
    );
  }

  const altText = project.alt ?? project.title ?? "Projeto";

  // Índice e navegação entre projetos (anterior/próximo)
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  // Navegação circular: se não houver anterior/próximo, volta para o último/primeiro respectivamente
  const prevProject =
    currentIndex > 0
      ? projects[currentIndex - 1]
      : projects[projects.length - 1];
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : projects[0];

  return (
    <main className="max-w-400 min-h-[calc(100vh-4rem)] mx-auto p-5 mt-16 text-primary space-y-4">
      <ProjectHeader
        projectId={project.id}
        prevProject={prevProject}
        nextProject={nextProject}
      />

      <div className="flex items-stretch justify-center max-lg:space-y-4 lg:space-x-4 max-lg:flex-col">
        {typeof project.src === "string" ? (
          <CachedImage
            src={project.src}
            srcSet={project.srcSet}
            placeholderSrc={project.placeholderSrc}
            sizes={project.sizes}
            alt={altText}
            objectFit="contain"
            containerClassName="lg:max-w-180"
          />
        ) : (
          <div
            role="img"
            aria-label={altText}
            className="p-6 lg:max-w-180 w-full bg-foreground rounded-xl"
          >
            {project.src}
          </div>
        )}

        <div className="space-y-4 flex items-stretch flex-col">
          <div className="bg-foreground rounded-xl p-4 xl:p-6 space-y-3">
            <h2 id="about-heading" className="font-title text-2xl xl:text-3xl">
              {project.title}
            </h2>

            {/* Renderiza a descrição em parágrafos e listas (não altera aparência) */}
            <ProjectDescription
              description={project.description ?? undefined}
            />
          </div>
          <ColorPalette
            colors={project.content?.palette as string[] | undefined}
          />
        </div>
      </div>
    </main>
  );
}
