// Export meme drop config based on files in src/img/memes

// Rarity color defined for visual ease ...
// upon rarity of "Seasonal", when implemented, would otherwise be problematic.

const drops = [
  {
    name: 'Snoop Dogg',
    imageSrc: require('../img/memes/SnoopDogg.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 420,
  },
  {
    name: 'Pepe the Frog',
    imageSrc: require('../img/memes/PepeTheFrog.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 665,
  },
  
  {
    name: 'Brain Overload',
    imageSrc: require('../img/memes/BrainOverload.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 1111,
  },
  {
    name: 'Overly Attached Girlfriend',
    imageSrc: require('../img/memes/OverlyAttachedGirlfriend.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 1311,
  },
  {
    name: 'Drake Reacts No',
    imageSrc: require('../img/memes/DrakeReactsNo.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#444400',
    value: 5750,
  },
  {
    name: 'Grumpy Cat',
    imageSrc: require('../img/memes/GrumpyCat.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#444400',
    value: 8930,
  },
  {
    name: 'Success Kid',
    imageSrc: require('../img/memes/SuccessKid.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#444400',
    value: 14302,
  },
  
  {
    name: 'Quandale Dingle',
    imageSrc: require('../img/memes/QuandaleDingle.jpg'),
    rarity: 'Rare',
    rarityColor: '#4169e1',
    value: 44489,
  },
  {
    name: 'Original Doge',
    imageSrc: require('../img/memes/OriginalDoge.jpg'),
    rarity: 'Rare',
    rarityColor: '#4169e1',
    value: 89000,
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
    rarityColor: '#FF0000',
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
    rarityColor: '#FF0000',
    value: 9900000,
  },
];

export default drops;
