const express = require('express');
const cors = require('cors');
const config = require('../config/config');
//const path = require('path')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')))

const oneDay = 1000 * 60 * 60 * 24;
// app.use(
//   sessions({
//     secret: process.env.SESSION_KEY,
//     saveUninitialized: true,
//     cookie: { maxAge: oneDay },
//     resave: false,
//   })
// );

app.use(
  cors({
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,
  })
);
const twitterController = require('../controllers/twitterController');
const discordController = require('../controllers/discordController');
const venomController = require('../controllers/venomController');

// Twitter authentication routes
app.get('/auth/twitter', twitterController.authenticateTwitter);
app.get('/auth/twitter/callback', twitterController.twitterCallback);

// Discord authentication routes
app.get('/auth/discord', discordController.authenticateDiscord);
app.get('/auth/discord/callback', discordController.discordCallback);

// Wallet connection route
app.get('/connect-wallet', venomController.connectWallet);