// components/Profile/MoneyDisplay.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MoneyDisplay = ({ money }) => {
  return (
    <View style={styles.moneyContainer}>
      <Text style={styles.moneyLabel}>Current Balance</Text>
      <Text style={styles.moneyValue}>${money.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  moneyContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  moneyLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  moneyValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10b981',
  },
});