/**
 * Image Cache Manager
 * Manages caching of images using IndexedDB with cache-first strategy
 */

const DB_NAME = "portfolio-cache";
const DB_VERSION = 1;
const STORE_NAME = "images";
const CACHE_EXPIRY_DAYS = 30;

interface CachedImage {
  url: string;
  blob: Blob;
  timestamp: number;
  expiry: number;
}

class ImageCacheManager {
  private db: IDBDatabase | null = null;
  private initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.initDB();
  }

  private async initDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "url" });
        }
      };
    });
  }

  private isExpired(expiry: number): boolean {
    return Date.now() > expiry;
  }

  async get(url: string): Promise<Blob | null> {
    await this.initPromise;
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(url);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const result = request.result as CachedImage | undefined;
        if (result && !this.isExpired(result.expiry)) {
          resolve(result.blob);
        } else if (result) {
          // Expired, delete it
          this.delete(url).catch(() => {});
          resolve(null);
        } else {
          resolve(null);
        }
      };
    });
  }

  async set(url: string, blob: Blob): Promise<void> {
    await this.initPromise;
    if (!this.db) return;

    const expiry = Date.now() + CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const cachedImage: CachedImage = {
      url,
      blob,
      timestamp: Date.now(),
      expiry,
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(cachedImage);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async delete(url: string): Promise<void> {
    await this.initPromise;
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(url);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async clear(): Promise<void> {
    await this.initPromise;
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
}

export const imageCacheManager = new ImageCacheManager();

/**
 * Fetch image with cache-first strategy
 * If cached and not expired, use cache
 * Otherwise fetch from network and cache
 */
export async function fetchImageWithCache(url: string): Promise<Blob> {
  try {
    // Try to get from cache first
    const cached = await imageCacheManager.get(url);
    if (cached) {
      return cached;
    }

    // Fetch from network
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const blob = await response.blob();

    // Cache the blob
    await imageCacheManager.set(url, blob);

    return blob;
  } catch (error) {
    console.error(`Failed to fetch image: ${url}`, error);
    throw error;
  }
}

/**
 * Create a blob URL from cached image
 * Useful for img src attribute
 */
export async function getCachedImageUrl(url: string): Promise<string> {
  const blob = await fetchImageWithCache(url);
  return URL.createObjectURL(blob);
}
