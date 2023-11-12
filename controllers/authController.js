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
      return res.status(404).json({ message: 'User already exsist' });
    }

    function generateRandomString(length) {
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomIndex);
      }
    
      return result;
    }
    
    const maxLength = 10; // Change this to your desired maximum length
    const randomString = generateRandomString(maxLength);
    
    // Create a new user with the unique ID
    const newUser = new User({
      login: 'GLAB' + randomString,
      venomAddress: req.body.venomAddress
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    res.status(200).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Internal Server Error',
      error: error
    });
  }
};


// Login using the unique ID
exports.login = async (req, res) => {
  
  try {
    // Find the user in the database based on the uniqueID
    const user = await User.findOne({
      login: req.body.uniqueID,
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


