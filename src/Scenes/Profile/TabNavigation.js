// components/Profile/TabNavigation.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'stats' && styles.tabActive]}
        onPress={() => onTabChange('stats')}
      >
        <Text style={[styles.tabText, activeTab === 'stats' && styles.tabTextActive]}>
          Stats
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'achievements' && styles.tabActive]}
        onPress={() => onTabChange('achievements')}
      >
        <Text style={[styles.tabText, activeTab === 'achievements' && styles.tabTextActive]}>
          Achievements
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabActive: {
    backgroundColor: '#3a3a3a',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  tabTextActive: {
    color: '#ffffff',
  },
});