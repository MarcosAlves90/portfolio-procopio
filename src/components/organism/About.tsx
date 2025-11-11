import { buildCloudinaryUrl } from '@/utils/cloudinary'

export default function About() {
    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="mx-auto text-primary max-w-400 px-5 mt-10 space-y-4"
        >
            <div className="flex max-md:items-center max-md:justify-center flex-col md:grid grid-cols-8 gap-4">
                <div className="w-full bg-foreground rounded-xl p-4 sm:p-6 space-y-3 col-span-6">
                    <h2 id="about-heading" className="font-title text-2xl sm:text-3xl">
                        Quem sou?
                    </h2>
                    <p className="text-lg sm:text-xl font-light">
                        Olá, sou Procópio, tenho 20 anos e estou em desenvolvimento como designer. Atualmente curso o 4°
                        semestre do bacharelado em Design, onde venho criando projetos autorais e buscando oportunidades
                        em freelances. No momento, meu foco é ampliar meu portfólio e conquistar uma vaga de estágio em um
                        estúdio de design, para evoluir profissionalmente e viabilizar meus estudos. Como designer, meu
                        objetivo é desenvolver projetos que transmitam de forma clara e criativa a mensagem dos meus
                        clientes para o público-alvo.
                    </p>
                </div>
                <figure className="w-full h-full overflow-hidden rounded-xl col-span-2">
                    <img
                        src={buildCloudinaryUrl('Copio_kphmvi.jpg', { c: 'crop', x: '0', y: '75', w: '800', h: '500' })}
                        alt="Retrato de Procópio sorrindo"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    <figcaption className="sr-only">Foto de Procópio</figcaption>
                </figure>
            </div>

            <div className="flex max-lg:items-center max-lg:justify-center flex-col-reverse lg:grid grid-cols-8 gap-4">
                <figure className="w-full h-full overflow-hidden rounded-xl col-span-4">
                    <img
                        src={buildCloudinaryUrl('Card_notebook_y0zksg.png')}
                        alt="Exemplo de projeto do portfólio"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    <figcaption className="sr-only">Imagem ilustrativa de projetos</figcaption>
                </figure>

                <div className="w-full bg-foreground rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-6 col-span-4">
                    <h2 className="font-title text-2xl sm:text-3xl">Quais serviços eu posso oferecer?</h2>

                    <dl className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-2">
                        <dt className="font-title text-xl sm:text-2xl col-span-1 text-start w-full">Design gráfico</dt>
                        <dd className="text-lg sm:text-xl col-span-3">
                            Planejamento, desenvolvimento e execução de estratégias para aumentar a produtividade em
                            redes sociais, incluindo criação de posts e artes para campanhas.
                        </dd>

                        <dt className="font-title text-xl sm:text-2xl col-span-1 text-start w-full">Social mídia</dt>
                        <dd className="text-lg sm:text-xl col-span-3">
                            Gestão e criação de peças gráficas com foco em transmitir a mensagem do cliente da forma mais
                            clara e eficaz possível.
                        </dd>

                        <dt className="font-title text-xl sm:text-2xl col-span-1 text-start w-full">UX Design</dt>
                        <dd className="text-lg sm:text-xl col-span-3">
                            Planejamento e criação de protótipos para sites e aplicativos, com foco em aproximar marcas e
                            público por meio de experiências intuitivas.
                        </dd>
                    </dl>
                </div>
            </div>

            <div className="flex max-lg:items-center max-lg:justify-center flex-col lg:grid grid-cols-9 gap-4">
                <div className="w-full bg-foreground rounded-xl p-4 sm:p-6 space-y-3 col-span-6">
                    <h2 className="font-title text-2xl sm:text-3xl">Formações</h2>

                    <div className="flex items-center justify-between w-full text-lg sm:text-xl max-md:flex-col">
                        <span className="max-md:self-start">ETEC MCM — Técnico de T.I. para Internet</span>
                        <span
                            className="flex-1 mx-2 mt-2.5 border-b-2 border-dotted border-primary max-md:hidden"
                            aria-hidden="true"
                        />
                        <time className="max-md:self-start" dateTime="2020-2023">
                            2020 - 2023 — Concluído
                        </time>
                    </div>

                    <div className="flex items-center justify-between w-full text-lg sm:text-xl max-md:flex-col">
                        <span className="max-md:self-start">FIAM FAAM — Bacharelado em Design</span>
                        <span
                            className="flex-1 mx-2 mt-2.5 border-b-2 border-dotted border-primary max-md:hidden"
                            aria-hidden="true"
                        />
                        <time className="max-md:self-start" dateTime="2024-2027">
                            2024 - 2027 — Em andamento
                        </time>
                    </div>
                </div>

                <figure className="w-full h-full overflow-hidden rounded-xl col-span-3 bg-foreground">
                    <img
                        src={buildCloudinaryUrl('Card_adesivo_fl7jei.png')}
                        alt="Amostra de adesivos e artes"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                    />
                    <figcaption className="sr-only">Amostra de adesivos criados</figcaption>
                </figure>
            </div>
        </section>
    );
}
