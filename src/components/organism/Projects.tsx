import MasonryGallery from '../molecule/MasonryGallery';
import LogoMl from '../atom/LogoMl';

export default function Projects() {
    const projects = [
        {
            id: '1',
            src: 'https://res.cloudinary.com/dflvo098t/image/upload/v1762545932/baby-driver-post_h1cpin.png',
            alt: 'Poster do filme Baby Driver',
        },
        {
            id: '2',
            src: <LogoMl className="w-full h-auto text-logo" ariaLabel="Logotipo do Marcos Pilgrim" />,
            alt: 'Logotipo do Marcos Pilgrim',
        },
        {
            id: '3',
            src: 'https://res.cloudinary.com/dflvo098t/image/upload/v1762546567/poster-porsche_jkhgvc.png',
            alt: 'Poster do carro Porsche 911 GT3',
        },
        {
            id: '4',
            src: 'https://res.cloudinary.com/dflvo098t/image/upload/v1762546803/poster-hazard-mundo-titanico_hzk1hn.png',
            alt: 'Poster do RPG Hazard: Mundo Titânico',
        },
        
    ];

    return (
        <section id="projects" className="max-w-400 w-full mx-auto px-5 mb-10">
            <div className="bg-foreground text-primary rounded-xl w-full p-4 sm:p-6">
                <h2 id="projects-heading" className="font-title text-2xl sm:text-3xl mb-6">
                    Alguns projetos
                </h2>
                <MasonryGallery images={projects} />
            </div>
        </section>
    )
}
