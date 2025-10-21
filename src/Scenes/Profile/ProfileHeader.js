// components/Profile/ProfileHeader.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProfileHeader = ({ totalValue, totalItems, totalRebirths }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>👤 Profile</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Total Value</Text>
          <Text style={styles.statValue}>${totalValue.toLocaleString()}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Items</Text>
          <Text style={styles.statValue}>{totalItems}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Prestiges</Text>
          <Text style={styles.statValue}>{totalRebirths}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});