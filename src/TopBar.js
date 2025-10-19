import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TopBar = ({ money, onMoneyPress }) => {
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Case Opener</Text>
      <TouchableOpacity 
        style={styles.moneyContainer}
        onPress={onMoneyPress}
        activeOpacity={0.7}
      >
        <Text style={styles.moneyIcon}>💰</Text>
        <Text style={styles.moneyText}>{formatMoney(money)}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  moneyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  moneyIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  moneyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
});

export default TopBar;