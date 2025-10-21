import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getMoney, setMoney as setMoneyStorage, getUpgrades, setUpgrades, resetAllData} from '../DataStorage';

const UpgradesScene = ({ money, updateMoney, onUpgradePurchased }) => {
  const [upgrades, setUpgradesState] = useState({
    caseSpeed: 0,
    clickerPower: 0,
    autoClickPower: 0,
  });

  // Load upgrades on component mount
  useEffect(() => {
    loadUpgrades();
  }, []);

  const loadUpgrades = async () => {
    const savedUpgrades = await getUpgrades();
    setUpgradesState(savedUpgrades);
  };

  const saveUpgrades = async (newUpgrades) => {
    setUpgradesState(newUpgrades);
    await setUpgrades(newUpgrades);
  };

  const handleUpgrade = async (upgradeType, cost, currentLevel) => {
    if (money < cost) return;

    const newMoney = money - cost;
    const newUpgrades = {
      ...upgrades,
      [upgradeType]: currentLevel + 1,
    };

    await setMoneyStorage(newMoney);
    updateMoney(newMoney);
    await saveUpgrades(newUpgrades);
    
    // Notify parent component to refresh upgrade states
    if (onUpgradePurchased) {
      onUpgradePurchased();
    }
  };

  const getCaseSpeedDuration = () => {
    const baseDuration = 10; // seconds
    const reduction = upgrades.caseSpeed * 0.1;
    return Math.max(3.5, baseDuration - reduction); // Minimum 3.5 seconds
  };

  const getClickerPower = () => {
    return 1 + upgrades.clickerPower; // Base 1 + upgrades
  };
  
  const getAutoClickPower = () => {
    return upgrades.autoClickPower;
  }

  const upgradesData = [
    {
      id: 'caseSpeed',
      name: 'Case Opening Speed',
      description: `Reduces case opening time by 0.1s (Current: ${getCaseSpeedDuration().toFixed(1)}s)`,
      baseCost: 400,
      costMultiplier: 1.1,
      currentLevel: upgrades.caseSpeed,
      maxLevel: 65, // Max 6.5 seconds reduction (0.1 * 65 = 6.5s, so 10 - 6.5 = 3.5s minimum)
    },
    {
      id: 'clickerPower',
      name: 'Clicker Power',
      description: `Increases money per click by +1 (Current: +${getClickerPower()})`,
      baseCost: 100,
      costMultiplier: 1.05,
      currentLevel: upgrades.clickerPower,
      maxLevel: Infinity, // No maximum limit
    },
    {
        id: 'autoClickPower',
        name: 'Auto Clicker',
        description: `Multiplies auto-click earnings (Current: ${getAutoClickPower()}x every 10 seconds)`,
        baseCost: 500,
        costMultiplier: 1.35,
        currentLevel: upgrades.autoClickPower,
        maxLevel: Infinity,
    },
  ];

  const getUpgradeCost = (upgrade) => {
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.currentLevel));
  };

  const UpgradeCard = ({ upgrade }) => {
    const cost = getUpgradeCost(upgrade);
    const canAfford = money >= cost;
    const isMaxLevel = upgrade.maxLevel !== Infinity && upgrade.currentLevel >= upgrade.maxLevel;

    return (
      <View style={styles.upgradeCard}>
        <View style={styles.upgradeHeader}>
          <Text style={styles.upgradeName}>{upgrade.name}</Text>
          <Text style={styles.upgradeLevel}>Level {upgrade.currentLevel}</Text>
        </View>
        <Text style={styles.upgradeDescription}>{upgrade.description}</Text>
        <View style={styles.upgradeFooter}>
          <View style={styles.costContainer}>
            <Text style={styles.costIcon}>💰</Text>
            <Text style={styles.costText}>${cost}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.upgradeButton,
              (!canAfford || isMaxLevel) && styles.upgradeButtonDisabled,
            ]}
            onPress={() => handleUpgrade(upgrade.id, cost, upgrade.currentLevel)}
            disabled={!canAfford || isMaxLevel}
            activeOpacity={0.7}
          >
            <Text style={styles.upgradeButtonText}>
              {isMaxLevel ? 'MAX' : 'Upgrade'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.upgradesList}>
        {upgradesData.map((upgrade) => (
          <UpgradeCard key={upgrade.id} upgrade={upgrade} />
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
  upgradesList: {
    padding: 16,
  },
  upgradeCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#3a3a3a',
  },
  upgradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  upgradeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    flex: 1,
  },
  upgradeLevel: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 12,
    lineHeight: 20,
  },
  upgradeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  costIcon: {
    fontSize: 16,
  },
  costText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  upgradeButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  upgradeButtonDisabled: {
    backgroundColor: '#6b7280',
  },
  upgradeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default UpgradesScene;