const uuid = require('uuid');
const User = require('../models/user.model'); // Import the User model
const jwt = require("jsonwebtoken");
const config = require('../config/config');
// Signup with Twitter profile
function generateAlphanumericID(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }
  return result;
}
exports.signup = async (req, res) => {
    
  //const { username, twitterProfile } = req.body;

  try {
    // Check if the username already exists
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   return res.status(409).json({ message: 'Username already exists' });
    // }

    // Generate a unique ID


    // Create a new user
    const newUser = new User({
      uniqueID: generateAlphanumericID(8),
      twitterProfile: req.body.twitterProfile,
      discordProfile: req.body.discordProfile,
      venomAddress: req.body.venomAddress
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    res.status(200).json({ message: 'Signup successful', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

};



// Login using the unique ID
exports.login = async (req, res) => {
  const { uniqueID } = req.body;

  try {
    // Find the user in the database based on the uniqueID
    const user = await User.findOne({ uniqueID });

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
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//module.exports = router;


