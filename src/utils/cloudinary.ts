const CLOUDINARY_CONFIG = {
  cloud_name: "dfuzu0ds1",
  base_url: "https://res.cloudinary.com/dfuzu0ds1/image/upload",
  default_transformations: {
    q: "auto",
    f: "auto",
    // Add caching directives
    dpr: "auto",
    // Use CDN caching with long expiration
  },
};

export function buildCloudinaryUrl(
  publicId: string,
  transformations?: Record<string, string | number>,
): string {
  const allTransformations = {
    ...CLOUDINARY_CONFIG.default_transformations,
    ...transformations,
  };

  const transformationString = Object.entries(allTransformations)
    .map(([key, value]) => `${key}_${value}`)
    .join(",");

  return `${CLOUDINARY_CONFIG.base_url}/${transformationString}/${publicId}`;
}

export default CLOUDINARY_CONFIG;
