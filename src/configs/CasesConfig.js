// Case images
const COMMON_CASE_IMG = require('../img/memes/PepeTheFrog.jpg');
const RARE_CASE_IMAGE = require('../img/memes/RickRoll.png');
const EPIC_CASE_IMAGE = require('../img/memes/QuandaleDingle.jpg');
const LEGENDARY_CASE_IMAGE = require('../img/memes/SixSeven.jpg');

// Import drops config for case contents
import drops from './DropsConfig';

const CASES_CONFIG = [
  {
    id: 'common_case',
    name: 'Common Case',
    imageSrc: COMMON_CASE_IMG,
    price: 1000,
    rarity: 'common',
    description: 'Basic case with common memes',
    dropWeights: {
      'Pepe the Frog': 40,
      'Brain Overload': 25,
      'Overly Attached Girlfriend': 20,
      'Drake Reacts No': 10,
      'Grumpy Cat': 5,
      'Success Kid': 0,
      'Quandale Dingle': 0,
      'Original Doge': 0,
      'This Is Fine': 0,
      'Rick Roll': 0,
      'SixSeven Kid': 0,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'uncommon_case',
    name: 'Uncommon Case',
    imageSrc: COMMON_CASE_IMG,
    price: 2500,
    rarity: 'uncommon',
    description: 'Case with better uncommon memes',
    dropWeights: {
      'Pepe the Frog': 25,
      'Brain Overload': 20,
      'Overly Attached Girlfriend': 15,
      'Drake Reacts No': 15,
      'Grumpy Cat': 10,
      'Success Kid': 10,
      'Quandale Dingle': 5,
      'Original Doge': 0,
      'This Is Fine': 0,
      'Rick Roll': 0,
      'SixSeven Kid': 0,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'rare_case',
    name: 'Rare Case',
    imageSrc: RARE_CASE_IMAGE,
    price: 7500,
    rarity: 'rare',
    description: 'Case featuring rare meme finds',
    dropWeights: {
      'Pepe the Frog': 15,
      'Brain Overload': 15,
      'Overly Attached Girlfriend': 15,
      'Drake Reacts No': 15,
      'Grumpy Cat': 10,
      'Success Kid': 10,
      'Quandale Dingle': 10,
      'Original Doge': 8,
      'This Is Fine': 2,
      'Rick Roll': 0,
      'SixSeven Kid': 0,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'epic_case',
    name: 'Epic Case',
    imageSrc: EPIC_CASE_IMAGE,
    price: 20000,
    rarity: 'epic',
    description: 'Epic case with valuable memes',
    dropWeights: {
      'Pepe the Frog': 10,
      'Brain Overload': 10,
      'Overly Attached Girlfriend': 10,
      'Drake Reacts No': 15,
      'Grumpy Cat': 15,
      'Success Kid': 10,
      'Quandale Dingle': 10,
      'Original Doge': 10,
      'This Is Fine': 8,
      'Rick Roll': 2,
      'SixSeven Kid': 0,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'legendary_case',
    name: 'Legendary Case',
    imageSrc: LEGENDARY_CASE_IMAGE,
    price: 50000,
    rarity: 'legendary',
    description: 'Legendary case with high-value drops',
    dropWeights: {
      'Pepe the Frog': 5,
      'Brain Overload': 5,
      'Overly Attached Girlfriend': 5,
      'Drake Reacts No': 10,
      'Grumpy Cat': 10,
      'Success Kid': 10,
      'Quandale Dingle': 15,
      'Original Doge': 15,
      'This Is Fine': 15,
      'Rick Roll': 8,
      'SixSeven Kid': 2,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'mythic_case',
    name: 'Mythic Case',
    imageSrc: LEGENDARY_CASE_IMAGE,
    price: 125000,
    rarity: 'mythic',
    description: 'Mythic case with ultra-rare finds',
    dropWeights: {
      'Pepe the Frog': 2,
      'Brain Overload': 3,
      'Overly Attached Girlfriend': 5,
      'Drake Reacts No': 8,
      'Grumpy Cat': 10,
      'Success Kid': 10,
      'Quandale Dingle': 15,
      'Original Doge': 15,
      'This Is Fine': 15,
      'Rick Roll': 10,
      'SixSeven Kid': 5,
      'Bad Luck Brian': 2,
      'Troll Face': 0,
    },
  },
  {
    id: 'premium_case',
    name: 'Premium Case',
    imageSrc: EPIC_CASE_IMAGE,
    price: 300000,
    rarity: 'premium',
    description: 'Premium case with exclusive drops',
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 5,
      'Overly Attached Girlfriend': 5,
      'Drake Reacts No': 10,
      'Grumpy Cat': 10,
      'Success Kid': 10,
      'Quandale Dingle': 15,
      'Original Doge': 15,
      'This Is Fine': 15,
      'Rick Roll': 10,
      'SixSeven Kid': 8,
      'Bad Luck Brian': 5,
      'Troll Face': 2,
    },
  },
  {
    id: 'elite_case',
    name: 'Elite Case',
    imageSrc: RARE_CASE_IMAGE,
    price: 750000,
    rarity: 'elite',
    description: 'Elite case for serious collectors',
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 5,
      'Drake Reacts No': 8,
      'Grumpy Cat': 10,
      'Success Kid': 10,
      'Quandale Dingle': 15,
      'Original Doge': 15,
      'This Is Fine': 15,
      'Rick Roll': 12,
      'SixSeven Kid': 10,
      'Bad Luck Brian': 8,
      'Troll Face': 2,
    },
  },
  {
    id: 'master_case',
    name: 'Master Case',
    imageSrc: LEGENDARY_CASE_IMAGE,
    price: 1500000,
    rarity: 'master',
    description: 'Master case with legendary potential',
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 0,
      'Drake Reacts No': 5,
      'Grumpy Cat': 8,
      'Success Kid': 10,
      'Quandale Dingle': 15,
      'Original Doge': 15,
      'This Is Fine': 15,
      'Rick Roll': 15,
      'SixSeven Kid': 12,
      'Bad Luck Brian': 10,
      'Troll Face': 5,
    },
  },
  {
    id: 'ultimate_case',
    name: 'Ultimate Case',
    imageSrc: LEGENDARY_CASE_IMAGE,
    price: 3000000,
    rarity: 'ultimate',
    description: 'The ultimate case for the rarest memes',
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 0,
      'Drake Reacts No': 0,
      'Grumpy Cat': 5,
      'Success Kid': 8,
      'Quandale Dingle': 12,
      'Original Doge': 15,
      'This Is Fine': 15,
      'Rick Roll': 15,
      'SixSeven Kid': 15,
      'Bad Luck Brian': 10,
      'Troll Face': 5,
    },
  },
];

// Helper function to get case by ID
export const getCaseById = (id) => {
  return CASES_CONFIG.find(caseItem => caseItem.id === id);
};

// Helper function to get all cases
export const getAllCases = () => {
  return CASES_CONFIG;
};

// Helper function to get cases by rarity
export const getCasesByRarity = (rarity) => {
  return CASES_CONFIG.filter(caseItem => caseItem.rarity === rarity);
};

// Helper function to get case drops with proper weighting
export const getCaseDrops = (caseId) => {
  const caseItem = getCaseById(caseId);
  if (!caseItem || !caseItem.dropWeights) return {};
  
  // Calculate percentages from weights
  const weights = caseItem.dropWeights;
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  
  const percentages = {};
  Object.keys(weights).forEach(itemName => {
    percentages[itemName] = weights[itemName] / totalWeight;
  });
  
  return percentages;
};

export default CASES_CONFIG;