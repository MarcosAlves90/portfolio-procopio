const CLOUDINARY_CONFIG = {
  cloud_name: "dfuzu0ds1",
  base_url: "https://res.cloudinary.com/dfuzu0ds1/image/upload",
  default_transformations: {
    q: "auto:good",
    f: "auto",
    dpr: "auto",
    c: "limit",
    fl: "progressive",
  },
} as const;

export type ImageSize = "thumbnail" | "small" | "medium" | "large" | "full";
export type CloudinaryTransformations = Record<string, string | number>;

interface ImageConfig {
  publicId: string;
  transformations?: CloudinaryTransformations;
  size?: ImageSize;
}

interface ResponsiveImageUrls {
  src: string;
  srcSet: string;
  placeholderSrc: string;
  sizes: string;
}

const SIZE_PRESETS: Record<ImageSize, CloudinaryTransformations> = {
  thumbnail: { w: 300, q: "auto:low" },
  small: { w: 640, q: "auto:good" },
  medium: { w: 1024, q: "auto:good" },
  large: { w: 1920, q: "auto:best" },
  full: { w: 2560, q: "auto:best" },
};

const DEFAULT_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

function buildTransformationString(
  transformations: CloudinaryTransformations,
): string {
  return Object.entries(transformations)
    .map(([key, value]) => `${key}_${value}`)
    .join(",");
}

export function buildCloudinaryUrl(
  publicId: string,
  transformations: CloudinaryTransformations = {},
): string {
  const allTransformations = {
    ...CLOUDINARY_CONFIG.default_transformations,
    ...transformations,
  };

  const transformationString = buildTransformationString(allTransformations);
  return `${CLOUDINARY_CONFIG.base_url}/${transformationString}/${publicId}`;
}

function buildSingleSizeUrl(
  publicId: string,
  size: ImageSize,
  customTransformations?: CloudinaryTransformations,
): string {
  const sizeTransformations = SIZE_PRESETS[size];
  return buildCloudinaryUrl(publicId, {
    ...sizeTransformations,
    ...customTransformations,
  });
}

function buildPlaceholderUrl(
  publicId: string,
  customTransformations?: CloudinaryTransformations,
): string {
  const { c, x, y, g, ar } = customTransformations || {};
  const cropTransforms = { c, x, y, g, ar };
  const validCropTransforms = Object.fromEntries(
    Object.entries(cropTransforms).filter(([, v]) => v !== undefined),
  );

  return buildCloudinaryUrl(publicId, {
    w: 40,
    q: "auto:low",
    e: "blur:1000",
    ...validCropTransforms,
  });
}

function buildSrcSet(
  publicId: string,
  customTransformations?: CloudinaryTransformations,
): string {
  const sizes: ImageSize[] = ["small", "medium", "large", "full"];
  const widths = [640, 1024, 1920, 2560];

  return sizes
    .map((size, index) => {
      const url = buildSingleSizeUrl(publicId, size, customTransformations);
      return `${url} ${widths[index]}w`;
    })
    .join(", ");
}

export function getResponsiveImageUrls(
  config: ImageConfig,
  customSizes?: string,
): ResponsiveImageUrls {
  const { publicId, transformations, size = "medium" } = config;

  return {
    src: buildSingleSizeUrl(publicId, size, transformations),
    srcSet: buildSrcSet(publicId, transformations),
    placeholderSrc: buildPlaceholderUrl(publicId, transformations),
    sizes: customSizes || DEFAULT_SIZES,
  };
}

export function buildSimpleImageUrl(
  publicId: string,
  size: ImageSize = "medium",
): string {
  return buildSingleSizeUrl(publicId, size);
}

export default CLOUDINARY_CONFIG;
