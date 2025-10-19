// Export meme drop config based on files in src/img/memes

// Rarity color defined for visual ease ...
// upon rarity of "Seasonal", when implemented, would otherwise be problematic.

const drops = [
  {
    name: 'Pepe the Frog',
    imageSrc: require('../img/memes/PepeTheFrog.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 250,
  },
  {
    name: 'Brain Overload',
    imageSrc: require('../img/memes/BrainOverload.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 650,
  },
  {
    name: 'Overly Attached Girlfriend',
    imageSrc: require('../img/memes/OverlyAttachedGirlfriend.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 1000,
  },
  {
    name: 'Drake Reacts No',
    imageSrc: require('../img/memes/DrakeReactsNo.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#4169e1',
    value: 5000,
  },
  {
    name: 'Grumpy Cat',
    imageSrc: require('../img/memes/GrumpyCat.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#4169e1',
    value: 10000,
  },
  {
    name: 'Success Kid',
    imageSrc: require('../img/memes/SuccessKid.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#4169e1',
    value: 15000,
  },
  
  {
    name: 'Quandale Dingle',
    imageSrc: require('../img/memes/QuandaleDingle.jpg'),
    rarity: 'Rare',
    rarityColor: '#4169e1',
    value: 50000,
  },
  {
    name: 'Original Doge',
    imageSrc: require('../img/memes/OriginalDoge.jpg'),
    rarity: 'Rare',
    rarityColor: '#4169e1',
    value: 100000,
  },
  {
    name: 'This Is Fine',
    imageSrc: require('../img/memes/ThisIsFine.jpg'),
    rarity: 'Epic',
    rarityColor: '#d946ef',
    value: 500000,
  },
  {
    name: 'Rick Roll',
    imageSrc: require('../img/memes/RickRoll.png'),
    rarity: 'Legendary',
    rarityColor: '#d946ef',
    value: 2500000,
  },
  {
    name: 'SixSeven Kid',
    imageSrc: require('../img/memes/SixSeven.jpg'),
    rarity: 'Mythic',
    rarityColor: '#ef4444',
    value: 6750000,
  },{
    name: 'Bad Luck Brian',
    imageSrc: require('../img/memes/BadLuckBrian.jpg'),
    rarity: 'Mythic',
    rarityColor: '#FF0000',
    value: 8500000,
  },
  {
    name: 'Troll Face',
    imageSrc: require('../img/memes/TrollFace.jpg'),
    rarity: 'Mythic',
    rarityColor: '#ef4444',
    value: 9900000,
  },
];

export default drops;
