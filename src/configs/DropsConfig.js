import imageCache from '../utils/ImageCache';

const drops = [
  /*

  VAULTED!?

  */

  {
    name: 'Phenomenal Penguin',
    imageSrc: require('../img/memes/vaulted/PhenomenalPenguin.webp'),
    rarity: 'Vaulted',
    rarityColor: '#8b5cf6',
    value: 23456789 // D/M/Y of epstein buying island
  },
  {
    name: 'Epstein Files',
    imageSrc: require('../img/memes/vaulted/EpsteinFiles.webp'),
    rarity: 'Vaulted',
    rarityColor: '#8b5cf6',
    value: 20041998 // D/M/Y of epstein buying island
  },

  /*

  MYTHICS 

  */
  {
    name: 'Troll Face',
    imageSrc: require('../img/memes/mythic/TrollFace.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 9900900
  },
  {
    name: 'Why Are You Gay?',
    imageSrc: require('../img/memes/mythic/WhyAreYouGay.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 9350000
  },
  {
    name: 'My Name Is Jeff',
    imageSrc: require('../img/memes/mythic/MyNameIsJeff.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 8000000
  },
  {
    name: 'Italiano Combiniano',
    imageSrc: require('../img/memes/mythic/ItalianoCombiniano.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 7650000
  },
  {
    name: 'Evil Kermit',
    imageSrc: require('../img/memes/mythic/EvilKermit.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 6000000
  },
  {
    name: 'Dat Boi',
    imageSrc: require('../img/memes/mythic/DatBoi.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 4900000
  },
  {
    name: 'Bongo Cat',
    imageSrc: require('../img/memes/mythic/BongoCat.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 6500000
  },
  {
    name: 'The Trolley Problem',
    imageSrc: require('../img/memes/mythic/TheTrolleyProblem.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 5800000
  },
  {
    name: 'Bad Luck Brian',
    imageSrc: require('../img/memes/mythic/BadLuckBrian.webp'),
    rarity: 'Mythic',
    rarityColor: '#c31429',
    value: 5200000
  },
  /*

  [ LEGENDARY ] 475k$

  */
  {
    name: 'SixSeven Kid',
    imageSrc: require('../img/memes/legendary/SixSeven.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 676767
  },
  {
    name: "It's All Connected",
    imageSrc: require('../img/memes/legendary/ItsAllConnected.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 650000
  },
  {
    name: 'Nervous Blinking',
    imageSrc: require('../img/memes/legendary/NervousBlinking.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 634500
  },
  {
    name: 'Out Your God D*** Mouth!',
    imageSrc: require('../img/memes/legendary/OutYourGodD___Mouth.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 621100
  },
  {
    name: 'Advanced Math BS',
    imageSrc: require('../img/memes/legendary/AdvancedMathBS.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 595000
  },
  {
    name: 'Awkward Penguin',
    imageSrc: require('../img/memes/legendary/AwkwardPenguin.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 589999
  },
  {
    name: 'Brr Brr Patapim',
    imageSrc: require('../img/memes/legendary/BrrBrrPatapim.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 566666
  },
  {
    name: 'This Is Fine',
    imageSrc: require('../img/memes/legendary/ThisIsFine.webp'),
    rarity: 'Legendary',
    rarityColor: '#0ddc94',
    value: 540000
  },
  {
    name: 'Surprised Pikachu',
    imageSrc: require('../img/mefmes/legendary/SurprisedPikachu.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 51500
  },
  {
    name: 'Disaster Girl',
    imageSrc: require('../img/memes/legendary/DisasterGirl.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 490000
  },
  {
    name: 'Bombadiro Crocodilo',
    imageSrc: require('../img/memes/legendary/BombadiroCrocodilo.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 484848
  },
  {
    name: 'Ancient Aliens',
    imageSrc: require('../img/memes/legendary/AncientAliens.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 467500
  },
  {
    name: 'Keyboard Cat',
    imageSrc: require('../img/memes/legendary/KeyboardCat.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 450000
  },
  {
    name: 'Rick Roll',
    imageSrc: require('../img/memes/legendary/RickRoll.webp'),
    rarity: 'Legendary',
    rarityColor: '#FFBF00',
    value: 444444
  },
  /*

  [ EPIC ] 87.5k$

  */
  {
    name: 'Shocked Cena',
    imageSrc: require('../img/memes/epic/ShockedCena.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 111111
  },
  {
    name: 'Roll Safe',
    imageSrc: require('../img/memes/epic/RollSafe.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 105000
  },
  {
    name: 'Scumbag Steve',
    imageSrc: require('../img/memes/epic/RollSafe.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 99999
  },
  {
    name: 'Two Sides Of The Bus',
    imageSrc: require('../img/memes/epic/TwoSidesOfTheBus.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 92000
  },
  {
    name: 'Kermit Sips Tea',
    imageSrc: require('../img/memes/epic/KermitSipsTea.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 89999
  },
  {
    name: 'Larili Larila',
    imageSrc: require('../img/memes/epic/LariliLarila.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 87500
  },
  {
    name: 'Happy Hank',
    imageSrc: require('../img/memes/epic/HappyHank.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 84420
  },
  {
    name: 'Ice Bucket Challenge',
    imageSrc: require('../img/memes/epic/IceBucketChallenge.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 82500
  },
  {
    name: 'Distracted Boyfriend',
    imageSrc: require('../img/memes/epic/DistractedBoyfriend.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 82222
  },
  {
    name: 'Awkward Monkey',
    imageSrc: require('../img/memes/epic/AwkwardMonkey.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 81000
  },
  {
    name: 'Chimpanzini Bananini',
    imageSrc: require('../img/memes/epic/ChimpanziniBananini.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 78990
  },
  {
    name: 'Bernie Sanders Financial Support',
    imageSrc: require('../img/memes/epic/BernieSandersFinancialSupport.webp'),
    rarity: 'Epic',
    rarityColor: '#FFBF00',
    value: 75000
  },
  {
    name: 'Wrong Exit',
    imageSrc: require('../img/memes/epic/WrongExit.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 72500
  },
  {
    name: 'The Dress',
    imageSrc: require('../img/memes/epic/TheDress.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 67500
  },
  {
    name: 'Y U No?',
    imageSrc: require('../img/memes/epic/YUNo.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 64000
  },
  {
    name: 'Rich Pigeon',
    imageSrc: require('../img/memes/epic/RichPigeon.webp'),
    rarity: 'Epic',
    rarityColor: '#0ddc94',
    value: 60000
  },
  /*

  [ RARE ] 22.5k$

  */
  {
    name: 'Surprised Shaq',
    imageSrc: require('../img/memes/rare/SurprisedShaq.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 34500,
  },
  {
    name: 'Wii Final Boss',
    imageSrc: require('../img/memes/rare/WiiFinalBoss.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 33000
  },
  {
    name: 'Sus Fry',
    imageSrc: require('../img/memes/rare/SusFry.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 31000
  },
  {
    name: 'Dissapointed Michael Scott',
    imageSrc: require('../img/memes/rare/DissapointedMichaelScott.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 29999
  },
  {
    name: 'Grumpy Cat',
    imageSrc: require('../img/memes/rare/GrumpyCat.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 28500
  },
  {
    name: 'Sad Pablo',
    imageSrc: require('../img/memes/rare/SadPablo.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 26000,
  },
  {
    name: 'Miseraable Pepe',
    imageSrc: require('../img/memes/rare/MiserablePepe.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 24590
  },
  {
    name: 'Original Doge',
    imageSrc: require('../img/memes/rare/OriginalDoge.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 24000
  },
  {
    name: 'Good Guy Greg',
    imageSrc: require('../img/memes/rare/GoodGuyGreg.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 22000
  },
  {
    name: 'Awesome Penguin',
    imageSrc: require('../img/memes/rare/AwesomePenguin.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 21100
  },
  {
    name: 'Capuchino Assassino',
    imageSrc: require('../img/memes/rare/CapuchinoAssassino.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 20000
  },
  {
    name: 'Quandale Dingle',
    imageSrc: require('../img/memes/rare/QuandaleDingle.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 19400
  },
  {
    name: 'Philosoraptor',
    imageSrc: require('../img/memes/rare/Philosoraptor.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 19000
  },
  {
    name: 'Nobody...',
    imageSrc: require('../img/memes/rare/Nobody.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 18700,
  },
  {
    name: 'Nobody...',
    imageSrc: require('../img/memes/rare/Nobody.webp'),
    rarity: 'Rare',
    rarityColor: '#0d94d7',
    value: 18250,
  },
  /*

  [ UNCOMMON ] - 7.5k$

  */
  {
    name: 'Wait What',
    imageSrc: require('../img/memes/uncommon/WaitWhat.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 9250
  },
  {
    name: 'Hampster Dance',
    imageSrc: require('../img/memes/uncommon/HampsterDance.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 9000
  },
  {
    name: 'Lawyer Dog',
    imageSrc: require('../img/memes/uncommon/LawyerDog.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8850
  },
  {
    name: 'Left Shark',
    imageSrc: require('../img/memes/uncommon/LeftShark.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8560,
  },
  {
    name: 'Insanity Wolf',
    imageSrc: require('../img/memes/uncommon/InsanityWolf.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8300
  },
  {
    name: 'Success Kid',
    imageSrc: require('../img/memes/uncommon/SuccessKid.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8150
  },
  {
    name: 'Dramatic Chipmunk',
    imageSrc: require('../img/memes/uncommon/DramaticChipmunk.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 8000
  },
  {
    name: 'Hard To Swallow Pills',
    imageSrc: require('../img/memes/uncommon/HardToSwallowPills.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 7760
  },
  {
    name: 'Bombini Guzzini',
    imageSrc: require('../img/memes/uncommon/BombiniGuzzini.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 7500
  },

  {
    name: 'Be Like Bill',
    imageSrc: require('../img/memes/uncommon/BeLikeBill.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 7200
  },
  {
    name: 'Original Wojak',
    imageSrc: require('../img/memes/uncommon/OriginalWojak.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 6780
  },
  {
    name: 'Drake Reacts No',
    imageSrc: require('../img/memes/uncommon/DrakeReactsNo.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 6500
  },
  {
    name: 'Sad Will Smith',
    imageSrc: require('../img/memes/uncommon/SadWillSmith.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 6100
  },
  {
    name: 'GigaChad Wojak',
    imageSrc: require('../img/memes/uncommon/GigaChadWojak.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 6100
  },

  {
    name: 'With The Boys',
    imageSrc: require('../img/memes/uncommon/WithTheBoys.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 5850
  },
  {
    name: 'The Modern Founding Father',
    imageSrc: require('../img/memes/uncommon/TheModernFoundingFather.webp'),
    rarity: 'Uncommon',
    rarityColor: '#0F0F0F',
    value: 5500
  },

  /*

  [ COMMON ] 420-1000

  */
  {
    name: 'Snoop Dogg',
    imageSrc: require('../img/memes/common/SnoopDogg.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1420
  },
  {
    name: 'Paranoid Parrot',
    imageSrc: require('../img/memes/common/ParanoidParrot.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1100
  },
  {
    name: 'Original Miku',
    imageSrc: require('../img/memes/common/OriginalMiku.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1099
  },
  {
    name: 'Overly Attached Girlfriend',
    imageSrc: require('../img/memes/common/OverlyAttachedGirlfriend.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1098
  },
  {
    name: 'Burbaloni Luliloli',
    imageSrc: require('../img/memes/common/BurbaloniLuliloli.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1097
  },
  {
    name: 'No No No No No',
    imageSrc: require('../img/memes/common/NoNoNoNoNo.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1096
  },
  {
    name: 'High Expectations',
    imageSrc: require('../img/memes/common/HighExpectations.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1095
  },
  {
    name: 'Foul Frog',
    imageSrc: require('../img/memes/common/FoulFrog.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1094
  },
  {
    name: 'Pepe the Frog',
    imageSrc: require('../img/memes/common/PepeTheFrog.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1093
  },
  {
    name: 'Brain Overload',
    imageSrc: require('../img/memes/common/BrainOverload.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1092
  },
  {
    name: 'One Does Not Simply...',
    imageSrc: require('../img/memes/common/OneDoesNotSimply.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1091
  },
  {
    name: 'Lionardo DiCaprio Point',
    imageSrc: require('../img/memes/common/LionardoDiCaprioPoint.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1090
  },
  {
    name: 'Withered Wojak',
    imageSrc: require('../img/memes/common/WitheredWojak.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1089
  },
  {
    name: 'Distrought Wojak',
    imageSrc: require('../img/memes/common/DistroughtWojak.webp'),
    rarity: 'Common',
    rarityColor: '#aaa8a0',
    value: 1088
  },
];

export default drops;
