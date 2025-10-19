// RebirthCalculator.js
export const REBIRTH_REQUIREMENT = 1000000;
export const WIPED_RARITIES = ['common', 'rare', 'legendary', 'mythic'];
export const PROTECTED_RARITIES = ['seasonal', 'vaulted', 'special', 'exclusive'];

// Core calculations
export const calculateWipedValue = (inventory) => {
  if (!inventory || !Array.isArray(inventory)) return 0;
  
  return inventory
    .filter(item => item && WIPED_RARITIES.includes(item.rarity?.toLowerCase()))
    .reduce((total, item) => total + (item.value || 0), 0);
};

export const calculateMultiplierGain = (wipedValue) => {
  if (wipedValue < REBIRTH_REQUIREMENT) return 0;
  
  const multiplierGain = 1.2 + 0.1 * Math.log2(wipedValue / REBIRTH_REQUIREMENT);
  return multiplierGain;
};

export const getNextMilestone = (currentValue) => {
  const currentMultiplier = calculateMultiplierGain(currentValue);
  const nextMultiplier = Math.floor((currentMultiplier + 0.099) * 10) / 10;
  
  if (nextMultiplier > 5.0) return null;
  
  const requiredValue = REBIRTH_REQUIREMENT * Math.pow(2, (nextMultiplier - 1.2) / 0.1);
  return {
    multiplier: nextMultiplier,
    value: Math.ceil(requiredValue)
  };
};

// Validation
export const canRebirth = (wipedValue) => wipedValue >= REBIRTH_REQUIREMENT;

// Rebirth execution logic
export const performRebirth = (inventory) => {
  if (!inventory || !Array.isArray(inventory)) return [];
  
  return inventory.filter(item => 
    item && PROTECTED_RARITIES.includes(item.rarity?.toLowerCase())
  );
};