const express = require('express');
const app = express();
const port = 8443
const config = require('./config/config');
require('dotenv').config({path: './.env'})
const https = require('https')
const fs = require('fs')
let key = fs.readFileSync('./tutorial.key','utf-8')
let cert = fs.readFileSync('./tutorial.crt','utf-8')
// Import controllers

const parameters = {
  key: key,
  cert: cert
}

// Configure CORS
const cors = require('cors');
app.use(
    cors({
      origin: true,
      credentials: true,
      optionSuccessStatus: 200,
    })
  );

// ... Other middleware and configuration ...
const db = require('./models');
db.mongoose
  .connect(process.env.DB_CONECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
     //initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });


  require('./routes/main.routes');

  let server = https.createServer(parameters,app)

  server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
