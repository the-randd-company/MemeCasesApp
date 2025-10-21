// CaseDrop.js
import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import imageCache from '../../utils/ImageCache';
import DataStorage from './DataStorage';

const CaseDrop = React.memo(({ dropImage }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0]; // Start visible if preloaded

  const imageSource = useMemo(() => {
    const source = imageCache.getImageSource(dropImage.imageSrc);
    
    // If image is already in cache, mark as loaded immediately
    if (imageCache.isImageLoaded(dropImage.imageSrc)) {
      setImageLoaded(true);
    }
    
    return source;
  }, [dropImage.imageSrc]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    // Only animate if it wasn't preloaded
    if (!imageCache.isImageLoaded(dropImage.imageSrc)) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleImageError = (error) => {
    console.log('Image loading error:', error);
    setImageError(true);
    setImageLoaded(true); // Still show the container even if image fails
  };

  // Show loading state only if image is not in cache
  const showLoading = !imageLoaded && !imageCache.isImageLoaded(dropImage.imageSrc);

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: dropImage.rarityColor,
          borderColor: dropImage.rarityColor,
        }
      ]}
    >
      <Animated.Image 
        source={imageSource}
        style={[
          styles.dropImage,
          { opacity: fadeAnim }
        ]}
        resizeMode="contain"
        resizeMethod="scale"
        onLoad={handleImageLoad}
        onError={handleImageError}
        fadeDuration={100}
      />
      {showLoading && (
        <View style={styles.placeholder}>
          <View style={styles.loadingSpinner} />
        </View>
      )}
      {imageError && (
        <View style={styles.placeholder}>
          <Text style={styles.errorText}>!</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 4,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dropImage: {
    width: '125%',
    height: '125%',
  },
  placeholder: {
    position: 'absolute',
    width: '125%',
    height: '125%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  loadingSpinner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffffff',
    borderTopColor: 'transparent',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CaseDrop;