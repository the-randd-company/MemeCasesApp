// Case images
const COMMON_CASE_IMG = require('../img/memes/common/SnoopDogg.webp')
const UNCOMMON_CASE_IMG = require('../img/memes/rare/AwesomePenguin.webp');
const RARE_CASE_IMAGE = require('../img/memes/rare/OriginalDoge.webp');
const EPIC_CASE_IMAGE = require('../img/memes/legendary/RickRoll.webp');
const LEGENDARY_CASE_IMAGE = require('../img/memes/legendary/SixSeven.webp');
const MYTHIC_CASE_IMAGE = require('../img/memes/mythic/BadLuckBrian.webp');


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
    "imageSrc": COMMON_CASE_IMG,
    "description": "90% Common, 10% Uncommon.",
    "dropWeights": {
      //Common: 90
      'High Expectations': 90/9,
      'Foul Frog': 90/9,
      'Pepe the Frog': 90/9,
      'Snoop Dogg': 90/9,
      'Paranoid Parrot': 90/9,
      'One Does Not Simply...': 90/9,
      'Lionardo DiCaprio Point': 90/9,
      'Withered Wojak': 90/9,
      'Distrought Wojak': 90/9,
      //Uncommon: 10
      'Left Shark': 10/5,
      'Drake Reacts No': 10/5,
      'Be Like Bill': 10/5,
      'Wait What': 10/5,
      'The Modern Founding Father': 10/5,
    }
  },
  {
    "id": "uncommon_case",
    "name": "Uncommon Case",
    "price": 7500,
    "rarity": "uncommon",
    "imageSrc": UNCOMMON_CASE_IMG,
    "description": "10% Common, 60% Uncommon, 30% Rare",
    "dropWeights": {
      // Common: 10
      'Burbaloni Luliloli': 10/5,
      'Overly Attached Girlfriend': 10/5,
      'Brain Overload': 10/5,
      'No No No No No': 10/5,
      'Original Miku': 10/5,
      // Uncommon: 60
      'Insanity Wolf': 60/7,
      'Bombini Guzzini': 60/7,
      'Hard To Swallow Pills': 60/7,
      'Original Wojak': 60/7,
      'GigaChad Wojak': 60/7,
      'Sad Will Smith': 60/7,
      'Hampster Dance': 60/7,
      // Rare: 30
      'Good Guy Greg': 30/5,
      'Awesome Penguin': 30/5,
      'Nobody...': 30/5,
      'Suprised Shaq': 30/5,
      'Squid Game Save': 30/5,
    }
  },
  {
    "id": "rare_case",
    "name": "Rare Case",
    "price": 22500,
    "rarity": "rare",
    "imageSrc": RARE_CASE_IMAGE,
    "description": "10% Uncommon, 65% Rare, 25% Epic",
    "dropWeights": {
      //Uncommon: 10,
      'Dramatic Chipmunk': 15/4,
      'Success Kid': 15/4,
      'Lawyer Dog': 15/4,
      'With The Boys': 15/4,
      //Rare: 65,
      'Sad Pablo': 65/8,
      'Original Doge': 65/8,
      'Grumpy Cat': 65/8,
      'Philosoraptor': 65/8,
      'Dissapointed Michael Scott': 65/8,
      'Miserable Pepe': 65/8,
      'Wii Final Boss': 65/8,
      //Epic: 25,
      'Roll Safe': 25/4,
      'Ice Bucket Challenge': 25/4,
      'Awkward Monkey': 25/4,
      'Rich Pigeon': 25/4
    }
  },
  {
    "id": "epic_case",
    "name": "Epic Case",
    "price": 87500,
    "rarity": "epic",
    "imageSrc": EPIC_CASE_IMAGE,
    "description": "15% Rare, 55% Epic, 30% Legendary",
    "dropWeights": {
      //Rare: 15,
      'Quandale Dingle': 15/4,
      'Good Guy Greg': 15/4,
      'Capuchino Assassino': 15/4,
      'Sus Fry': 15/4,
      //Epic: 55,
      'Kermit Sips Tea': 55/6,
      'Happy Hank': 55/6,
      'Chimpanzini Bananini': 55/6,
      'Scumbag Steve': 55/6,
      'Wrong Exit': 55/6,
      'The Dress': 55/6,
      'Bernie Sanders Financial Support': 55/6,
      //Legendary: 30,
      'Rick Roll': 30/4,
      'Brr Brr Patapim': 30/4,
      'Surprised Pikachu': 30/4,
      'Advanced Math BS': 30/4,
    }
  },
  {
    "id": "legendary_case",
    "name": "Legendary Case",
    "price": 475000,
    "rarity": "legendary",
    "imageSrc": LEGENDARY_CASE_IMAGE,
    "description": "20% Epic, 65% Legendary, 20% Mythic.",
    "dropWeights": {
      //Epic: 20,
      'Happy Hank': 20/6,
      'Distracted Boyfriend': 20/6,
      'Larili Larila': 20/6,
      'Shocked Cena': 20/6,
      'Y U No?': 20/6,
      'Two Sides Of The Bus': 20/6,
      //Legendary: 65,
      'Awkward Penguin': 60/7,
      'Bombadiro Crocodilo': 60/7,
      'Ancient Aliens': 60/7,
      'Out Your God D*** Mouth!': 60/7,
      "It's All Connected": 60/7,
      "This Is Fine": 60/7,
      //Mythic: 20,
      'Bad Luck Brian': 20/4,
      'Bongo Cat': 20/4,
      'Dat Boi': 20/4,
      'The Trolley Problem': 20/4,
    }
  },
  {
    "id": "mythic_case",
    "name": "Mythic Case",
    "price": 1350000,
    "rarity": "mythic",
    "imageSrc": MYTHIC_CASE_IMAGE,
    "description": "65% Chance Legendary, 35% Mythic, Vaulted Items!?",
    "dropWeights": {
      //Legendary: 65,
      'SixSeven Kid': 65/5,
      'Disaster Girl': 65/5,
      'Keyboard Cat': 65/5,
      'Nervous Blinking': 65/5,
      'Luigi Death Stare': 65/5,
      //Mythic: 35,
      'My Name Is Jeff': 35/4,
      'Evil Kermit': 35/4,
      'Why Are You Gay?': 35/5,
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