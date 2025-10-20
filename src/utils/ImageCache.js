// utils/ImageCache.js
import { Image } from 'react-native';

class ImageCache {
  constructor() {
    this.cache = new Map();
    this.preloaded = false;
    this.preloadPromise = null;
  }

  async preloadAllImages(drops) {
    // Return existing promise if preload is already in progress
    if (this.preloadPromise) {
      return this.preloadPromise;
    }

    if (this.preloaded) return Promise.resolve();

    console.log('Preloading all case images...');
    
    this.preloadPromise = new Promise(async (resolve) => {
      const preloadPromises = drops.map(async (drop) => {
        const cacheKey = typeof drop.imageSrc === 'number' ? 
          Image.resolveAssetSource(drop.imageSrc).uri : 
          drop.imageSrc;

        if (this.cache.has(cacheKey)) return;

        try {
          if (typeof drop.imageSrc === 'number') {
            // Local asset - prefetch resolved URI
            const asset = Image.resolveAssetSource(drop.imageSrc);
            await Image.prefetch(asset.uri);
            this.cache.set(cacheKey, {
              source: drop.imageSrc,
              loaded: true,
              timestamp: Date.now()
            });
          } else {
            // Remote URI
            await Image.prefetch(drop.imageSrc);
            this.cache.set(cacheKey, {
              source: { uri: drop.imageSrc },
              loaded: true,
              timestamp: Date.now()
            });
          }
        } catch (error) {
          console.warn(`Failed to preload image: ${drop.name}`, error);
          this.cache.set(cacheKey, {
            source: drop.imageSrc,
            loaded: false,
            timestamp: Date.now()
          });
        }
      });

      await Promise.allSettled(preloadPromises);
      this.preloaded = true;
      console.log('Image preloading completed');
      resolve();
    });

    return this.preloadPromise;
  }

  getImageSource(imageSrc) {
    const cacheKey = typeof imageSrc === 'number' ? 
      Image.resolveAssetSource(imageSrc).uri : 
      imageSrc;
    
    return this.cache.get(cacheKey)?.source || imageSrc;
  }

  isImageLoaded(imageSrc) {
    const cacheKey = typeof imageSrc === 'number' ? 
      Image.resolveAssetSource(imageSrc).uri : 
      imageSrc;
    
    return this.cache.get(cacheKey)?.loaded || false;
  }

  clearOldCache(maxAge = 24 * 60 * 60 * 1000) {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > maxAge) {
        this.cache.delete(key);
      }
    }
  }

  clearCache() {
    this.cache.clear();
    this.preloaded = false;
    this.preloadPromise = null;
  }
}

// Global instance
const imageCache = new ImageCache();
export default imageCache;