// components/Profile/InventoryStats.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InventoryStatRow = ({ label, value, colorStyle }) => (
  <View style={styles.inventoryStatRow}>
    <Text style={styles.inventoryStatLabel}>{label}</Text>
    <Text style={[styles.inventoryStatValue, colorStyle]}>{value}</Text>
  </View>
);

export const InventoryStats = ({ inventory }) => {
  const commonItems = inventory.filter(item => item.rarity === 'common').length;
  const uncommonItems = inventory.filter(item => item.rarity === 'uncommon').length;
  const rareItems = inventory.filter(item => item.rarity === 'rare').length;
  const epicItems = inventory.filter(item => item.rarity === 'epic').length;
  const legendaryItems = inventory.filter(item => item.rarity === 'legendary').length;
  const mythicItems = inventory.filter(item => item.rarity === 'mythic').length;
  const seasonalItems = inventory.filter(item => item.rarity === 'seasonal').length;
  const vaultedItems = inventory.filter(item => item.rarity === 'vaulted').length;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Inventory</Text>
      <View style={styles.inventoryStats}>
        <InventoryStatRow label="Common Items" value={commonItems} colorStyle={styles.commonText} />
        <InventoryStatRow label="Uncommon Items" value={uncommonItems} colorStyle={styles.uncommonText} />
        <InventoryStatRow label="Rare Items" value={rareItems} colorStyle={styles.rareText} />
        <InventoryStatRow label="Epic Items" value={epicItems} colorStyle={styles.epicText} />
        <InventoryStatRow label="Legendary Items" value={legendaryItems} colorStyle={styles.legendaryText} />
        <InventoryStatRow label="Mythic Items" value={mythicItems} colorStyle={styles.mythicText} />
        <InventoryStatRow label="Seasonal Items" value={seasonalItems} colorStyle={styles.seasonalText} />
        <InventoryStatRow label="Vaulted Items" value={vaultedItems} colorStyle={styles.vaultedText} />
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
  inventoryStats: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
  },
  inventoryStatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3a3a',
  },
  inventoryStatLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  inventoryStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commonText: {
    color: '#aaa8a0',
  },
  uncommonText: {
    color: '#0F0F0F',
  },
  rareText: {
    color: '#0d94d7',
  },
  epicText: {
    color: '#0ddc94',
  },
  legendaryText: {
    color: '#FFBF00',
  },
  mythicText: {
    color: '#c31429',
  },
  seasonalText: {
    color: '#BFEFFF',
  },
  vaultedText: {
    color: '#8b5cf6',
  },
});