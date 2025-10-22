import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import { subtractMoney } from '../../DataStorage';
import { getAllCases } from '../../configs/CasesConfig';

const CaseCard = ({ caseData, userMoney, onBuy }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [imageFadeAnim] = useState(new Animated.Value(1));
  const [descriptionFadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));
  
  const canAfford = userMoney >= caseData.price;

  const toggleDescription = () => {
    if (showDescription) {
      // Show image with multiple animations
      Animated.parallel([
        Animated.timing(imageFadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(descriptionFadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Show description with multiple animations
      Animated.parallel([
        Animated.timing(imageFadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(descriptionFadeAnim, {
          toValue: 1,
          duration: 800,
          delay: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.95,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        })
      ]).start();
    }
    setShowDescription(!showDescription);
  };

  return (
    <View style={styles.caseCard}>
      <TouchableOpacity 
        style={styles.caseImageContainer}
        onPress={toggleDescription}
        activeOpacity={0.9}
      >
        {/* Image with fade animation */}
        <Animated.View 
          style={[
            styles.imageWrapper, 
            { 
              opacity: imageFadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image 
            source={caseData.imageSrc} 
            style={styles.caseImage} 
            resizeMode="contain" 
          />
        </Animated.View>
        
        {/* Description with fade animation */}
        <Animated.View 
          style={[
            styles.descriptionContainer,
            { 
              opacity: descriptionFadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Text style={styles.descriptionTitle}>About this Case</Text>
          <Text style={styles.descriptionText}>
            {caseData.description || 'No description available.'}
          </Text>
          {caseData.dropWeights && (
            <Text style={styles.rarityHint}>
                good luck!
            </Text>
          )}
          <Text style={styles.tapHint}>Tap to view case</Text>
        </Animated.View>
      </TouchableOpacity>
      
      <Text style={styles.caseName}>{caseData.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.priceIcon}>💰</Text>
        <Text style={styles.priceText}>${caseData.price}</Text>
      </View>
      <TouchableOpacity
        style={[styles.buyButton, !canAfford && styles.buyButtonDisabled]}
        onPress={() => canAfford && onBuy(caseData)}
        disabled={!canAfford}
        activeOpacity={0.7}
      >
        <Text style={styles.buyButtonText}>
          {canAfford ? 'Purchase and Open' : 'Insufficient Funds'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CasesShopScene = ({ money, updateMoney, onCaseBought }) => {
  const handleBuy = async (caseData) => {
    if (!caseData || money < caseData.price) return;
    
    const caseForOpening = {
      ...caseData,
      dropWeights: caseData.dropWeights
    };
    
    const newMoney = await subtractMoney(caseData.price);
    if (newMoney !== null) {
      updateMoney(newMoney);
      if (onCaseBought) {
        onCaseBought(caseForOpening);
      }
    }
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.shopGrid}>
      {getAllCases().map((caseProduct) => (
        <CaseCard
          key={caseProduct.id}
          caseData={caseProduct}
          userMoney={money}
          onBuy={handleBuy}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  shopGrid: {
    padding: 16,
  },
  caseCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3a3a3a',
  },
  caseImageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  caseImage: {
    width: '100%',
    height: '100%',
  },
  descriptionContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    position: 'absolute',
  },
  descriptionTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  descriptionText: {
    color: '#ffffff',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 8,
  },
  rarityHint: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  tapHint: {
    color: '#f59e0b',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  caseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 6,
  },
  priceIcon: {
    fontSize: 18,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  buyButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buyButtonDisabled: {
    backgroundColor: '#6b7280',
  },
  buyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CasesShopScene;