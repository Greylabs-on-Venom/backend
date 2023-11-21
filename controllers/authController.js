const crypto = require('crypto');
const User = require('../models/user.model'); // Import the User model
const jwt = require("jsonwebtoken");
const config = require('../config/config');


exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({
      venomAddress: req.body.venomAddress,
    });

    if (user) {
      return res.status(404).json({ message: 'User already exists' });
    }

    // Asynchronous random string generation
    const generateRandomString = (length) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(length, (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            const randomString = buffer.toString('hex').slice(0, length);
            resolve(randomString);
          }
        });
      });
    };

    const maxLength = 10;
    const randomString = await generateRandomString(maxLength);

    // Create a new user with the unique ID
    const newUser = new User({
      login: 'GLAB' + randomString,
      venomAddress: req.body.venomAddress,
    });

    // Save the user to the database
    await newUser.save();
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    // Return a success response
    res.status(200).json({
       message: 'Signup successful', 
       token:token,
       user: newUser 
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};


// Login using the unique ID
exports.login = async (req, res) => {
  
  try {
    // Find the user in the database based on the uniqueID
    const user = await User.findOne({
      venomAddress: req.body.venomAddress,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

    // Return the user data as a login response
    res.status(200).json({ 
        message: 'Login successful', 
        token:token,
        user:user
     });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ 
      message: 'Internal Server Error',
      error: error
    });
  }
};

//module.exports = router;


