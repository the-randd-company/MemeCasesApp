import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import ScrollFrame from './src/Scenes/CaseOpening/ScrollFrame';
import BottomNavBar from './src/BottomNavBar';
import TopBar from './src/TopBar';
import InventoryScene from './src/Scenes/Inventory';
import CaseShop from './src/Scenes/Shop';
import ClickerButton from './src/ClickerButton';
import UpgradesScene from './src/Scenes/Upgrades';
import { getMoney, setMoney as setMoneyStorage, getUpgrades, fixCorruptedData } from './src/DataStorage';
import RebirthScene from './src/Scenes/Rebirthing/Rebirth';

const ProfileScene = () => (
  <View style={styles.sceneContainer}>
    <Text style={styles.sceneText}>Profile Scene</Text>
  </View>
);

const App = () => {
  const [mainScene, setMainScene] = useState('caseshop');
  const [money, setMoney] = useState(1000);
  const [openingCase, setOpeningCase] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentCase, setCurrentCase] = useState(null);

  // Upgrade states
  const [clickerPower, setClickerPower] = useState(1);
  const [caseSpeed, setCaseSpeed] = useState(10);
  const [rebirthMultiplier, setRebirthMultiplier] = useState(1);
  const [autoClickPower, setAutoClickPower] = useState(0);

  // Load money and upgrades on app start with corruption fix
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    // First fix any corrupted data
    await fixCorruptedData();
    
    // Then load the corrected data
    await loadMoney();
    await loadUpgrades();
  };

  const loadMoney = async () => {
    const currentMoney = await getMoney();
    setMoney(currentMoney);
  };

  // Helper to persist both memory and storage
  const persistMoney = async (newAmount) => {
    setMoney(newAmount);
    await setMoneyStorage(newAmount);
  };

  const openCaseFromShop = (caseData) => {
    console.log('Opening case:', caseData); // Debug log
    setCurrentCase(caseData);
    setOpeningCase(true);
    setMainScene('caseopening'); // Set a dedicated scene for case opening
  };

  // Handlers after roll result actions
  const handleInventory = () => {
    setOpeningCase(false);
    setMainScene('inventory');
  };
  
  const handleSell = () => {
    setOpeningCase(false);
    setMainScene('caseshop'); // Return to shop after selling
  };
  
  const handleFinish = () => {
    setOpeningCase(false);
    setMainScene('caseshop'); // Return to shop after finishing
  };

  // Instead of setMoney, use persistMoney in these functions
  const updateMoney = (newAmount) => {
    persistMoney(newAmount);
  };

  const handleEarnMoney = async (amount) => {
    if (!amount) return;
    const newMoney = money + amount;
    setMoney(newMoney);
    await setMoneyStorage(newMoney); // Ensure immediate persistence
  };

  // Load upgrades including auto clicker
  const loadUpgrades = async () => {
    const upgrades = await getUpgrades();
    setClickerPower(1 + upgrades.clickerPower);
    setRebirthMultiplier(upgrades.rebirthMultiplier || 1);
    setAutoClickPower(upgrades.autoClickPower || 0);
    
    // Calculate case speed: 10 - (upgrades * 0.1), minimum 3.5
    const baseSpeed = 10;
    const reduction = upgrades.caseSpeed * 0.1;
    const newSpeed = Math.max(3.5, baseSpeed - reduction);
    setCaseSpeed(newSpeed);
  };

  const handleClickerPress = () => {
    // Apply rebirth multiplier to clicker earnings
    const earnAmount = Math.floor(clickerPower * rebirthMultiplier);
    persistMoney(money + earnAmount);
  };

  const renderScene = () => {
    if (openingCase) {
      return (
        <ScrollFrame 
          money={money} 
          updateMoney={updateMoney} 
          onFinish={handleFinish} 
          onInventory={handleInventory} 
          onSell={handleSell} 
          onShowResultChange={setShowResult} 
          caseSpeed={caseSpeed} 
          caseData={currentCase} 
        />
      );
    }
    
    switch (mainScene) {
      case 'inventory':
        return <InventoryScene onEarnMoney={handleEarnMoney} />;
      case 'caseshop':
        return <CaseShop money={money} updateMoney={updateMoney} onCaseBought={openCaseFromShop} />;
      case 'upgrades':
        return <UpgradesScene money={money} updateMoney={updateMoney} onUpgradePurchased={loadUpgrades} />;
      case 'rebirth':
        return <RebirthScene money={money} updateMoney={updateMoney} onUpgradePurchased={loadUpgrades} />;
      case 'profile':
        return <ProfileScene />;
      default:
        return <CaseShop money={money} updateMoney={updateMoney} onCaseBought={openCaseFromShop} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <TopBar money={money} />

      {/* Main content area */}
      <View style={styles.content}>
        {renderScene()}
      </View>

      {/* Clicker button with auto clicker functionality */}
      <ClickerButton 
        onPress={handleClickerPress} 
        clickerPower={clickerPower}
        rebirthMultiplier={rebirthMultiplier}
        autoClickPower={autoClickPower}
      />

      {/* Bottom navigation bar */}
      <BottomNavBar
        activeScene={mainScene}
        onSceneChange={key => {
          if (key === 'cases') {
            setOpeningCase(false);
            setMainScene('caseshop');
            return;
          }
          if (openingCase) {
            if (showResult) {
              setOpeningCase(false);
              setMainScene(key);
            }
            return;
          }
          setMainScene(key);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  sceneContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  sceneText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default App;