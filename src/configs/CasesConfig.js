// Case images
const COMMON_CASE_IMG = require('../img/memes/PepeTheFrog.jpg');
const RARE_CASE_IMAGE = require('../img/memes/RickRoll.png');
const EPIC_CASE_IMAGE = require('../img/memes/QuandaleDingle.jpg');
const LEGENDARY_CASE_IMAGE = require('../img/memes/SixSeven.jpg');

// Import drops config for case contents
import drops from './DropsConfig';

const countTotalVaultedDrops = (dropsConfig) => {
  return dropsConfig.filter(dropItem => dropItem.rarity === 'Vaulted').length;
}

const totalVaulted = countTotalVaultedDrops(drops);
const VAULTED_RARITY = totalVaulted > 0 ? (1 / (totalVaulted * 10)) : 0;

export const CASES_CONFIG = [
  {
    "id": "common_case",
    "name": "Common Case",
    "price": 1000,
    "rarity": "common",
    "imageSrc": require('../img/memes/SnoopDogg.jpg'),
    "description": "Common case with 8 meme drops",
    "dropWeights": {
      //Common: 75
      'High Expectations': 75/4,
      'Foul Frog': 75/4,
      'Pepe the Frog': 75/4,
      'Snoop Dogg': 75/5,
      //Uncommon: 25
      'Left Shark': 25/3,
      'Drake Reacts No': 25/3,
      'Be Like Bill': 25/3,
    }
  },
  {
    "id": "uncommon_case",
    "name": "Uncommon Case",
    "price": 7500,
    "rarity": "uncommon",
    "imageSrc": require('../img/memes/AwesomePenguin.jpg'),
    "description": "Uncommon case with 8 meme drops",
    "dropWeights": {
      // Common: 15
      'Burbaloni Luliloli': 15/3,
      'Overly Attached Girlfriend': 15/3,
      'Brain Overload': 15/3,
      // Uncommon: 60
      'Insanity Wolf': 60/3,
      'Bombini Guzzini': 60/3,
      'Hard To Swallow Pills': 60/3,
      // Rare: 25
      'Good Guy Greg': 25/3,
      'Awesome Penguin': 25/3,
      'Nobody...': 25/3,
    }
  },
  {
    "id": "rare_case",
    "name": "Rare Case",
    "price": 22500,
    "rarity": "rare",
    "imageSrc": require('../img/memes/OriginalDoge.jpg'),
    "description": "Rare case with 8 meme drops",
    "dropWeights": {
      //Uncommon: 10,
      'Dramatic Chipmunk': 10/3,
      'Success Kid': 10/3,
      'Lawyer Dog': 10/3,
      //Rare: 65,
      'Sad Pablo': 65/3,
      'Original Doge': 65/3,
      'Grumpy Cat': 65/3,
      //Epic: 25,
      'Ice Bucket Challenge': 25/2,
      'Awkward Monkey': 25/2,
    }
  },
  {
    "id": "epic_case",
    "name": "Epic Case",
    "price": 87500,
    "rarity": "epic",
    "imageSrc": require('../img/memes/RickRoll.png'),
    "description": "Epic case with 8 meme drops",
    "dropWeights": {
      //Rare: 15,
      'Quandale Dingle': 15/3,
      'Good Guy Greg': 15/3,
      'Capuchino Assassino': 15/3,
      //Epic: 55,
      'Kermit Sips Tea': 55/3,
      'Happy Hank': 55/3,
      'Chimpanzini Bananini': 55/3,
      //Legendary: 25,
      'Rick Roll': 30/2,
      'Brr Brr Patapim': 30/2,
    }
  },
  {
    "id": "legendary_case",
    "name": "Legendary Case",
    "price": 475000,
    "rarity": "legendary",
    "imageSrc": require('../img/memes/BongoCat.jpg'),
    "description": "Legendary case with 8 meme drops",
    "dropWeights": {
      //Epic: 15,
      'Happy Hank': 15/3,
      'Distracted Boyfriend': 15/3,
      'Larili Larila': 15/3,
      //Legendary: 65,
      'Awkward Penguin': 65/3,
      'Bombadiro Crocodilo': 65/3,
      'Ancient Aliens': 65/3,
      //Mythic: 20,
      'Bad Luck Brian': 20/3,
      'Bongo Cat': 20/3,
      'Dat Boi': 20/3,
    }
  },
  {
    "id": "mythic_case",
    "name": "Mythic Case",
    "price": 1350000,
    "rarity": "mythic",
    "imageSrc": require('../img/memes/SixSeven.jpg'),
    "description": "Mythic case with 8 meme drops",
    "dropWeights": {
      //Legendary: 65,
      'SixSeven Kid': 65/4,
      'Disaster Girl': 65/4,
      'Keyboard Cat': 65/4,
      'Nervous Blinking': 65/4,
      //Mythic: 35,
      'My Name Is Jeff': 35/4,
      'Evil Kermit': 35/4,
      'Italiano Combiniano': 35/4,
      'Troll Face': 35/4,
      //Vaulted:
      'Epstein Files': VAULTED_RARITY,
      'Phenomenal Penguin': VAULTED_RARITY,
    }
  }
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