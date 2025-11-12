/* eslint-disable */
// @ts-nocheck
/**
 * Exemplos de uso do sistema de otimização de imagens Cloudinary
 * 
 * Este arquivo demonstra as melhores práticas para usar o sistema de imagens
 * otimizadas do portfolio.
 */

import { getResponsiveImageUrls, buildSimpleImageUrl, buildCloudinaryUrl } from './cloudinary';

// ============================================================================
// EXEMPLO 1: Imagem responsiva completa (RECOMENDADO)
// ============================================================================
// Use quando precisar de imagens otimizadas com placeholder e múltiplas resoluções

const responsiveImage = getResponsiveImageUrls({
  publicId: "my-image.jpg",
  size: "medium", // thumbnail | small | medium | large | full
});

// Uso no componente:
// <CachedImage
//   {...responsiveImage}
//   alt="Descrição da imagem"
//   containerClassName="w-full h-full"
// />

// ============================================================================
// EXEMPLO 2: Imagem com transformações customizadas (crop, filtros, etc)
// ============================================================================

const croppedImage = getResponsiveImageUrls({
  publicId: "profile.jpg",
  size: "medium",
  transformations: {
    c: "crop",           // Tipo de crop
    x: "0",              // Posição X
    y: "75",             // Posição Y
    w: "800",            // Largura
    h: "500",            // Altura
    g: "face",           // Gravity (opcional): face, center, auto, etc
  },
});

// ============================================================================
// EXEMPLO 3: Imagem com sizes customizados (para layouts específicos)
// ============================================================================

const heroImage = getResponsiveImageUrls(
  {
    publicId: "hero-banner.jpg",
    size: "full",
  },
  "(max-width: 768px) 100vw, (max-width: 1440px) 80vw, 1200px"
);

// ============================================================================
// EXEMPLO 4: Imagem simples (sem placeholder ou srcSet)
// ============================================================================
// Use quando não precisar de otimizações avançadas

const simpleUrl = buildSimpleImageUrl("logo.png", "small");

// Uso direto:
// <img src={simpleUrl} alt="Logo" />

// ============================================================================
// EXEMPLO 5: URL customizada com transformações específicas
// ============================================================================
// Use quando precisar de controle total sobre a URL

const customUrl = buildCloudinaryUrl("special-image.jpg", {
  q: "auto:best",      // Qualidade
  f: "auto",           // Formato automático
  w: 500,              // Largura fixa
  h: 300,              // Altura fixa
  c: "fill",           // Modo de crop: fill, fit, scale, crop, etc
  g: "center",         // Gravity
  e: "grayscale",      // Efeito: grayscale, blur, sharpen, etc
});

// ============================================================================
// TRANSFORMAÇÕES CLOUDINARY COMUNS
// ============================================================================

// Crop modes (c):
// - "limit": redimensiona sem exceder dimensões
// - "fit": ajusta dentro das dimensões
// - "fill": preenche as dimensões (pode cortar)
// - "crop": corta para as dimensões exatas
// - "scale": escala para as dimensões exatas

// Gravity (g) - onde focar ao cortar:
// - "auto": detecção automática
// - "face": foca em rostos
// - "center": centro da imagem
// - "north", "south", "east", "west": direções
// - "north_east", "north_west", etc: cantos

// Qualidade (q):
// - "auto:low": qualidade baixa
// - "auto:good": qualidade boa (padrão)
// - "auto:best": melhor qualidade
// - "auto:eco": mais econômico

// Efeitos comuns (e):
// - "blur:300": desfoque
// - "grayscale": preto e branco
// - "sharpen": nitidez
// - "brightness:50": brilho
// - "contrast:20": contraste

// ============================================================================
// BOAS PRÁTICAS
// ============================================================================

// 1. Use getResponsiveImageUrls() para imagens de conteúdo
// 2. Sempre forneça um alt text descritivo
// 3. Use sizes adequados ao layout da imagem
// 4. Para imagens acima do fold, use loading="eager"
// 5. Para ícones/logos pequenos, use buildSimpleImageUrl()
// 6. Teste as imagens em diferentes resoluções e velocidades de conexão

export {};
