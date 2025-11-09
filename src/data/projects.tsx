import type { ReactNode } from 'react'
import LogoMl from '../components/atom/LogoMl'

export interface ProjectItem {
  id: string
  src: string | ReactNode
  alt?: string
  title?: string
  description?: string
}

export const projects: ProjectItem[] = [
  {
    id: '1',
    src: 'https://res.cloudinary.com/dflvo098t/image/upload/v1762545932/baby-driver-post_h1cpin.png',
    alt: 'Poster do filme Baby Driver',
    title: 'Poster Em ritmo de fuga',
    description: 'Projeto desenvolvido na disciplina de Introdução à Tipografia. Objetivo: criar um retrato tipográfico do personagem principal do filme Em Ritmo de Fuga (Baby Driver). Construção da imagem utilizando apenas frases, palavras e atributos que representam a persona do personagem. A composição explora o contraste entre cores vibrantes e a silhueta escura. Resultado: peça que une linguagem textual e identidade visual, mostrando a tipografia como forma expressiva.',
  },
  {
    id: '2',
    src: <LogoMl className="w-full h-auto text-logo" ariaLabel="Logotipo do Marcos Pilgrim" />,
    alt: 'Logotipo do Marcos Pilgrim',
    title: 'Logotipo ML',
    description: 'Logo desenvolvida para uso pessoal de um cliente. Construída a partir das iniciais do nome do cliente, no caso o M e L. Estruturada com simetria geométrica para transmitir equilíbrio, precisão e profissionalismo. Inclui estrelas de quatro pontas como referência a logos anteriores do cliente. Resultado: identidade visual que une modernidade e resgate histórico da marca pessoal do cliente.',
  },
  {
    id: '3',
    src: 'https://res.cloudinary.com/dflvo098t/image/upload/v1762546567/poster-porsche_jkhgvc.png',
    alt: 'Poster do carro Porsche 911 GT3',
    title: 'Pôster Porsche 911 GT3',
    description: 'Peça gráfica inspirada no modelo Porsche 911 GT3. A imagem do veículo foi capturada no jogo Forza Horizon 5. Todas informações utilizadas foram baseadas no site oficial da Porsche, garantindo autenticidade. A composição destaca o caráter esportivo do modelo por meio de: > Paleta de cores quase monocromática. > Equilíbrio visual. > Clareza informativa. Resultado: pôster que une simplicidade estética e valorização dos atributos do veículo.',
  },
  {
    id: '4',
    src: 'https://res.cloudinary.com/dflvo098t/image/upload/v1762546803/poster-hazard-mundo-titanico_hzk1hn.png',
    alt: 'Poster do RPG Hazard: Mundo Titânico',
    title: 'Poster Hazard Mundo Titânico',
    description: 'Pôster desenvolvido em parceria com o artista Itzo responsável pela ilustração do personagem Hazard. Projeto criado para divulgar o RPG Mundo Titânico, ainda em produção. A composição explora: > Uso expressivo da tipografia. > Forte contraste de cores para destaque visual. > Aplicação de texturas para dar identidade e diferenciação. Resultado: peça promocional que valoriza o personagem principal e fortalece a divulgação do universo do RPG.',
  },
]

export default projects
