# MemeCases

## Overview
MemeCases is a React Native Expo clicker/idle game featuring case opening mechanics with meme-themed items. Players can click to earn money, open cases containing memes, manage their inventory, purchase upgrades, and perform rebirths for multipliers.

## Recent Changes
- **October 19, 2025**: Initial GitHub import to Replit, configured for web deployment

## Project Architecture
- **Platform**: React Native + Expo (configured for web)
- **Language**: JavaScript (React)
- **Data Persistence**: AsyncStorage for local storage (money, inventory, upgrades, rebirth data)
- **Structure**:
  - `App.js` - Main app component with scene routing
  - `src/Scenes/` - Game scenes (CaseOpening, Inventory, Shop, Upgrades, Rebirthing)
  - `src/configs/` - Case and drop configurations
  - `src/img/memes/` - Meme image assets
  - `src/DataStorage.js` - AsyncStorage wrapper with data validation

## Key Features
- Clicker mechanics with upgrades
- Case opening with randomized meme drops
- Inventory management
- Upgrade system (clicker power, case speed, auto-clicker)
- Rebirth system for prestige multipliers
- Persistent data storage

## Technical Stack
- React Native 0.81.4
- React 19.1.0
- Expo ~54.0.13
- AsyncStorage for persistence

## Development
- **Start**: `npm start` or `expo start --web`
- **Port**: 5000 (Replit requirement)
- **Configuration**: 
  - Environment variables set for Replit proxy compatibility:
    - `EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0`
    - `WDS_SOCKET_HOST=0.0.0.0`
  - Metro bundler configured with CORS support

## Deployment
- **Type**: Autoscale (stateless web app)
- **Build**: `npx expo export --platform web` (exports to `dist/` folder)
- **Run**: `npx serve dist -p 5000` (serves static build on port 5000)
- **Note**: Uses `serve` package for production static file serving
