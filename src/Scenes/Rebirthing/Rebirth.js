// RebirthScene.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getInventory, setInventory, getUpgrades, setUpgrades } from '../../DataStorage';
import {
  REBIRTH_REQUIREMENT,
  calculateWipedValue,
  calculateMultiplierGain,
  getNextMilestone,
  canRebirth,
  performRebirth,
} from './RebirthCalculator';

const RebirthScene = ({ money, updateMoney, onUpgradePurchased }) => {
  const [inventory, setInventoryState] = useState([]);
  const [rebirthMultiplier, setRebirthMultiplier] = useState(1);
  const [totalRebirths, setTotalRebirths] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    loadInventory();
    loadRebirthData();
  }, []);

  const loadInventory = async () => {
    const savedInventory = await getInventory();
    setInventoryState(savedInventory || []);
  };

  const loadRebirthData = async () => {
    const upgrades = await getUpgrades();
    setRebirthMultiplier(upgrades.rebirthMultiplier || 1);
    setTotalRebirths(upgrades.totalRebirths || 0);
  };

  const handleRebirth = async () => {
    const wipedValue = calculateWipedValue(inventory);

    if (!canRebirth(wipedValue)) {
      Alert.alert(
        'Not Enough Value',
        `You need $${REBIRTH_REQUIREMENT.toLocaleString()} in wipeable inventory value to rebirth.`,
        [{ text: 'OK' }]
      );
      return;
    }

    const multiplierGain = calculateMultiplierGain(wipedValue);
    const newTotalMultiplier = (rebirthMultiplier + (multiplierGain - 1)).toFixed(2);

    Alert.alert(
      'Confirm Rebirth',
      `This will:\n• Wipe all common, rare, legendary, and mythic items\n• Reset ALL upgrades (case speed, clicker power)\n• Grant permanent ${multiplierGain.toFixed(2)}x click multiplier\n\nYour seasonal/vaulted items will be preserved.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Rebirth',
          style: 'destructive',
          onPress: async () => {
            // Perform rebirth - only keep protected items
            const protectedItems = performRebirth(inventory);
            const newTotalRebirths = totalRebirths + 1;

            // Update inventory
            await setInventory(protectedItems);
            setInventoryState(protectedItems);

            // Get current upgrades
            const upgrades = await getUpgrades();
            
            // Reset all upgrades to level 0, but preserve rebirth progress
            const updatedUpgrades = {
              // Reset gameplay upgrades to 0
              caseSpeed: 0,
              clickerPower: 0,
              // Preserve and update rebirth progress
              rebirthMultiplier: (upgrades.rebirthMultiplier || 1) + (multiplierGain - 1),
              totalRebirths: newTotalRebirths,
            };

            await setUpgrades(updatedUpgrades);
            
            // Update local state
            setRebirthMultiplier(updatedUpgrades.rebirthMultiplier);
            setTotalRebirths(newTotalRebirths);

            // Notify parent component to refresh upgrade states
            if (onUpgradePurchased) {
              onUpgradePurchased();
            }

            Alert.alert(
              'Rebirth Complete!',
              `All upgrades have been reset to level 0!\nYour click power has been multiplied by ${multiplierGain.toFixed(2)}x!\nTotal multiplier: ${newTotalMultiplier}x`,
              [{ text: 'Awesome!' }]
            );
          },
        },
      ]
    );
  };

  const wipedValue = calculateWipedValue(inventory);
  const rebirthAvailable = canRebirth(wipedValue);
  const multiplierGain = calculateMultiplierGain(wipedValue);
  const nextMilestone = getNextMilestone(wipedValue);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Rebirth</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Multiplier</Text>
            <Text style={styles.statValue}>{rebirthMultiplier.toFixed(2)}x</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Rebirths</Text>
            <Text style={styles.statValue}>{totalRebirths}</Text>
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
            <Text style={styles.netWorthRequirement}> / ${REBIRTH_REQUIREMENT.toLocaleString()}</Text>
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${Math.min(100, (wipedValue / REBIRTH_REQUIREMENT) * 100)}%` }
              ]} 
            />
          </View>
          
          {/* Multiplier Gain Display */}
          {rebirthAvailable && (
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

        {/* Rebirth Button */}
        <TouchableOpacity
          style={[
            styles.rebirthButton,
            rebirthAvailable ? styles.rebirthButtonActive : styles.rebirthButtonDisabled,
          ]}
          onPress={handleRebirth}
          disabled={!rebirthAvailable}
          activeOpacity={0.7}
        >
          {rebirthAvailable ? (
            <>
              <Text style={styles.rebirthButtonIcon}>🔥</Text>
              <Text style={styles.rebirthButtonText}>REBIRTH</Text>
              <Text style={styles.rebirthButtonSubtext}>
                Gain {multiplierGain.toFixed(2)}x Multiplier
              </Text>
              <Text style={styles.rebirthButtonSubtext}>
                Total: {(rebirthMultiplier + (multiplierGain - 1)).toFixed(2)}x
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.rebirthButtonText}>REQUIREMENT NOT MET</Text>
              <Text style={styles.rebirthButtonSubtext}>
                Need ${(REBIRTH_REQUIREMENT - wipedValue).toLocaleString()} more
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Rebirth Info Dropdown */}
        <TouchableOpacity 
          style={styles.infoHeader}
          onPress={() => setShowInfo(!showInfo)}
          activeOpacity={0.7}
        >
          <Text style={styles.infoHeaderText}>Rebirth Info</Text>
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
                <Text style={styles.infoHighlight}>Base Requirement:</Text> ${REBIRTH_REQUIREMENT.toLocaleString()} for 1.2x
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>📈</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoHighlight}>Scaling:</Text> Each doubling adds +0.1x multiplier
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoIcon}>✨</Text>
              <Text style={styles.infoText}>
                <Text style={styles.infoHighlight}>Stacking:</Text> All multipliers multiply together
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
  rebirthButton: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 120,
    justifyContent: 'center',
  },
  rebirthButtonActive: {
    backgroundColor: '#7c2d12',
  },
  rebirthButtonDisabled: {
    backgroundColor: '#374151',
  },
  rebirthButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  rebirthButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
    textAlign: 'center',
  },
  rebirthButtonSubtext: {
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

export default RebirthScene;