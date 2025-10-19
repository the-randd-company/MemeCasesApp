import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated, Image } from 'react-native';
import CaseDrop from './CaseDrop';
import drops from '../../configs/DropsConfig';
import { addToInventory, removeFromInventory, getUpgrades } from '../../DataStorage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = 136; // 120px + 16px gap

const ScrollFrame = ({ money, updateMoney, onFinish, onInventory, onSell, onShowResultChange, caseSpeed = 10, caseData = null }) => {
  const scrollRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonItem, setWonItem] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [rebirthMultiplier, setRebirthMultiplier] = useState(1);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Use case data drops if provided, otherwise use default drops
  const baseItems = caseData && caseData.dropWeights ? 
    Object.keys(caseData.dropWeights).map(name => drops.find(drop => drop.name === name)).filter(Boolean) :
    drops;
  
  // Store items in state to ensure consistency between render and spin
  const [items, setItems] = useState([]);

  // Preload all images on component mount
  useEffect(() => {
    preloadImages();
  }, []);

  // Generate items once when component mounts or caseData changes
  useEffect(() => {
    const generatedItems = generateWeightedItems(300, caseData?.dropWeights);
    setItems(generatedItems);
  }, [caseData]);

  // Load rebirth multiplier on mount
  useEffect(() => {
    loadRebirthMultiplier();
  }, []);

  const preloadImages = async () => {
    try {
      const preloadPromises = drops.map(drop => {
        if (typeof drop.imageSrc === 'number') {
          // For local assets, we can preload by creating temporary Image components
          return new Promise((resolve, reject) => {
            Image.prefetch(Image.resolveAssetSource(drop.imageSrc).uri)
              .then(resolve)
              .catch(resolve); // Even if prefetch fails, continue
          });
        }
        return Promise.resolve();
      });

      await Promise.all(preloadPromises);
      setImagesPreloaded(true);
    } catch (error) {
      console.log('Image preloading completed with some errors');
      setImagesPreloaded(true); // Continue anyway
    }
  };

  const loadRebirthMultiplier = async () => {
    const upgrades = await getUpgrades();
    setRebirthMultiplier(upgrades.rebirthMultiplier || 1);
  };

  // Notify parent when showResult changes
  React.useEffect(() => {
    if (typeof onShowResultChange === 'function') {
      onShowResultChange(showResult);
    }
  }, [showResult, onShowResultChange]);

  // Function to generate weighted random items for display
  const generateWeightedItems = (count, weights) => {
    if (!weights) return [...Array(count)].map(() => drops[Math.floor(Math.random() * drops.length)]);
    
    const weightedItems = [];
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    
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
      
      // Fallback if no item selected
      if (!selectedItem) {
        selectedItem = drops[Math.floor(Math.random() * drops.length)];
      }
      
      weightedItems.push(selectedItem);
    }
    
    return weightedItems;
  };
  
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const handleSpin = async () => {
    if (isSpinning || !scrollRef.current || !imagesPreloaded || items.length === 0) return;
    setIsSpinning(true);
    setShowResult(false);
    setWonItem(null);
    
    // Reset scroll position
    scrollRef.current.scrollTo({ x: 0, animated: false });
  
    // Use the EXISTING items array that's already rendered
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
  
    const duration = caseSpeed * 1000;
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
        
        setIsSpinning(false);
        const item = items[winningIndex]; // Use item from the actual items array
        const acquiredAt = Date.now();
        const fullItem = { ...item, acquiredAt };
        setWonItem(fullItem);
        // Add to inventory immediately on roll finish
        addToInventory(fullItem);
        setTimeout(() => { setShowResult(true); }, 500);
      }
    };
    requestAnimationFrame(animate);
  };

  const handleInventory = async () => {
    if (!wonItem) return;
    // Item is already in inventory, just trigger navigation
    if (onInventory) onInventory();
    if (onFinish) onFinish();
  };

  const handleSell = async () => {
    if (!wonItem) return;
    // Remove from inventory when selling
    await removeFromInventory({ id: wonItem.id, acquiredAt: wonItem.acquiredAt });
    // Grant value to user with rebirth multiplier
    const sellValue = Math.floor((wonItem.value || 0) * rebirthMultiplier);
    await updateMoney(money + sellValue);
    if (onSell) onSell(wonItem);
    if (onFinish) onFinish();
  };

  // Calculate sell value with multiplier for display
  const sellValue = wonItem ? Math.floor((wonItem.value || 0) * rebirthMultiplier) : 0;

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
                  {rebirthMultiplier > 1 && (
                    <Text style={styles.multiplierText}> {rebirthMultiplier.toFixed(2)}x</Text>
                  )}
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
            disabled={isSpinning || !imagesPreloaded || items.length === 0}
            style={[styles.button, (isSpinning || !imagesPreloaded || items.length === 0) && styles.buttonDisabled]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {!imagesPreloaded ? 'Loading...' : isSpinning ? 'Opening...' : 'Open Case'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

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
    height: 152, // Fixed height to prevent layout shift
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
    height: 152, // Same height as scroll container
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