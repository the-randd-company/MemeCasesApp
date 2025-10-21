// Updated App.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import Shop from './src/Scenes/ShopScene';
import ClickerButton from './src/ClickerButton';
import UpgradesScene from './src/Scenes/UpgradesScene';
import { 
  getMoney, 
  setMoney as setMoneyStorage, 
  getUpgrades, 
  fixCorruptedData, 
  resetAllData,
  getHasSeenTutorial,
  setHasSeenTutorial,
  incrementCasesOpened,
  getCasesOpened,
} from './src/DataStorage';
import PrestigeScene from './src/Scenes/PrestigeScene';
import IAPShop from './src/Scenes/Shop/IAPShop';
import ProfileScene from './src/Scenes/ProfileScene';
import TutorialScene from './src/Scenes/TutorialScene'; // Add this import
import useAppImagePreloader from './src/utils/AppImagePreloader';

// Improved formatMoney function with better NaN protection
const formatMoney = (amount) => {
  let num = Number(amount);

  if (isNaN(num) || !isFinite(num) || num <= 0) return '0';
  if (num < 1000) return Math.floor(num).toString();

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No'];

  let tier = Math.floor(Math.log10(num) / 3);
  if (tier >= suffixes.length) tier = suffixes.length - 1;

  const scale = num / Math.pow(10, tier * 3);
  let formatted = scale.toFixed(3); // Always 3 decimal places initially

  // Remove trailing zeros and possible leftover decimal point
  formatted = formatted.replace(/\.?0+$/, '');

  return formatted + suffixes[tier];
};

const App = () => {
  const [mainScene, setMainScene] = useState('shop');
  const [money, setMoney] = useState(1000);
  const [openingCase, setOpeningCase] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [currentCase, setCurrentCase] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false); 
  const [totalCasesOpened, setTotalCasesOpened] = useState(0);

  // Upgrade states
  const [clickerPower, setClickerPower] = useState(1);
  const [caseSpeed, setCaseSpeed] = useState(10);
  const [prestigeMultiplier, setPrestigeMultiplier] = useState(1);
  const [autoClickPower, setAutoClickPower] = useState(0);

  // Call the hook at the top level of the component
  useAppImagePreloader();

  // Load money and upgrades on app start with corruption fix
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // First fix any corrupted data
      await fixCorruptedData();
      
      // Then load the corrected data
      await loadMoney();
      await loadUpgrades();

      await loadCasesOpened();

      // Check if user has seen tutorial
      const hasSeenTutorial = await getHasSeenTutorial();
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    } catch (error) {
      console.error('Error initializing app:', error);
      // Set default money if initialization fails
      setMoney(1000);
      setTotalCasesOpened(0);
    }
  };

  // Add this new function to load cases opened count
