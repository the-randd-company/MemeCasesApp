// ScrollFrame.js
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from 'react-native';
import CaseDrop from './CaseDrop';
import drops from '../../configs/DropsConfig';
import { addToInventory, removeFromInventory, getUpgrades } from '../../DataStorage';
import imageCache from '../../utils/ImageCache';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 136;
const BASE_SPEED = 10; // Base 10 seconds for full spin

const ScrollFrame = React.memo(({ 
  money, 
  updateMoney, 
  onFinish, 
  onInventory, 
  onSell, 
  onShowResultChange, 
  caseSpeed = null, // Optional override, otherwise uses upgrades
  caseData = null, 
  onSpinningChange 
}) => {
  const scrollRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [rebirthMultiplier, setRebirthMultiplier] = useState(1);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [upgrades, setUpgrades] = useState({ caseSpeed: 0 });
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  // Use case data drops if provided, otherwise use default drops
  const baseItems = useMemo(() => 
    caseData && caseData.dropWeights ? 
      Object.keys(caseData.dropWeights).map(name => drops.find(drop => drop.name === name)).filter(Boolean) :
      drops,
    [caseData]
  );
  
  // Calculate actual case speed based on upgrades
  const actualCaseSpeed = useMemo(() => {
    if (caseSpeed !== null) return caseSpeed; // Use override if provided
    
    const speedReduction = upgrades.caseSpeed * 0.1;
    return Math.max(3.5, BASE_SPEED - speedReduction);
  }, [caseSpeed, upgrades.caseSpeed]);

  // Calculate item count based on speed (faster speed = fewer items needed)
  const itemCount = useMemo(() => {
    const baseItems = 100;
    const speedFactor = actualCaseSpeed / BASE_SPEED;
    return Math.max(50, Math.floor(baseItems * speedFactor)); // Minimum 50 items
  }, [actualCaseSpeed]);

  // Store items in state to ensure consistency between render and spin
  const [items, setItems] = useState([]);

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      await imageCache.preloadAllImages(drops);
      setImagesPreloaded(true);
    };
    
    preloadImages();
  }, []);

  // Load upgrades on mount
  useEffect(() => {
    loadUpgrades();
  }, []);

  // Function to generate weighted random items for display
  const generateWeightedItems = (count, weights) => {
    if (!weights) return [...Array(count)].map(() => drops[Math.floor(Math.random() * drops.length)]);
    
    const weightedItems = [];
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    
    // Get only the items that are in this case's weights
    const caseItems = Object.keys(weights)
      .map(name => drops.find(drop => drop.name === name))
      .filter(Boolean);
    
    // If no valid items found, return empty array
    if (caseItems.length === 0) {
      return [];
    }
    
    for (let i = 0; i < count; i++) {
      let random = Math.random() * totalWeight;
      let selectedItem = null;
      
      for (const itemName in weights) {
        random -= weights[itemName];
        if (random <= 0) {
          selectedItem = drops.find(drop => drop.name === itemName);
          break;
        }
      }
      
      // Fallback: pick random item FROM THE CASE ITEMS ONLY
      if (!selectedItem) {
        selectedItem = caseItems[Math.floor(Math.random() * caseItems.length)];
      }
      
      weightedItems.push(selectedItem);
    }
    
    return weightedItems;
  };

  // Generate items when component mounts or caseData/speed changes
  useEffect(() => {
    const generatedItems = generateWeightedItems(itemCount, caseData?.dropWeights);
    setItems(generatedItems);
    
    // Reset loaded state when items change
    setAllImagesLoaded(false);
  }, [caseData, itemCount]);

  // Check if all current items are loaded
  useEffect(() => {
    if (imagesPreloaded && items.length > 0) {
      // All images should be preloaded, but we'll double-check the current set
      const allLoaded = items.every(item => 
        imageCache.isImageLoaded(item.imageSrc)
      );
      setAllImagesLoaded(allLoaded);
    }
  }, [imagesPreloaded, items]);

  const loadUpgrades = async () => {
    const savedUpgrades = await getUpgrades();
    setUpgrades(savedUpgrades);
  };

  // Load rebirth multiplier on mount
  useEffect(() => {
    loadRebirthMultiplier();
  }, []);

  // Notify parent when spinning state changes
  useEffect(() => {
    onSpinningChange?.(isSpinning);
  }, [isSpinning, onSpinningChange]);

  const loadRebirthMultiplier = async () => {
    const upgrades = await getUpgrades();
    setRebirthMultiplier(upgrades.rebirthMultiplier || 1);
  };

  // Notify parent when showResult changes
  useEffect(() => {
    onShowResultChange?.(showResult);
  }, [showResult, onShowResultChange]);
  
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
  const handleSpin = async () => {
  if (isSpinning || !scrollRef.current || !allImagesLoaded || items.length === 0) return;
  
  setIsSpinning(true);
  setShowResult(false);
  setWonItem(null);
  
  // Reset scroll position
  scrollRef.current.scrollTo({ x: 0, animated: false });

  // Select winning item FROM THE ACTUAL ITEMS ARRAY
  let winningIndex;
  if (caseData && caseData.dropWeights) {
    // Use weighted selection from the actual items array
    const weights = caseData.dropWeights;
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    let selectedItemName = null;
    for (const itemName in weights) {
      random -= weights[itemName];
      if (random <= 0) {
        selectedItemName = itemName;
        break;
      }
    }
    
    // Fallback if no item selected
    if (!selectedItemName) {
      selectedItemName = baseItems[Math.floor(Math.random() * baseItems.length)].name;
    }
    
    // Find ALL occurrences of the selected item in the actual items array
    const allOccurrences = items
      .map((item, index) => item.name === selectedItemName ? index : -1)
      .filter(index => index !== -1);
    
    // Pick a random occurrence that's far enough in the list for dramatic effect
    const minStartIndex = Math.floor(items.length * 0.6);
    const validOccurrences = allOccurrences.filter(index => index >= minStartIndex);
    
    if (validOccurrences.length > 0) {
      winningIndex = validOccurrences[Math.floor(Math.random() * validOccurrences.length)];
    } else {
      winningIndex = allOccurrences.length > 0 
        ? allOccurrences[allOccurrences.length - 1] 
        : Math.floor(items.length * 0.8);
    }
  } else {
    // Fallback: random selection from items array
    winningIndex = Math.floor(Math.random() * items.length);
  }

  const centerOffset = (SCREEN_WIDTH - 32) / 2 - ITEM_WIDTH / 2;
  const targetScroll = (winningIndex * ITEM_WIDTH) - centerOffset;

  const duration = actualCaseSpeed * 1000; // Use the actual calculated speed
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);

    scrollRef.current?.scrollTo({ 
      x: targetScroll * easedProgress, 
      animated: false
    });
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Ensure final scroll position is exact
      scrollRef.current?.scrollTo({ 
        x: targetScroll, 
        animated: false
      });
      
      // Set the won item first
      const item = items[winningIndex];
      const acquiredAt = Date.now();
      const fullItem = { ...item, acquiredAt };
      setWonItem(fullItem);
      
      // Add to inventory immediately on roll finish
      addToInventory(fullItem);
      
      // Set spinning to false and show result after a brief delay
      setTimeout(() => {
        setIsSpinning(false);
        setShowResult(true);
      }, 500);
    }
  };
  requestAnimationFrame(animate);
};

  const handleInventory = async () => {
    if (!wonItem) return;
    onInventory?.();
    onFinish?.();
  };

  const handleSell = async () => {
    if (!wonItem) return;
    // Remove from inventory when selling
    await removeFromInventory({ id: wonItem.id, acquiredAt: wonItem.acquiredAt });
    // Grant value to user with rebirth multiplier
    const sellValue = Math.floor(wonItem.value || 0);
    await updateMoney(money + sellValue);
    onSell?.(wonItem);
    onFinish?.();
  };

  // Calculate sell value with multiplier for display
  const sellValue = useMemo(() => 
    wonItem ? Math.floor(wonItem.value || 0) : 0,
    [wonItem, rebirthMultiplier]
  );

  // Show speed info in UI
  const speedInfo = useMemo(() => {
    if (upgrades.caseSpeed > 0) {
      return ` (${actualCaseSpeed.toFixed(1)}s)`;
    }
    return '';
  }, [upgrades.caseSpeed, actualCaseSpeed]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.title, wonItem && { color: wonItem?.rarityColor }]}>
          {wonItem ? wonItem.name : 'Case Opening'}
        </Text>
        {showResult ? (
          <>
            <View style={styles.resultContainer}>
              <CaseDrop dropImage={wonItem} />
            </View>
            <View style={styles.resultActions}>
              <TouchableOpacity style={[styles.button]} onPress={handleInventory}>
                <Text style={styles.buttonText}>View in Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#10b981' }]} onPress={handleSell}>
                <Text style={styles.buttonText}>
                  Sell Item (${sellValue})
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.scrollContainer}>
            <View style={styles.indicatorLine} />
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              contentContainerStyle={styles.scrollContent}
              removeClippedSubviews={true}
            >
              {items.map((item, index) => (
                <View key={index} style={styles.itemWrapper}>
                  <CaseDrop dropImage={item} />
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {!showResult && (
          <TouchableOpacity
            onPress={handleSpin}
            disabled={isSpinning || !allImagesLoaded || items.length === 0}
            style={[styles.button, (isSpinning || !allImagesLoaded || items.length === 0) && styles.buttonDisabled]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {!allImagesLoaded ? 'Loading Images...' : 
               isSpinning ? `Opening...${speedInfo}` : 
               `Open Case${speedInfo}`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  scrollContainer: {
    position: 'relative',
    marginBottom: 16,
    height: 152,
  },
  indicatorLine: {
    position: 'absolute',
    left: '50%',
    marginLeft: -2,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#fbbf24',
    zIndex: 10,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  itemWrapper: {
    marginRight: 16,
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    height: 152,
  },
  resultActions: {
    marginTop: 24,
    gap: 16,
  },
  button: {
    backgroundColor: '#f59e0b',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: '#6b7280',
    shadowColor: '#6b7280',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  multiplierText: {
    fontSize: 14,
    color: '#fbbf24',
    fontWeight: '600',
  },
});

export default ScrollFrame;