import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  MONEY: '@user_money',
  INVENTORY: '@user_inventory',
  UPGRADES: '@user_upgrades',
  PRESTIGE_MULTIPLIER: '@prestige_multiplier',
  TOTAL_PRESTIGES: '@total_prestiges',
  HAS_SEEN_TUTORIAL: '@has_seen_tutorial',
  CASES_OPENED: '@cases_opened', // Add this line
};

// Centralized default values
const DEFAULTS = {
  MONEY: 1000,
  INVENTORY: [],
  UPGRADES: {
    caseSpeed: 0,
    clickerPower: 0,
    autoClickPower: 0,
    prestigeMultiplier: 1,
    totalPrestiges: 0,
  },
  HAS_SEEN_TUTORIAL: false,
  CASES_OPENED: 0, // Add this line
};

// Add these functions to DataStorage.js
export const getHasSeenTutorial = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.HAS_SEEN_TUTORIAL);
    if (value !== null) {
      return value === 'true';
    }
    // Initialize with default if not exists
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_SEEN_TUTORIAL, DEFAULTS.HAS_SEEN_TUTORIAL.toString());
    return DEFAULTS.HAS_SEEN_TUTORIAL;
  } catch (error) {
    console.error('Error getting tutorial status:', error);
    return DEFAULTS.HAS_SEEN_TUTORIAL;
  }
};

export const setHasSeenTutorial = async (hasSeen) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_SEEN_TUTORIAL, hasSeen.toString());
    return true;
  } catch (error) {
    console.error('Error setting tutorial status:', error);
    return false;
  }
};

// In DataStorage.js - FIX the getCasesOpened function
export const getCasesOpened = async () => {
  try {
    // FIX: Use STORAGE_KEYS.CASES_OPENED instead of hardcoded string
    const value = await AsyncStorage.getItem(STORAGE_KEYS.CASES_OPENED);
    if (value !== null) {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? DEFAULTS.CASES_OPENED : parsed;
    }
    // Initialize with default if not exists
    await AsyncStorage.setItem(STORAGE_KEYS.CASES_OPENED, DEFAULTS.CASES_OPENED.toString());
    return DEFAULTS.CASES_OPENED;
  } catch (error) {
    console.error('Error getting cases opened:', error);
    return DEFAULTS.CASES_OPENED;
  }
};

export const setCasesOpened = async (count) => {
  try {
    const validCount = validateNumber(count, DEFAULTS.CASES_OPENED);
    await AsyncStorage.setItem(STORAGE_KEYS.CASES_OPENED, validCount.toString());
    console.log('Cases opened saved to storage:', validCount);
    return true;
  } catch (error) {
    console.error('Error setting cases opened:', error);
    return false;
  }
};

export const incrementCasesOpened = async () => {
  try {
    const currentCount = await getCasesOpened(); // This now uses the fixed function
    const newCount = currentCount + 1;
    await setCasesOpened(newCount);
    console.log('Incremented cases opened:', currentCount, '->', newCount); // Debug
    return newCount;
  } catch (error) {
    console.error('Error incrementing cases opened:', error);
    return null;
  }
};

// Update resetAllData function to include cases opened
export const resetAllData = async () => {
  try {
    console.log('Resetting all data to defaults...');
    
    await AsyncStorage.setItem(STORAGE_KEYS.MONEY, DEFAULTS.MONEY.toString());
    await AsyncStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(DEFAULTS.INVENTORY));
    await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, JSON.stringify(DEFAULTS.UPGRADES));
    await AsyncStorage.setItem(STORAGE_KEYS.HAS_SEEN_TUTORIAL, DEFAULTS.HAS_SEEN_TUTORIAL.toString());
    await AsyncStorage.setItem(STORAGE_KEYS.CASES_OPENED, DEFAULTS.CASES_OPENED.toString());
    
    // If you're using separate keys for prestige data, reset those too
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PRESTIGE_MULTIPLIER, DEFAULTS.UPGRADES.prestigeMultiplier.toString());
      await AsyncStorage.setItem(STORAGE_KEYS.TOTAL_PRESTIGES, DEFAULTS.UPGRADES.totalPrestiges.toString());
    } catch (error) {
      console.log('Note: Separate prestige keys not used or already handled in upgrades');
    }
    
    console.log('All data reset successfully');
    return true;
  } catch (error) {
    console.error('Error resetting all data:', error);
    return false;
  }
};

