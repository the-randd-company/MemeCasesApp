import imageCache from '../utils/ImageCache';

const drops = [
  /*

  VAULTED!?

  */
 
  {
    name: 'Phenomenal Penguin',
    imageSrc: require('../img/memes/PhenomenalPenguin.jpg'),
    rarity: 'Vaulted',
    rarityColor: '#8b5cf6',
    value: 23456789 // D/M/Y of epstein buying island
  },
  {
    name: 'Epstein Files',
    imageSrc: require('../img/memes/EpsteinFiles.jpg'),
    rarity: 'Vaulted',
    rarityColor: '#8b5cf6',
    value: 20041998 // D/M/Y of epstein buying island
  },

  /*

  MYTHICS 

  */
  {
    name: 'Troll Face',
    imageSrc: require('../img/memes/TrollFace.jpg'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 9900900
  },
  {
    name: 'My Name Is Jeff',
    imageSrc: require('../img/memes/MyNameIsJeff.jpg'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 8000000
  },
  {
    name: 'Italiano Combiniano',
    imageSrc: require('../img/memes/ItalianoCombiniano.jpg'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 7650000
  },
  {
    name: 'Evil Kermit',
    imageSrc: require('../img/memes/EvilKermit.jpg'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 6000000
  },
  {
    name: 'Dat Boi',
    imageSrc: require('../img/memes/DatBoi.jpg'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 4900000
  },
  {
    name: 'Bongo Cat',
    imageSrc: require('../img/memes/BongoCat.jpg'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 6500000
  },
  {
    name: 'Bad Luck Brian',
    imageSrc: require('../img/memes/BadLuckBrian.jpg'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 5200000
  },
  /*

  [ LEGENDARY ] 475k$

  */
  {
    name: 'Brr Brr Patapim',
    imageSrc: require('../img/memes/BrrBrrPatapim.jpg'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 566666
  },
  {
    name: 'SixSeven Kid',
    imageSrc: require('../img/memes/SixSeven.jpg'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 676767
  },
  {
    name: 'Nervous Blinking',
    imageSrc: require('../img/memes/NervousBlinking.jpg'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 634500
  },
  {
    name: 'Awkward Penguin',
    imageSrc: require('../img/memes/AwkwardPenguin.jpg'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 589999
  },
  {
    name: 'Disaster Girl',
    imageSrc: require('../img/memes/DisasterGirl.jpg'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 490000
  },
  {
    name: 'Bombadiro Crocodilo',
    imageSrc: require('../img/memes/BombadiroCrocodilo.png'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 484848
  },
  {
    name: 'Ancient Aliens',
    imageSrc: require('../img/memes/AncientAliens.jpg'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 467500
  },
  {
    name: 'Keyboard Cat',
    imageSrc: require('../img/memes/KeyboardCat.jpg'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 450000
  },
  {
    name: 'Rick Roll',
    imageSrc: require('../img/memes/RickRoll.png'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 444444
  },
  /*

  [ EPIC ] 87.5k$

  */
  {
    name: 'Kermit Sips Tea',
    imageSrc: require('../img/memes/KermitSipsTea.jpg'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 89999
  },
  {
    name: 'Larili Larila',
    imageSrc: require('../img/memes/LariliLarila.jpg'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 87500
  },
  {
    name: 'Happy Hank',
    imageSrc: require('../img/memes/HappyHank.jpg'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 84420
  },
  {
    name: 'Ice Bucket Challenge',
    imageSrc: require('../img/memes/IceBucketChallenge.jpg'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 82500
  },
  {
    name: 'Distracted Boyfriend',
    imageSrc: require('../img/memes/DistractedBoyfriend.jpg'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 82222
  },
  {
    name: 'Awkward Monkey',
    imageSrc: require('../img/memes/AwkwardMonkey.jpg'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 81000
  },
  {
    name: 'Chimpanzini Bananini',
    imageSrc: require('../img/memes/ChimpanziniBananini.jpg'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 78990
  },
  {
    name: 'This Is Fine',
    imageSrc: require('../img/memes/ThisIsFine.jpg'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 77500
  },
  /*

  [ RARE ] 22.5k$

  */
  {
    name: 'Grumpy Cat',
    imageSrc: require('../img/memes/GrumpyCat.jpg'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 24500
  },
  {
    name: 'Sad Pablo',
    imageSrc: require('../img/memes/SadPablo.jpg'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 23999,
  },
  {
    name: 'Original Doge',
    imageSrc: require('../img/memes/OriginalDoge.jpg'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 22222
  },
  {
    name: 'Good Guy Greg',
    imageSrc: require('../img/memes/GoodGuyGreg.jpg'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 21765
  },
  {
    name: 'Awesome Penguin',
    imageSrc: require('../img/memes/AwesomePenguin.jpg'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 21100
  },
  {
    name: 'Capuchino Assassino',
    imageSrc: require('../img/memes/CapuchinoAssassino.jpg'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 20999
  },
  {
    name: 'Quandale Dingle',
    imageSrc: require('../img/memes/QuandaleDingle.jpg'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 20555
  },
  {
    name: 'Nobody...',
    imageSrc: require('../img/memes/Nobody.jpg'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 19500,
  },
  /*

  [ UNCOMMON ] - 7.5k$

  */
  {
    name: 'Lawyer Dog',
    imageSrc: require('../img/memes/LawyerDog.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 9000
  },
  {
    name: 'Left Shark',
    imageSrc: require('../img/memes/LeftShark.jpeg'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8560,
  },
  {
    name: 'Insanity Wolf',
    imageSrc: require('../img/memes/InsanityWolf.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8300
  },
  {
    name: 'Success Kid',
    imageSrc: require('../img/memes/SuccessKid.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8150
  },
  {
    name: 'Dramatic Chipmunk',
    imageSrc: require('../img/memes/DramaticChipmunk.png'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8000
  },
  {
    name: 'Hard To Swallow Pills',
    imageSrc: require('../img/memes/HardToSwallowPills.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 7760
  },
  {
    name: 'Bombini Guzzini',
    imageSrc: require('../img/memes/BombiniGuzzini.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 7500
  },

  {
    name: 'Be Like Bill',
    imageSrc: require('../img/memes/BeLikeBill.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 7200
  },
  {
    name: 'Drake Reacts No',
    imageSrc: require('../img/memes/DrakeReactsNo.jpg'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 6500
  },
  /*

  [ COMMON ] 420-1000

  */
  {
    name: 'Overly Attached Girlfriend',
    imageSrc: require('../img/memes/OverlyAttachedGirlfriend.jpg'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 599
  },
  {
    name: 'Burbaloni Luliloli',
    imageSrc: require('../img/memes/BurbaloniLuliloli.jpg'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 589
  },
  {
    name: 'High Expectations',
    imageSrc: require('../img/memes/HighExpectations.jpg'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 584
  },
  {
    name: 'Foul Frog',
    imageSrc: require('../img/memes/FoulFrog.jpg'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 559
  },
  {
    name: 'Pepe the Frog',
    imageSrc: require('../img/memes/PepeTheFrog.jpg'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 459
  },
  {
    name: 'Snoop Dogg',
    imageSrc: require('../img/memes/SnoopDogg.jpg'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 420
  },
  {
    name: 'Brain Overload',
    imageSrc: require('../img/memes/BrainOverload.jpg'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 259
  },
];

export default drops;
