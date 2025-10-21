// components/Profile/UpgradeStats.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const UpgradeStats = ({ caseSpeedLevel, clickerPowerLevel, rebirthMultiplier }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upgrades</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statCardIcon}>⚡</Text>
          <Text style={styles.statCardLabel}>Case Speed</Text>
          <Text style={styles.statCardValue}>Level {caseSpeedLevel}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statCardIcon}>💪</Text>
          <Text style={styles.statCardLabel}>Click Power</Text>
          <Text style={styles.statCardValue}>Level {clickerPowerLevel}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statCardIcon}>👑</Text>
          <Text style={styles.statCardLabel}>Multiplier</Text>
          <Text style={styles.statCardValue}>{rebirthMultiplier.toFixed(2)}x</Text>
        </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statCardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textAlign: 'center',
  },
  statCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});