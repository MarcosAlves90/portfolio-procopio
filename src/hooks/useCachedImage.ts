import { useEffect, useState, useRef } from "react";
import { fetchImageWithCache } from "@/utils/imageCache";

interface UseCachedImageResult {
  blobUrl: string | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch and cache images from Cloudinary
 * Returns a blob URL that can be used directly in img src
 * Properly manages Object URLs to prevent memory leaks
 */
export function useCachedImage(imageUrl: string): UseCachedImageResult {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const abortController = new AbortController();

    (async () => {
      try {
        setIsLoading(true);
        setError(null);

        // For string URLs (already built Cloudinary URLs), use cache
        if (typeof imageUrl === "string") {
          const blob = await fetchImageWithCache(imageUrl);

          if (isMounted) {
            // Revoke old Object URL to prevent memory leaks
            if (objectUrlRef.current) {
              URL.revokeObjectURL(objectUrlRef.current);
            }

            // Create new Object URL from cached blob
            const url = URL.createObjectURL(blob);
            objectUrlRef.current = url;
            setBlobUrl(url);
          }
        }
      } catch (err) {
        if (isMounted && !abortController.signal.aborted) {
          setError(
            err instanceof Error ? err : new Error("Failed to load image"),
          );
          // Fallback to original URL on error
          setBlobUrl(imageUrl);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
      abortController.abort();
      // Cleanup: revoke Object URL when component unmounts
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [imageUrl]);

  return {
    blobUrl: blobUrl || imageUrl || null,
    isLoading,
    error,
  };
}
