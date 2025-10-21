// TutorialScene.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import drops from '../configs/DropsConfig';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MemeCard = ({ item, index, isPlaceholder = false, rarityColor = '#8b5cf6' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (isPlaceholder || imageLoaded) {
      const delay = index * 100;

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          delay,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [imageLoaded, isPlaceholder]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (isPlaceholder) {
    return (
      <Animated.View
        style={[
          styles.memeCard,
          {
            borderColor: rarityColor,
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: translateY },
            ],
          },
        ]}
      >
        <View style={[styles.memeImageContainer, { backgroundColor: rarityColor }]}>
          <Text style={styles.placeholderText}>?</Text>
        </View>
        <Text style={styles.memeName}>Unknown</Text>
        <Text style={[styles.memeRarity, { color: rarityColor }]}>
          Vaulted
        </Text>
        <Text style={styles.memeValue}>$???</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.memeCard,
        {
          borderColor: item.rarityColor,
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateY: translateY },
          ],
        },
      ]}
    >
      <View style={[styles.memeImageContainer, { backgroundColor: item.rarityColor }]}>
        <Image
          source={item.imageSrc}
          style={styles.memeImage}
          resizeMode="contain"
          onLoad={handleImageLoad}
        />
      </View>
      <Text style={styles.memeName} numberOfLines={1}>
        {item.name}
      </Text>
      <Text style={[styles.memeRarity, { color: item.rarityColor }]}>
        {item.rarity}
      </Text>
      <Text style={styles.memeValue}>
        ${item.value.toLocaleString()}
      </Text>
    </Animated.View>
  );
};

const TutorialScene = ({ onContinue }) => {
  const [displayedMemes, setDisplayedMemes] = useState([]);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const continueAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    loadMemes();
    animateTitle();
    
    const timer = setTimeout(() => {
      if (!hasScrolled) {
        animateContinueButton();
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [hasScrolled]);

  const loadMemes = () => {
    // Filter out Vaulted memes and limit to 4 per rarity
    const filteredDrops = drops.filter(meme => meme.rarity !== 'Vaulted');
    
    const groupedMemes = filteredDrops.reduce((groups, meme) => {
      const rarity = meme.rarity;
      if (!groups[rarity]) {
        groups[rarity] = [];
      }
      if (groups[rarity].length < 4) {
        groups[rarity].push(meme);
      }
      return groups;
    }, {});
    
    setDisplayedMemes(groupedMemes);
  };

  const animateTitle = () => {
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.back(1.2)),
      useNativeDriver: true,
    }).start();
  };

  const animateContinueButton = () => {
    Animated.timing(continueAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    scrollY.setValue(contentOffset.y);
    
    if (!hasScrolled) {
      setHasScrolled(true);
    }
    
    const { contentSize, layoutMeasurement } = event.nativeEvent;
    const isNearBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 100;
    
    if (isNearBottom) {
      animateContinueButton();
    }
  };

  const handleContinue = () => {
    Animated.timing(continueAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onContinue();
    });
  };

  const titleTranslateY = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const titleScale = titleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const continueButtonOpacity = continueAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const continueButtonTranslateY = continueAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const rarities = ['Mythic', 'Legendary', 'Epic', 'Rare', 'Uncommon', 'Common'];

  // Calculate total unique memes (excluding vaulted because they are hardly going to be noticed)
  const totalMemes = drops.filter(meme => meme.rarity !== 'Vaulted').length;

  // Create Vaulted memes array with specific memes and placeholders
  const vaultedMemes = [
    {
      name: 'Epstein Files',
      rarity: 'Vaulted',
      rarityColor: '#8b5cf6',
      value: 20041998,
      imageSrc: require('../img/memes/EpsteinFiles.jpg')
    },
    {
      name: 'Phenomenal Penguin',
      rarity: 'Vaulted', 
      rarityColor: '#8b5cf6',
      value: 9999999,
      // You'll need to add this image to your assets
      imageSrc: require('../img/memes/PhenomenalPenguin.jpg') // Use a placeholder or actual image
    },
    { isPlaceholder: true },
    { isPlaceholder: true }
  ];

  return (
    <View style={styles.container}>
      {/* Animated Title */}
      <Animated.View
        style={[
          styles.titleContainer,
          {
            transform: [
              { translateY: titleTranslateY },
              { scale: titleScale },
            ],
          },
        ]}
      >
        <Text style={styles.title}>Welcome to Meme Collector!</Text>
        <Text style={styles.subtitle}>
          Over {totalMemes} memes to collect, including:
        </Text>
      </Animated.View>

      {/* Meme Scroll View */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Regular rarities */}
        {rarities.map((rarity) => {
          const memes = displayedMemes[rarity] || [];
          
          return (
            <View key={rarity} style={styles.raritySection}>
              <View style={[styles.rarityHeader, { 
                backgroundColor: memes.length > 0 ? memes[0].rarityColor : '#c31429' 
              }]}>
                <Text style={styles.rarityTitle}>{rarity}</Text>
              </View>
              <View style={styles.memeGrid}>
                {memes.map((meme, index) => (
                  <MemeCard
                    key={`${rarity}-${index}`}
                    item={meme}
                    index={index}
                  />
                ))}
              </View>
            </View>
          );
        })}

        {/* Vaulted section at the bottom */}
        <View style={styles.raritySection}>
          <View style={[styles.rarityHeader, { backgroundColor: '#8b5cf6' }]}>
            <Text style={styles.rarityTitle}>Vaulted</Text>
          </View>
          <View style={styles.memeGrid}>
            {vaultedMemes.map((meme, index) => (
              meme.isPlaceholder ? (
                <MemeCard
                  key={`vaulted-placeholder-${index}`}
                  index={index + 30}
                  isPlaceholder={true}
                  rarityColor="#8b5cf6"
                />
              ) : (
                <MemeCard
                  key={`vaulted-${meme.name}`}
                  item={meme}
                  index={index + 30}
                />
              )
            ))}
          </View>
        </View>
        
        {/* Continue Prompt */}
        <View style={styles.continuePrompt}>
          <Text style={styles.continueText}>Scroll to explore all the amazing memes!</Text>
          <Text style={styles.continueSubtext}>Tap "Start Collecting" when you're ready</Text>
        </View>
      </ScrollView>

      {/* Animated Continue Button */}
      <Animated.View
        style={[
          styles.continueContainer,
          {
            opacity: continueButtonOpacity,
            transform: [{ translateY: continueButtonTranslateY }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Start Collecting!</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Skip button for users who don't want to scroll */}
      {!hasScrolled && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={animateContinueButton}
        >
          <Text style={styles.skipButtonText}>Skip Tutorial</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 2,
    borderBottomColor: '#3a3a3a',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  raritySection: {
    marginBottom: 25,
  },
  rarityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  rarityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  memeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  memeCard: {
    width: (SCREEN_WIDTH - 44) / 2, // 2 cards per row with consistent spacing
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
    borderWidth: 3,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  memeImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  memeImage: {
    width: '90%',
    height: '90%',
  },
  placeholderText: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  memeName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  memeRarity: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
  },
  memeValue: {
    fontSize: 10,
    color: '#888888',
    fontWeight: '500',
  },
  continuePrompt: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  continueText: {
    fontSize: 16,
    color: '#888888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  continueSubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  continueContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
  },
  skipButtonText: {
    color: '#888888',
    fontSize: 14,
  },
});

export default TutorialScene;