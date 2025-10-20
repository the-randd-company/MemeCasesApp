// AppImagePreloader.js
import { useEffect } from 'react';
import drops from '../configs/DropsConfig';
import imageCache from './ImageCache';

export const useAppImagePreloader = () => {
  useEffect(() => {
    // Preload all case images when app starts
    imageCache.preloadAllImages(drops).catch(console.error);
    
    // Cleanup on app unmount (optional)
    return () => {
      // Only clear cache if needed, usually we want to keep it
      // imageCache.clearOldCache();
    };
  }, []);
};

export default useAppImagePreloader;