const loadCasesOpened = async () => {
  try {
    // You'll need to create this function in DataStorage.js
    const casesOpened = await getCasesOpened();
    setTotalCasesOpened(casesOpened || 0);
  } catch (error) {
    console.error('Error loading cases opened:', error);
    setTotalCasesOpened(0);
  }
};

  const loadMoney = async () => {
    try {
      const currentMoney = await getMoney();
      // Ensure we have a valid number
      const validatedMoney = Number(currentMoney);
      if (isNaN(validatedMoney) || !isFinite(validatedMoney)) {
        console.warn('Invalid money value loaded, resetting to 1000');
        setMoney(1000);
        await setMoneyStorage(1000);
      } else {
        setMoney(validatedMoney);
      }
    } catch (error) {
      console.error('Error loading money:', error);
      setMoney(1000);
    }
  };

  // Helper to persist both memory and storage with validation
  const persistMoney = async (newAmount) => {
    try {
      const validatedAmount = Number(newAmount);
      if (isNaN(validatedAmount) || !isFinite(validatedAmount)) {
        console.error('Attempted to set invalid money value:', newAmount);
        return;
      }
      
      setMoney(validatedAmount);
      await setMoneyStorage(validatedAmount);
    } catch (error) {
      console.error('Error persisting money:', error);
    }
  };

  const handleResetAllData = async () => {
    try {
      await resetAllData();
      // After resetting, reload the data to update the state
      await loadMoney();
      await loadUpgrades();
      await loadCasesOpened();
      // Show tutorial again after reset
      setShowTutorial(true);
      console.log('All data reset and state updated');
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  const handleTutorialComplete = async () => {
    try {
      await setHasSeenTutorial(true);
      setShowTutorial(false);
    } catch (error) {
      console.error('Error saving tutorial status:', error);
      setShowTutorial(false);
    }
  };

  const openCaseFromShop = (caseData) => {
    console.log('Opening case:', caseData);
    setCurrentCase(caseData);
    setOpeningCase(true);
    setMainScene('caseopening');

    // Increment the cases opened counter and update state
    incrementCasesOpened().then(newCount => {
      if (newCount !== null) {
        setTotalCasesOpened(newCount);
      }
    });
  };

  // Handlers after roll result actions
  const handleInventory = () => {
    setOpeningCase(false);
    setMainScene('inventory');
  };
  
  const handleSell = () => {
    setOpeningCase(false);
    setMainScene('shop');
  };
  
  const handleFinish = () => {
    setOpeningCase(false);
    setMainScene('shop');
  };

  // Handle spinning state changes from ScrollFrame
  const handleSpinningChange = (spinning) => {
    setIsSpinning(spinning);
  };

  const updateMoney = (newAmount) => {
    persistMoney(newAmount);
  };

  const handleEarnMoney = async (amount) => {
    if (!amount) return;
    
    const validatedAmount = Number(amount);
    if (isNaN(validatedAmount) || !isFinite(validatedAmount)) {
      console.error('Invalid earn amount:', amount);
      return;
    }
    
    const newMoney = money + validatedAmount;
    await persistMoney(newMoney);
  };

  // Load upgrades including auto clicker
  const loadUpgrades = async () => {
    try {
      const upgrades = await getUpgrades();
      
      // Validate and set upgrades with defaults
      setClickerPower(1 + (Number(upgrades.clickerPower) || 0));
      setPrestigeMultiplier(Number(upgrades.prestigeMultiplier) || 1);
      setAutoClickPower(Number(upgrades.autoClickPower) || 0);
      
      const baseSpeed = 10;
      const reduction = (Number(upgrades.caseSpeed) || 0) * 0.1;
      const newSpeed = Math.max(3.5, baseSpeed - reduction);
      setCaseSpeed(newSpeed);
    } catch (error) {
      console.error('Error loading upgrades:', error);
      // Set default values if loading fails
      setClickerPower(1);
      setPrestigeMultiplier(1);
      setAutoClickPower(0);
      setCaseSpeed(10);
    }
  };

  // FIXED: Use functional state updates to avoid stale closure
  const handleClickerPress = useCallback((amount) => {
    if (!amount || isNaN(amount) || !isFinite(amount)) return;
    
    setMoney(prevMoney => {
      const newMoney = prevMoney + amount;
      // Async persist without blocking
      setMoneyStorage(newMoney).catch(error => {
        console.error('Error persisting click money:', error);
      });
      return newMoney;
    });
  }, []);

  // FIXED: Use functional state updates to avoid stale closure
  const handleAutoClickEarnings = useCallback((amount) => {
    if (!amount || isNaN(amount) || !isFinite(amount)) return;
  
    setMoney(prevMoney => {
      const newMoney = prevMoney + amount;
      // Async persist without blocking
      setMoneyStorage(newMoney).catch(error => {
        console.error('Error persisting auto-click money:', error);
      });
      return newMoney;
    });
  }, []);

  const handleMoneyPress = () => {
    setOpeningCase(false);
    setMainScene('iapshop');
  };

  // Show tutorial if it hasn't been seen
  if (showTutorial) {
    return (
      <SafeAreaView style={styles.container}>
        <TutorialScene onContinue={handleTutorialComplete} />
      </SafeAreaView>
    );
  }

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
          onSpinningChange={handleSpinningChange}
        />
      );
    }
    
    switch (mainScene) {
      case 'inventory':
        return <InventoryScene onEarnMoney={handleEarnMoney} />;
      case 'shop':
        return <Shop money={money} updateMoney={updateMoney} onCaseBought={openCaseFromShop} />;
      case 'upgrades':
        return <UpgradesScene money={money} updateMoney={updateMoney} onUpgradePurchased={loadUpgrades} />;
      case 'prestige':
        return <PrestigeScene money={money} updateMoney={updateMoney} onUpgradePurchased={loadUpgrades} />;
      case 'profile':
        return <ProfileScene money={money} onResetData={handleResetAllData} totalCasesOpened={totalCasesOpened}/>;
      case 'iapshop':
        return <IAPShop />;
      default:
        return <Shop money={money} updateMoney={updateMoney} onCaseBought={openCaseFromShop} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar with formatted money - now safely formatted */}
      <TopBar money={formatMoney(money)} onMoneyPress={handleMoneyPress} />

      {/* Main content area */}
      <View style={styles.content}>
        {renderScene()}
      </View>

      {/* Clicker button with auto clicker functionality - Hidden when spinning */}
      {!isSpinning && (
        <ClickerButton 
          onPress={handleClickerPress} 
          onAutoClick={handleAutoClickEarnings} 
          clickerPower={clickerPower}
          prestigeMultiplier={prestigeMultiplier}
          autoClickPower={autoClickPower}
        />
      )}

      {/* Bottom navigation bar */}
      <BottomNavBar
        activeScene={mainScene === 'iapshop' ? 'profile' : mainScene}
        onSceneChange={key => {
          if (key === 'cases') {
            setOpeningCase(false);
            setMainScene('shop');
            return;
          }
          if (key === 'profile') {
            setOpeningCase(false);
            setMainScene('profile');
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