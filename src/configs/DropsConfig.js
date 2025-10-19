// Export meme drop config based on files in src/img/memes

// Rarity color defined for visual ease ...
// upon rarity of "Seasonal", when implemented, would otherwise be problematic.

const drops = [
  {
    name: 'Pepe the Frog',
    imageSrc: require('../img/memes/PepeTheFrog.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 289,
  },
  {
    name: 'Brain Overload',
    imageSrc: require('../img/memes/BrainOverload.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 655,
  },
  {
    name: 'Overly Attached Girlfriend',
    imageSrc: require('../img/memes/OverlyAttachedGirlfriend.jpg'),
    rarity: 'Common',
    rarityColor: '#b8a01a',
    value: 844,
  },
  {
    name: 'Drake Reacts No',
    imageSrc: require('../img/memes/DrakeReactsNo.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#4169e1',
    value: 4444,
  },
  {
    name: 'Grumpy Cat',
    imageSrc: require('../img/memes/GrumpyCat.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#4169e1',
    value: 6666,
  },
  {
    name: 'Success Kid',
    imageSrc: require('../img/memes/SuccessKid.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#4169e1',
    value: 7777,
  },
  
  {
    name: 'Quandale Dingle',
    imageSrc: require('../img/memes/QuandaleDingle.jpg'),
    rarity: 'Rare',
    rarityColor: '#4169e1',
    value: 45678,
  },
  {
    name: 'Original Doge',
    imageSrc: require('../img/memes/OriginalDoge.jpg'),
    rarity: 'Rare',
    rarityColor: '#4169e1',
    value: 69696,
  },
  {
    name: 'This Is Fine',
    imageSrc: require('../img/memes/ThisIsFine.jpg'),
    rarity: 'Epic',
    rarityColor: '#d946ef',
    value: 141699,
  },
  {
    name: 'Rick Roll',
    imageSrc: require('../img/memes/RickRoll.png'),
    rarity: 'Legendary',
    rarityColor: '#d946ef',
    value: 734265,
  },
  {
    name: 'SixSeven Kid',
    imageSrc: require('../img/memes/SixSeven.jpg'),
    rarity: 'Mythic',
    rarityColor: '#ef4444',
    value: 6767676,
  },{
    name: 'Bad Luck Brian',
    imageSrc: require('../img/memes/BadLuckBrian.jpg'),
    rarity: 'Mythic',
    rarityColor: '#FF0000',
    value: 8101989, // the year brian was born... 08/10/89 (M/D/Y)
  },
  {
    name: 'Troll Face',
    imageSrc: require('../img/memes/TrollFace.jpg'),
    rarity: 'Mythic',
    rarityColor: '#ef4444',
    value: 9192009, // Date created 09/19/2009
  },
];

export default drops;
