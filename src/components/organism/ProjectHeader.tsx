import { Link } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";

type ProjectRef = { id: string; title?: string | null };

export default function ProjectHeader({
  projectId,
  prevProject,
  nextProject,
}: {
  projectId: string;
  prevProject?: ProjectRef | null;
  nextProject?: ProjectRef | null;
}) {
  return (
    <div className="rounded-xl bg-foreground p-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Link
          to="/"
          aria-label="Ir para projetos"
          className="p-2 rounded-md hover:bg-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <Home size={20} aria-hidden />
        </Link>
      </div>

      <p className="flex-1 text-center text-2xl xl:text-3xl font-title">
        Projeto {projectId.padStart(2, "0")}
      </p>

      <div className="flex items-center space-x-2">
        {prevProject ? (
          <Link
            to={`/projetos/${prevProject.id}`}
            aria-label={`Projeto anterior ${prevProject.title ?? prevProject.id}`}
            className="p-2 rounded-md hover:bg-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ChevronLeft size={18} aria-hidden />
          </Link>
        ) : (
          <button
            disabled
            className="p-2 rounded-md opacity-40 cursor-not-allowed"
            aria-hidden
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {nextProject ? (
          <Link
            to={`/projetos/${nextProject.id}`}
            aria-label={`Próximo projeto ${nextProject.title ?? nextProject.id}`}
            className="p-2 rounded-md hover:bg-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <ChevronRight size={18} aria-hidden />
          </Link>
        ) : (
          <button
            disabled
            className="p-2 rounded-md opacity-40 cursor-not-allowed"
            aria-hidden
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
