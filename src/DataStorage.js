import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  MONEY: '@user_money',
  INVENTORY: '@user_inventory',
  UPGRADES: '@user_upgrades',
  REBIRTH_MULTIPLIER: '@rebirth_multiplier',
  TOTAL_REBIRTHS: '@total_rebirths',
};

// Helper function to validate and fix numbers
const validateNumber = (value, defaultValue = 0) => {
  if (value === null || value === undefined) return defaultValue;
  
  const num = parseFloat(value);
  if (isNaN(num) || !isFinite(num)) {
    return defaultValue;
  }
  return num;
};

// Money operations - FIXED to ensure proper persistence
export const getMoney = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.MONEY);
    if (value !== null) {
      const parsed = validateNumber(value, 1000);
      // If we got NaN and had to use default, save the corrected value
      if (isNaN(parseFloat(value)) || !isFinite(parseFloat(value))) {
        console.log('Fixed corrupted money value:', value, '-> 1000');
        await AsyncStorage.setItem(STORAGE_KEYS.MONEY, '1000');
        return 1000;
      }
      return parsed;
    }
    // Initialize with default money if not exists
    await AsyncStorage.setItem(STORAGE_KEYS.MONEY, '1000');
    return 1000;
  } catch (error) {
    console.error('Error getting money:', error);
    return 1000;
  }
};

export const setMoney = async (amount) => {
  try {
    const validAmount = validateNumber(amount, 0);
    await AsyncStorage.setItem(STORAGE_KEYS.MONEY, validAmount.toString());
    console.log('Money saved to storage:', validAmount); // Debug log
    return true;
  } catch (error) {
    console.error('Error setting money:', error);
    return false;
  }
};

export const addMoney = async (amount) => {
  try {
    const currentMoney = await getMoney();
    const validAmount = validateNumber(amount, 0);
    const newMoney = validateNumber(currentMoney + validAmount, 0);
    await setMoney(newMoney);
    return newMoney;
  } catch (error) {
    console.error('Error adding money:', error);
    return null;
  }
};

export const subtractMoney = async (amount) => {
  try {
    const currentMoney = await getMoney();
    const validAmount = validateNumber(amount, 0);
    if (currentMoney >= validAmount) {
      const newMoney = validateNumber(currentMoney - validAmount, 0);
      await setMoney(newMoney);
      return newMoney;
    }
    return null; // Not enough money
  } catch (error) {
    console.error('Error subtracting money:', error);
    return null;
  }
};

// Inventory operations
export const getInventory = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.INVENTORY);
    return value !== null ? JSON.parse(value) : [];
  } catch (error) {
    console.error('Error getting inventory:', error);
    return [];
  }
};

export const setInventory = async (inventory) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
    return true;
  } catch (error) {
    console.error('Error setting inventory:', error);
    return false;
  }
};

export const addToInventory = async (item) => {
  try {
    const inventory = await getInventory();
    inventory.push(item);
    await setInventory(inventory);
    return true;
  } catch (error) {
    console.error('Error adding to inventory:', error);
    return false;
  }
};

export const removeFromInventory = async (toRemove) => {
  try {
    const inventory = await getInventory();
    const idx = inventory.findIndex((item) =>
      item.id === toRemove.id && item.acquiredAt === toRemove.acquiredAt
    );
    if (idx > -1) {
      inventory.splice(idx, 1);
      await setInventory(inventory);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error removing from inventory:', error);
    return false;
  }
};

// Upgrade operations
export const getUpgrades = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.UPGRADES);
    if (value !== null) {
      const parsed = JSON.parse(value);
      
      // Validate all numeric fields including autoClickPower
      const validated = {
        caseSpeed: validateNumber(parsed.caseSpeed, 0),
        clickerPower: validateNumber(parsed.clickerPower, 0),
        autoClickPower: validateNumber(parsed.autoClickPower, 0),
        rebirthMultiplier: validateNumber(parsed.rebirthMultiplier, 1),
        totalRebirths: validateNumber(parsed.totalRebirths, 0),
      };
      
      // Check if any values were corrupted (NaN)
      const needsCorrection = 
        (parsed.caseSpeed !== undefined && (isNaN(parseFloat(parsed.caseSpeed)) || !isFinite(parsed.caseSpeed))) ||
        (parsed.clickerPower !== undefined && (isNaN(parseFloat(parsed.clickerPower)) || !isFinite(parsed.clickerPower))) ||
        (parsed.autoClickPower !== undefined && (isNaN(parseFloat(parsed.autoClickPower)) || !isFinite(parsed.autoClickPower))) ||
        (parsed.rebirthMultiplier !== undefined && (isNaN(parseFloat(parsed.rebirthMultiplier)) || !isFinite(parsed.rebirthMultiplier))) ||
        (parsed.totalRebirths !== undefined && (isNaN(parseFloat(parsed.totalRebirths)) || !isFinite(parsed.totalRebirths)));
      
      if (needsCorrection) {
        console.log('Fixed corrupted upgrades. Original:', parsed, 'Fixed:', validated);
        await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, JSON.stringify(validated));
      }
      
      return validated;
    }
    
    // Default upgrades
    const defaults = {
      caseSpeed: 0,
      clickerPower: 0,
      autoClickPower: 0,
      rebirthMultiplier: 1,
      totalRebirths: 0,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, JSON.stringify(defaults));
    return defaults;
  } catch (error) {
    console.error('Error getting upgrades:', error);
    const defaults = {
      caseSpeed: 0,
      clickerPower: 0,
      autoClickPower: 0,
      rebirthMultiplier: 1,
      totalRebirths: 0,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, JSON.stringify(defaults));
    return defaults;
  }
};

export const setUpgrades = async (upgrades) => {
  try {
    const validated = {
      caseSpeed: validateNumber(upgrades.caseSpeed, 0),
      clickerPower: validateNumber(upgrades.clickerPower, 0),
      autoClickPower: validateNumber(upgrades.autoClickPower, 0),
      rebirthMultiplier: validateNumber(upgrades.rebirthMultiplier, 1),
      totalRebirths: validateNumber(upgrades.totalRebirths, 0),
    };
    await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, JSON.stringify(validated));
    return true;
  } catch (error) {
    console.error('Error setting upgrades:', error);
    return false;
  }
};

// Clear all data (for testing)
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Auto-fix corrupted data
export const fixCorruptedData = async () => {
  try {
    console.log('Running corruption check and auto-fix...');
    await getMoney();
    await getUpgrades();
    console.log('Corruption check complete');
    return true;
  } catch (error) {
    console.error('Error fixing corrupted data:', error);
    return false;
  }
};

export default {
  getMoney,
  setMoney,
  addMoney,
  subtractMoney,
  getInventory,
  setInventory,
  addToInventory,
  removeFromInventory,
  getUpgrades,
  setUpgrades,
  clearAllData,
  fixCorruptedData,
};