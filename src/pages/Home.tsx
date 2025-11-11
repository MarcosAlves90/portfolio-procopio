import { useEffect } from "react";
import Hero from "@/components/organism/Hero";
import About from "@/components/organism/About";
import Strip from "@/components/molecule/Strip";
import Projects from "@/components/organism/Projects";

export default function Home() {
  useEffect(() => {
    const title = "Procópio — Designer Gráfico & UX | Portfólio";

    const description = `Procópio — designer gráfico e UX em formação. Crio identidades visuais, conteúdos para social media e projetos autorais. Portfólio com trabalhos, freelances e interesse em estágios.`;

    const ogImage =
      "https://res.cloudinary.com/dflvo098t/image/upload/c_crop,x_0,y_75,w_800,h_500/v1762373525/procopio_wp3slo.jpg";

    const keywords = [
      "design gráfico",
      "identidade visual",
      "UX",
      "UI",
      "social media",
      "branding",
      "portfólio",
      "freelance",
      "estágio",
      "projetos autorais",
      "protótipos",
      "Figma",
    ].join(", ");

    // atualiza title
    if (document && document.title !== title) document.title = title;

    // função utilitária para criar/atualizar meta tags
    const upsertMeta = (
      attrName: "name" | "property",
      attrValue: string,
      content: string,
    ) => {
      if (typeof document === "undefined") return;
      const selector = `meta[${attrName}="${attrValue}"]`;
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:image", ogImage);

    // no cleanup: queremos manter as tags enquanto o usuário navega
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Strip />
      <Projects />
    </>
  );
}
