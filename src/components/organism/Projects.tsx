import MasonryGallery from "@/components/molecule/MasonryGallery";
import projects from "@/data/projects.tsx";

export default function Projects() {
  return (
    <section id="projetos" className="max-w-400 w-full mx-auto px-5 mb-10">
      <div className="bg-foreground text-primary rounded-xl w-full p-4 sm:p-6">
        <h2
          id="projects-heading"
          className="font-title text-2xl sm:text-3xl mb-6"
        >
          Alguns projetos
        </h2>
        <MasonryGallery images={projects} />
      </div>
    </section>
  );
}
