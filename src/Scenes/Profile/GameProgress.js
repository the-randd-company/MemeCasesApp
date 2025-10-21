// components/Profile/GameProgress.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressItem = ({ label, value }) => (
  <View style={styles.progressItem}>
    <Text style={styles.progressLabel}>{label}</Text>
    <Text style={styles.progressValue}>{value}</Text>
  </View>
);

export const GameProgress = ({ totalItems, totalValue, totalPrestiges, prestigeMultiplier }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Game Progress</Text>
      <View style={styles.progressStats}>
        <ProgressItem label="Total Items Collected" value={totalItems} />
        <ProgressItem 
          label="Total Value Accumulated" 
          value={`$${Number(totalValue || 0).toLocaleString()}`} 
        />
        <ProgressItem label="Prestige Count" value={totalPrestiges || 0} />
        <ProgressItem 
          label="Multiplier Bonus" 
          value={`${Number(prestigeMultiplier ?? 0).toFixed(2)}x`} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  progressStats: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  progressLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});