// Helper function to validate and fix numbers
const validateNumber = (value, defaultValue) => {
  if (value === null || value === undefined) return defaultValue;
  
  const num = parseFloat(value);
  if (isNaN(num) || !isFinite(num)) {
    return defaultValue;
  }
  return num;
};

// Money operations
export const getMoney = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.MONEY);
    if (value !== null) {
      const parsed = validateNumber(value, DEFAULTS.MONEY);
      // If we got NaN and had to use default, save the corrected value
      if (isNaN(parseFloat(value)) || !isFinite(parseFloat(value))) {
        console.log('Fixed corrupted money value:', value, '->', DEFAULTS.MONEY);
        await AsyncStorage.setItem(STORAGE_KEYS.MONEY, DEFAULTS.MONEY.toString());
        return DEFAULTS.MONEY;
      }
      return parsed;
    }
    // Initialize with default money if not exists
    await AsyncStorage.setItem(STORAGE_KEYS.MONEY, DEFAULTS.MONEY.toString());
    return DEFAULTS.MONEY;
  } catch (error) {
    console.error('Error getting money:', error);
    return DEFAULTS.MONEY;
  }
};

export const setMoney = async (amount) => {
  try {
    const validAmount = validateNumber(amount, DEFAULTS.MONEY);
    await AsyncStorage.setItem(STORAGE_KEYS.MONEY, validAmount.toString());
    console.log('Money saved to storage:', validAmount);
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
    const newMoney = validateNumber(currentMoney + validAmount, DEFAULTS.MONEY);
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
      const newMoney = validateNumber(currentMoney - validAmount, DEFAULTS.MONEY);
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
    return value !== null ? JSON.parse(value) : DEFAULTS.INVENTORY;
  } catch (error) {
    console.error('Error getting inventory:', error);
    return DEFAULTS.INVENTORY;
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

// Helper function to validate an object with numeric fields
const validateObject = (obj, defaults) => {
  const validated = {};
  let needsCorrection = false;
  
  for (const key in defaults) {
    validated[key] = validateNumber(obj[key], defaults[key]);
    
    // Check if this field was corrupted
    if (obj[key] !== undefined && (isNaN(parseFloat(obj[key])) || !isFinite(obj[key]))) {
      needsCorrection = true;
    }
  }
  
  return { validated, needsCorrection };
};

// Upgrade operations
export const getUpgrades = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.UPGRADES);
    if (value !== null) {
      const parsed = JSON.parse(value);
      const { validated, needsCorrection } = validateObject(parsed, DEFAULTS.UPGRADES);
      
      if (needsCorrection) {
        console.log('Fixed corrupted upgrades. Original:', parsed, 'Fixed:', validated);
        await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, JSON.stringify(validated));
      }
      
      return validated;
    }
    
    // Initialize with defaults
    await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, JSON.stringify(DEFAULTS.UPGRADES));
    return DEFAULTS.UPGRADES;
  } catch (error) {
    console.error('Error getting upgrades:', error);
    await AsyncStorage.setItem(STORAGE_KEYS.UPGRADES, JSON.stringify(DEFAULTS.UPGRADES));
    return DEFAULTS.UPGRADES;
  }
};

export const setUpgrades = async (upgrades) => {
  try {
    const { validated } = validateObject(upgrades, DEFAULTS.UPGRADES);
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
    await getCasesOpened(); // Add this line
    console.log('Corruption check complete');
    return true;
  } catch (error) {
    console.error('Error fixing corrupted data:', error);
    return false;
  }
};

// Update the default export to include the new functions
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
  resetAllData,
  getCasesOpened, // Add this
  setCasesOpened, // Add this
  incrementCasesOpened, // Add this
};