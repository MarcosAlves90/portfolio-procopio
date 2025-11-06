export default function About() {
    return (
        <div className="mx-auto text-primary max-w-400 px-5 my-10 space-y-4">
            <div className="flex max-md:items-center max-md:justify-center flex-col md:grid grid-cols-8 gap-4">
                <div className="w-full bg-foreground rounded-xl p-4 sm:p-6 space-y-3 col-span-6">
                    <h2 className="font-title text-3xl">Quem sou?</h2>
                    {/* Usar versão fina da fonte */}
                    <p className="text-xl">Olá, sou Procópio, tenho 19 anos e estou em desenvolvimento como designer. Atualmente curso o 4° semestre do bacharelado em Design, onde venho criando projetos autorais e buscando oportunidades em freelances. No momento, meu foco é ampliar meu portfólio e conquistar uma vaga de estágio em um estúdio de design, para evoluir profissionalmente e viabilizar meus estudos. Como designer, meu objetivo é desenvolver projetos que transmitam de forma clara e criativa a mensagem dos meus clientes para o público-alvo.</p>
                </div>
                <div className="w-full h-full overflow-hidden rounded-xl col-span-2">
                    <img
                        src="https://res.cloudinary.com/dflvo098t/image/upload/c_crop,x_0,y_75,w_800,h_500/v1762373525/procopio_wp3slo.jpg"
                        alt="Procópio"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            <div className="flex max-lg:items-center max-lg:justify-center flex-col-reverse lg:grid grid-cols-8 gap-4">
                <div className="w-full h-full overflow-hidden rounded-xl col-span-4">
                    <img
                        src="https://res.cloudinary.com/dflvo098t/image/upload/v1762383773/projects-image_nnxxkj.png"
                        alt="Procópio"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full bg-foreground rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-6 col-span-4">
                    <h2 className="font-title text-3xl">Quais serviços eu posso oferecer?</h2>
                    <div className="flex items-start flex-col sm:grid grid-cols-4 gap-3 sm:gap-2">
                        <h3 className="font-title text-2xl col-span-1 text-start w-full">Design gráfico:</h3>
                        <p className="text-xl col-span-3">Planejamento, desenvolvimento e execução de estratégias para aumentar a produtividade em redes sociais, incluindo a criação de posts.</p>
                    </div>
                    <div className="flex items-start flex-col sm:grid grid-cols-4 gap-3 sm:gap-2">
                        <h3 className="font-title text-2xl col-span-1 text-start w-full">Social mídia:</h3>
                        <p className="text-xl col-span-3">Desenvolvimento de peças gráficas com foco em transmitir a mensagem do cliente da forma mais clara e eficaz possível.</p>
                    </div>
                    <div className="flex items-start flex-col sm:grid grid-cols-4 gap-3 sm:gap-2">
                        <h3 className="font-title text-2xl col-span-1 text-start w-full">Ux Design:</h3>
                        <p className="text-xl col-span-3">Planejamento e criação de protótipos para sites e aplicativos, com foco em aproximar marcas e público.</p>
                    </div>
                </div>
            </div>
            <div className="flex max-lg:items-center max-lg:justify-center flex-col lg:grid grid-cols-9 gap-4">
                <div className="w-full bg-foreground rounded-xl p-4 sm:p-6 space-y-3 col-span-6">
                    <h2 className="font-title text-3xl">Formações</h2>
                    <div className="flex items-center justify-between w-full text-xl max-md:flex-col">
                        <span className="whitespace-nowrap max-md:self-start">ETEC MCM Técnico de T.I para internet</span>
                        <span className="flex-1 mx-2 mt-2.5 border-b-2 border-dotted border-primary max-md:hidden" aria-hidden="true"></span>
                        <span className="whitespace-nowrap max-md:self-start">2020 - 2023 Concluído</span>
                    </div>
                    <div className="flex items-center justify-between w-full text-xl max-md:flex-col">
                        <span className="whitespace-nowrap max-md:self-start">FIAM FAAM Bacharelado em Design:</span>
                        <span className="flex-1 mx-2 mt-2.5 border-b-2 border-dotted border-primary max-md:hidden" aria-hidden="true"></span>
                        <span className="whitespace-nowrap max-md:self-start">2024 - 2027 Em andamento</span>
                    </div>
                </div>
                <div className="w-full h-full overflow-hidden rounded-xl col-span-3 bg-foreground">
                    <img
                        src="https://res.cloudinary.com/dflvo098t/image/upload/v1762461811/adesivos_ljuxek.png"
                        alt="Procópio"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}
