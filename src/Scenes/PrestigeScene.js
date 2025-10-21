// PrestigeScene.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getInventory, setInventory, getUpgrades, setUpgrades } from '../DataStorage';
import {
  PRESTIGE_REQUIREMENT,
  calculateWipedValue,
  calculateMultiplierGain,
  getNextMilestone,
  canPrestige,
  performPrestige,
} from './Prestige/PrestigeCalculator';

const PrestigeScene = ({ money, updateMoney, onUpgradePurchased }) => {
  const [inventory, setInventoryState] = useState([]);
  const [prestigeMultiplier, setPrestigeMultiplier] = useState(1);
  const [totalPrestiges, setTotalPrestiges] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    loadInventory();
    loadPrestigeData();
  }, []);

  const loadInventory = async () => {
    const savedInventory = await getInventory();
    setInventoryState(savedInventory || []);
  };

  const loadPrestigeData = async () => {
    const upgrades = await getUpgrades();
    setPrestigeMultiplier(upgrades.prestigeMultiplier || 1);
    setTotalPrestiges(upgrades.totalPrestiges || 0);
  };

  const handlePrestige = async () => {
    const wipedValue = calculateWipedValue(inventory);

    if (!canPrestige(wipedValue)) {
      Alert.alert(
        'Not Enough Value',
        `You need $${PRESTIGE_REQUIREMENT.toLocaleString()} in wipeable inventory value to prestige.`,
        [{ text: 'OK' }]
      );
      return;
    }

    const multiplierGain = calculateMultiplierGain(wipedValue);
    const newTotalMultiplier = (prestigeMultiplier + (multiplierGain - 1)).toFixed(2);

    Alert.alert(
      'Confirm Prestige',
      `This will:\n• Wipe all common, rare, legendary, and other overworld items\n• Reset ALL upgrades (case speed, clicker power)\n• Grant permanent ${multiplierGain.toFixed(2)}x click multiplier\n\nYour seasonal/vaulted items will be preserved.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Prestige',
          style: 'destructive',
          onPress: async () => {
            // Perform prestige - only keep protected items
            const protectedItems = performPrestige(inventory);
            const newTotalPrestiges = totalPrestiges + 1;

            // Update inventory
            await setInventory(protectedItems);
            setInventoryState(protectedItems);

            // Get current upgrades
            const upgrades = await getUpgrades();
            
            // Reset all upgrades to level 0, but preserve prestige progress
            const updatedUpgrades = {
              // Reset gameplay upgrades to 0
              caseSpeed: 0,
              clickerPower: 0,
              // Preserve and update prestige progress
              prestigeMultiplier: (upgrades.prestigeMultiplier || 1) + (multiplierGain - 1),
              totalPrestiges: newTotalPrestiges,
            };

            await setUpgrades(updatedUpgrades);
            
            // Update local state
            setPrestigeMultiplier(updatedUpgrades.prestigeMultiplier);
            setTotalPrestiges(newTotalPrestiges);

            // Notify parent component to refresh upgrade states
            if (onUpgradePurchased) {
              onUpgradePurchased();
            }

            updateMoney(Math.trunc(1000*updatedUpgrades.prestigeMultiplier));

            Alert.alert(
              'Prestige Complete!',
              `All upgrades have been reset to level 0!\nYour click power has been multiplied by ${multiplierGain.toFixed(2)}x!\nTotal multiplier: ${newTotalMultiplier}x`,
              [{ text: 'Awesome!' }]
            );
          },
        },
      ]
    );
  };

  const wipedValue = calculateWipedValue(inventory);
  const prestigeAvailable = canPrestige(wipedValue);
  const multiplierGain = calculateMultiplierGain(wipedValue);
  const nextMilestone = getNextMilestone(wipedValue);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👑 Prestige</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Multiplier</Text>
            <Text style={styles.statValue}>{prestigeMultiplier.toFixed(2)}x</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Prestiges</Text>
            <Text style={styles.statValue}>{totalPrestiges}</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Net Worth Display */}
        <View style={styles.netWorthContainer}>
          <Text style={styles.netWorthLabel}>Net Worth</Text>
          <Text style={styles.netWorthValue}>
            ${wipedValue.toLocaleString()}
            <Text style={styles.netWorthRequirement}> / ${PRESTIGE_REQUIREMENT.toLocaleString()}</Text>
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${Math.min(100, (wipedValue / PRESTIGE_REQUIREMENT) * 100)}%` }
              ]} 
            />
          </View>
          
          {/* Multiplier Gain Display */}
          {prestigeAvailable && (
            <View style={styles.multiplierDisplay}>
              <Text style={styles.multiplierLabel}>Multiplier Gain</Text>
              <Text style={styles.multiplierValue}>+{multiplierGain.toFixed(2)}x</Text>
              {nextMilestone && (
                <Text style={styles.nextMilestone}>
                  Next: {nextMilestone.multiplier.toFixed(1)}x at ${nextMilestone.value.toLocaleString()}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Prestige Button */}
        <TouchableOpacity
          style={[
            styles.prestigeButton,
            prestigeAvailable ? styles.prestigeButtonActive : styles.prestigeButtonDisabled,
          ]}
          onPress={handlePrestige}
          disabled={!prestigeAvailable}
          activeOpacity={0.7}
        >
          {prestigeAvailable ? (
            <>
              <Text style={styles.prestigeButtonIcon}>👑</Text>
              <Text style={styles.prestigeButtonText}>PRESTIGE</Text>
              <Text style={styles.prestigeButtonSubtext}>
                Gain {multiplierGain.toFixed(2)}x Multiplier
              </Text>
              <Text style={styles.prestigeButtonSubtext}>
                Total: {(prestigeMultiplier + (multiplierGain - 1)).toFixed(2)}x
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.prestigeButtonText}>REQUIREMENT NOT MET</Text>
              <Text style={styles.prestigeButtonSubtext}>
                Need ${(PRESTIGE_REQUIREMENT - wipedValue).toLocaleString()} more
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Prestige Info Dropdown */}
        <TouchableOpacity 
          style={styles.infoHeader}
          onPress={() => setShowInfo(!showInfo)}
          activeOpacity={0.7}
        >
          <Text style={styles.infoHeaderText}>Prestige Info</Text>
          <Text style={styles.infoHeaderIcon}>{showInfo ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {showInfo && (
          <View style={styles.infoContent}>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>💥</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoHighlight}>Wipe:</Text> Common, Rare, Legendary, Mythic items
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🛡️</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoHighlight}>Keep:</Text> Seasonal, Vaulted, Special items
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>🔄</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoHighlight}>Reset:</Text> All upgrades (case speed, clicker power)
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>⚡</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoHighlight}>Multiplier:</Text> Based on net worth with diminishing returns
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>💰</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoHighlight}>Base Requirement:</Text> ${PRESTIGE_REQUIREMENT.toLocaleString()} for 1.2x
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📈</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoHighlight}>Scaling:</Text> Each doubling adds +0.1x multiplier
              </Text>
            </View>
          </View>
        )}

        {/* Spacer to ensure content is scrollable */}
        <View style={styles.bottomSpacer} />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  netWorthContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  netWorthLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  netWorthValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  netWorthRequirement: {
    fontSize: 16,
    color: '#888',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#3a3a3a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f59e0b',
    borderRadius: 4,
  },
  multiplierDisplay: {
    alignItems: 'center',
    marginTop: 8,
  },
  multiplierLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  multiplierValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 4,
  },
  nextMilestone: {
    fontSize: 12,
    color: '#ccc',
    fontStyle: 'italic',
  },
  prestigeButton: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 120,
    justifyContent: 'center',
  },
  prestigeButtonActive: {
    backgroundColor: '#7c2d12',
  },
  prestigeButtonDisabled: {
    backgroundColor: '#374151',
  },
  prestigeButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  prestigeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  prestigeButtonSubtext: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
  },
  infoHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  infoHeaderIcon: {
    fontSize: 14,
    color: '#888',
  },
  infoContent: {
    backgroundColor: '#2a2a2a',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    marginTop: 1,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  infoHighlight: {
    color: '#f59e0b',
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});

export default PrestigeScene;