import type { ImgHTMLAttributes, CSSProperties } from "react";
import { useState } from "react";
import { useCachedImage } from "@/hooks/useCachedImage";

interface CachedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'style'> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  srcSet?: string;
  sizes?: string;
  objectFit?: CSSProperties['objectFit'];
  aspectRatio?: string;
  containerClassName?: string;
  containerStyle?: CSSProperties;
}

export default function CachedImage({
  src,
  alt,
  placeholderSrc,
  srcSet,
  sizes,
  loading = "lazy",
  decoding = "async",
  objectFit = "cover",
  aspectRatio,
  className = "",
  containerClassName = "",
  containerStyle,
  ...props
}: CachedImageProps) {
  const { blobUrl, isLoading, error } = useCachedImage(src);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (error) {
    console.warn(`Failed to load image: ${src}`, error);
  }

  const showPlaceholder = placeholderSrc && (isLoading || !imageLoaded);

  const baseContainerStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    ...(aspectRatio && { aspectRatio }),
    ...containerStyle,
  };

  const placeholderStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(20px)",
    transform: "scale(1.1)",
    transition: "opacity 0.3s ease-out",
    opacity: imageLoaded ? 0 : 1,
    pointerEvents: "none",
  };

  const imageStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit,
    transition: "opacity 0.3s ease-in",
    opacity: imageLoaded ? 1 : 0,
  };

  return (
    <div className={containerClassName} style={baseContainerStyle}>
      {showPlaceholder && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          style={placeholderStyle}
        />
      )}
      <img
        src={blobUrl || src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setImageLoaded(true)}
        className={className}
        style={imageStyle}
        {...props}
      />
    </div>
  );
}
