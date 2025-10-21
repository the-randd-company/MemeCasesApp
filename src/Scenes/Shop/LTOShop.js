import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const LTOShop = ({ money, updateMoney }) => {
  const LTOItems = [
    {
      id: 'meme1',
      name: 'Viral Meme Pack',
      price: 500,
      timeLeft: '2d 5h',
      image: '🌟',
      rarity: 'Epic'
    },
    {
      id: 'meme2',
      name: 'Trending Collection',
      price: 750,
      timeLeft: '1d 12h',
      image: '🔥',
      rarity: 'Legendary'
    },
    {
      id: 'meme3',
      name: 'Exclusive Drop',
      price: 1000,
      timeLeft: '6h 30m',
      image: '💎',
      rarity: 'Mythic'
    }
  ];

  const LTOCard = ({ item }) => {
    const canAfford = money >= item.price;
    
    return (
      <View style={[styles.LTOCard, styles[`${item.rarity.toLowerCase()}Card`]]}>
        <View style={styles.LTOHeader}>
          <Text style={styles.LTOTimer}>⏰ {item.timeLeft}</Text>
          <Text style={styles[`${item.rarity.toLowerCase()}Badge`]}>{item.rarity}</Text>
        </View>
        
        <View style={styles.LTOImageContainer}>
          <Text style={styles.LTOEmoji}>{item.image}</Text>
        </View>
        
        <Text style={styles.LTOName}>{item.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceIcon}>💰</Text>
          <Text style={styles.priceText}>${item.price}</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.buyButton, !canAfford && styles.buyButtonDisabled]}
          disabled={!canAfford}
          activeOpacity={0.7}
        >
          <Text style={styles.buyButtonText}>
            {canAfford ? 'Purchase' : 'Insufficient Funds'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.shopGrid}>
      <Text style={styles.sectionTitle}>Limited Time Offers</Text>
      <Text style={styles.sectionSubtitle}>Get these exclusive items before they're gone!</Text>
      
      {LTOItems.map((item) => (
        <LTOCard key={item.id} item={item} />
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  LTOCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
  },
  epicCard: {
    backgroundColor: '#2a2a2a',
    borderColor: '#8b5cf6',
  },
  legendaryCard: {
    backgroundColor: '#2a2a2a',
    borderColor: '#f59e0b',
  },
  mythicCard: {
    backgroundColor: '#2a2a2a',
    borderColor: '#ec4899',
  },
  LTOHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  LTOTimer: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  epicBadge: {
    fontSize: 10,
    color: '#8b5cf6',
    fontWeight: 'bold',
    backgroundColor: '#3a2a5a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  legendaryBadge: {
    fontSize: 10,
    color: '#f59e0b',
    fontWeight: 'bold',
    backgroundColor: '#5a4a2a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  mythicBadge: {
    fontSize: 10,
    color: '#ec4899',
    fontWeight: 'bold',
    backgroundColor: '#5a2a4a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  LTOImageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LTOEmoji: {
    fontSize: 48,
  },
  LTOName: {
    fontSize: 18,
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

export default LTOShop;