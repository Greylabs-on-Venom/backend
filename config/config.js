// config.js
require('dotenv').config({path: './.env'})
module.exports = {
    twitterConfig: {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: 'http://localhost:3000/auth/twitter/callback', // Update with your callback URL
    },
    discordConfig: {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/discord/callback', // Update with your callback URL
    },
    // Other configurations if needed
  };
  