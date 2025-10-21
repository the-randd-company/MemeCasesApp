// ProfileScene.js (Refactored)
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { getInventory, getUpgrades } from '../DataStorage';

// Import subcomponents
import { ProfileHeader } from './Profile/ProfileHeader';
import { MoneyDisplay } from './Profile/MoneyDisplay';
import { TabNavigation } from './Profile/TabNavigation';
import { UpgradeStats } from './Profile/UpgradeStats';
import { InventoryStats } from './Profile/InventoryStats';
import { GameProgress } from './Profile/GameProgress';
import { AchievementList } from './Profile/AchievementList';
import { ResetButton } from './Profile/ResetButton';

export const ProfileScene = ({ money, onResetData }) => {
  const [inventory, setInventory] = useState([]);
  const [upgrades, setUpgrades] = useState({});
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const savedInventory = await getInventory();
    const savedUpgrades = await getUpgrades();
    
    setInventory(savedInventory || []);
    setUpgrades(savedUpgrades || {});
  };

  // Calculate stats
  const totalItems = inventory.length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.value || 0), 0);
  const caseSpeedLevel = upgrades.caseSpeed || 0;
  const clickerPowerLevel = upgrades.clickerPower || 0;
  const prestigeMultiplier = upgrades.prestigeMultiplier || 1;
  const totalPrestiges = upgrades.totalPrestiges || 0;

  return (
    <View style={styles.container}>
      <ProfileHeader 
        totalValue={totalValue}
        totalItems={totalItems}
        totalPrestiges={totalPrestiges}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <MoneyDisplay money={money} />

        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'stats' && (
          <View style={styles.contentSection}>
            <UpgradeStats
              caseSpeedLevel={caseSpeedLevel}
              clickerPowerLevel={clickerPowerLevel}
              prestigeMultiplier={prestigeMultiplier}
            />

            <InventoryStats inventory={inventory} />

            <GameProgress
              totalItems={totalItems}
              totalValue={totalValue}
              totalPrestiges={totalPrestiges}
              prestigeMultiplier={prestigeMultiplier}
            />

            <ResetButton onResetData={onResetData} />
          </View>
        )}

        {activeTab === 'achievements' && (
          <View style={styles.contentSection}>
            <AchievementList
              totalPrestiges={totalPrestiges}
              totalValue={totalValue}
              totalItems={totalItems}
              caseSpeedLevel={caseSpeedLevel}
            />
          </View>
        )}

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  contentSection: {
    flex: 1,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default ProfileScene;