import Logo from "@/components/atom/Logo";
import { Mail, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  // TODO: Melhorar responsividade aumentando o tamanho do grid

  return (
    <footer
      id="contato"
      role="contentinfo"
      aria-label="Rodapé"
      className="bg-accent grid grid-cols-6 h-52.5 overflow-y-hidden relative"
    >
      <div
        aria-hidden="true"
        className="flex items-center overflow-hidden absolute left-0 top-0 bottom-0 max-sm:right-0 h-52.5 pointer-events-none"
      >
        <Logo
          className="h-90 w-full sm:w-lg text-accent-tint"
          ariaLabel="Logo"
        />
      </div>

      <div className="z-2 col-span-6 flex w-full flex-col items-center justify-center gap-2 px-4 font-title text-white sm:col-span-2 sm:col-start-5 lg:col-span-3 lg:col-start-4">
        <h2 className="font-title text-xl lg:hidden">Entre em contato</h2>

        <nav aria-label="Redes sociais">
          <ul className="flex items-center justify-center space-x-11 lg:space-x-18">
            <li>
              <a
                href="mailto:4rc4nejvp@gmail.com"
                aria-label="Enviar email"
                className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent-muted rounded"
              >
                <Mail
                  className="w-6 h-6 text-accent-muted"
                  aria-hidden="true"
                />
                <span className="text-lg font-medium max-lg:hidden">Email</span>
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/jo%C3%A3o-victor-proc%C3%B3pio-dos-santos-540095294"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent-muted rounded"
              >
                <Linkedin
                  className="w-6 h-6 text-accent-muted"
                  aria-hidden="true"
                />
                <span className="text-lg font-medium max-lg:hidden">
                  LinkedIn
                </span>
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/arcane_jvp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent-muted rounded"
              >
                <Instagram
                  className="w-6 h-6 text-accent-muted"
                  aria-hidden="true"
                />
                <span className="text-lg font-medium max-lg:hidden">
                  Instagram
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
