// ShopScene.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ShopCategorySelector from './Shop/ShopCategorySelector';
import CasesShopScene from './Shop/CasesShopScene';
import LTOShop from './Shop/LTOShop';
import IAPShop from './Shop/IAPShop';

const ShopScene = ({ money, updateMoney, onCaseBought }) => {
  
  const [activeCategory, setActiveCategory] = useState('cases');

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'cases':
        return (
          <CasesShopScene 
            money={money} 
            updateMoney={updateMoney} 
            onCaseBought={onCaseBought} 
          />
        );
      case 'limited':
        return (
          <LTOShop 
            money={money} 
            updateMoney={updateMoney} 
          />
        );
      case 'premium':
        return <IAPShop />;
      default:
        return (
          <CasesShopScene 
            money={money} 
            updateMoney={updateMoney} 
            onCaseBought={onCaseBought} 
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <ShopCategorySelector 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      {renderCategoryContent()}
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
});

export default ShopScene;