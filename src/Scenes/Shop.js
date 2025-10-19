import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { subtractMoney } from '../DataStorage';
import { getAllCases } from '../configs/CasesConfig';

const CaseCard = ({ caseData, userMoney, onBuy }) => {
  const canAfford = userMoney >= caseData.price;
  return (
    <View style={styles.caseCard}>
      <View style={styles.caseImageContainer}>
        <Image source={caseData.imageSrc} style={styles.caseImage} resizeMode="contain" />
      </View>
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

const CaseShop = ({ money, updateMoney, onCaseBought }) => {
  const handleBuy = async (caseData) => {
    if (!caseData || money < caseData.price) return;
    
    // Create proper case data structure for ScrollFrame
    const caseForOpening = {
      ...caseData,
      dropWeights: caseData.dropWeights // Ensure dropWeights is included
    };
    
    const newMoney = await subtractMoney(caseData.price);
    if (newMoney !== null) {
      updateMoney(newMoney);
      if (onCaseBought) {
        onCaseBought(caseForOpening); // Pass the complete case data
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Case Shop</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Balance:</Text>
          <Text style={styles.balanceAmount}>💰 ${money}</Text>
        </View>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
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
  },
  caseImage: {
    width: '100%',
    height: '100%',
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

export default CaseShop;