const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure Metro for web with proper dev server settings
config.server = {
  ...config.server,
  // Allow connections from Replit's proxy
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      // Allow all hosts for Replit proxy
      res.setHeader('Access-Control-Allow-Origin', '*');
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
