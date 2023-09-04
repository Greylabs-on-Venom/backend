const express = require('express');
const app = express();
const config = require('./config/config');
require('dotenv').config({path: './.env'})
app.use(express.urlencoded({ extended: true }));

// Configure CORS
const cors = require('cors');
app.use(
    cors({
      origin: true,
      credentials: true,
      optionSuccessStatus: 200,
    })
  );
app.use(express.json());


const db = require('./models');
const Role = db.role;



db.mongoose
  .connect(process.env.DB_CONECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
     initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to GreyLabs.' });
  });

  require('./routes/main.routes')(app);

 const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// initialization of database and role
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      new Role({
        name: 'developer',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'developer' to roles collection");
      });

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });
    }
  });
  
}
