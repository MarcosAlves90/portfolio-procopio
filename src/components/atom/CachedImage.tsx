import type { ImgHTMLAttributes } from "react";
import { useCachedImage } from "@/hooks/useCachedImage";

interface CachedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/**
 * Image component with automatic caching via IndexedDB
 * Wraps useCachedImage hook for convenient usage
 */
export default function CachedImage({
  src,
  alt,
  loading = "lazy",
  decoding = "async",
  ...props
}: CachedImageProps) {
  const { blobUrl, error } = useCachedImage(src);

  if (error) {
    console.warn(`Failed to load cached image: ${src}`, error);
  }

  return (
    <img
      src={blobUrl || src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}
