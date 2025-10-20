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
    price: 1000,
    rarity: 'common',
    description: 'Basic case with common memes',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Snoop Dogg': 4,
      'Pepe the Frog': 30,
      'Brain Overload': 30,
      'Overly Attached Girlfriend': 30,
      'Drake Reacts No': 6,
      'Grumpy Cat': 0,
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
    price: 2500,
    rarity: 'uncommon',
    description: 'Case with better uncommon memes',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Snoop Dogg': 7,
      'Pepe the Frog': 15,
      'Brain Overload': 25,
      'Overly Attached Girlfriend': 25,
      'Drake Reacts No': 13,
      'Grumpy Cat': 10,
      'Success Kid': 5,
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
    id: 'rare_case',
    name: 'Rare Case',
    price: 7500,
    rarity: 'rare',
    description: 'Case featuring rare meme finds',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Snoop Dogg': 0,
      'Pepe the Frog': 10,
      'Brain Overload': 15,
      'Overly Attached Girlfriend': 15,
      'Drake Reacts No': 21,
      'Grumpy Cat': 15,
      'Success Kid': 15,
      'Quandale Dingle': 10,
      'Original Doge': 0,
      'This Is Fine': 0,
      'Rick Roll': 0,
      'SixSeven Kid': 0,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'epic_case',
    name: 'Epic Case',
    price: 17500,
    rarity: 'epic',
    description: 'Epic case with valuable memes',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Snoop Dogg': 0,
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 5,
      'Drake Reacts No': 20,
      'Grumpy Cat': 20,
      'Success Kid': 25,
      'Quandale Dingle': 18,
      'Original Doge': 7,
      'This Is Fine': 0,
      'Rick Roll': 0,
      'SixSeven Kid': 0,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'legendary_case',
    name: 'Legendary Case',
    price: 50000,
    rarity: 'legendary',
    description: 'Legendary case with high-value drops',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Snoop Dogg': 0,
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 0,
      'Drake Reacts No': 10,
      'Grumpy Cat': 25,
      'Success Kid': 25,
      'Quandale Dingle': 20,
      'Original Doge': 13,
      'This Is Fine': 7,
      'Rick Roll': 0,
      'SixSeven Kid': 0,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'mythic_case',
    name: 'Mythic Case',
    price: 200000,
    rarity: 'mythic',
    description: 'Mythic case with ultra-rare finds',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 0,
      'Drake Reacts No': 0,
      'Grumpy Cat': 19,
      'Success Kid': 25,
      'Quandale Dingle': 21,
      'Original Doge': 14,
      'This Is Fine': 13,
      'Rick Roll': 6,
      'SixSeven Kid': 0,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'premium_case',
    name: 'Premium Case',
    price: 1000000,
    rarity: 'premium',
    description: 'Premium case with exclusive drops',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 0,
      'Drake Reacts No': 0,
      'Grumpy Cat': 0,
      'Success Kid': 10,
      'Quandale Dingle': 25,
      'Original Doge': 25,
      'This Is Fine': 14,
      'Rick Roll': 15,
      'SixSeven Kid': 11,
      'Bad Luck Brian': 0,
      'Troll Face': 0,
    },
  },
  {
    id: 'elite_case',
    name: 'Elite Case',
    price: 2750000,
    rarity: 'elite',
    description: 'Elite case for serious collectors',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 0,
      'Drake Reacts No': 0,
      'Grumpy Cat': 0,
      'Success Kid': 0,
      'Quandale Dingle': 10,
      'Original Doge': 15,
      'This Is Fine': 20,
      'Rick Roll': 20,
      'SixSeven Kid': 17,
      'Bad Luck Brian': 13,
      'Troll Face': 5,
    },
  },
  {
    id: 'master_case',
    name: 'Master Case',
    price: 6500000,
    rarity: 'master',
    description: 'Master case with legendary potential',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 0,
      'Drake Reacts No': 0,
      'Grumpy Cat': 0,
      'Success Kid': 0,
      'Quandale Dingle': 0,
      'Original Doge': 10,
      'This Is Fine': 20,
      'Rick Roll': 25,
      'SixSeven Kid': 20,
      'Bad Luck Brian': 15,
      'Troll Face': 10,
    },
  },
  {
    id: 'ultimate_case',
    name: 'Ultimate Case',
    price: 15000000,
    rarity: 'ultimate',
    description: 'The ultimate case for the rarest memes',
    imageSrc: LEGENDARY_CASE_IMAGE,
    dropWeights: {
      'Pepe the Frog': 0,
      'Brain Overload': 0,
      'Overly Attached Girlfriend': 0,
      'Drake Reacts No': 0,
      'Grumpy Cat': 0,
      'Success Kid': 0,
      'Quandale Dingle': 0,
      'Original Doge': 0,
      'This Is Fine': 13,
      'Rick Roll': 23,
      'SixSeven Kid': 24,
      'Bad Luck Brian': 25,
      'Troll Face': 20,
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