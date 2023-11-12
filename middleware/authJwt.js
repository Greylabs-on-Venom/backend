const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;





verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!", error:err });
    }
     req.userId = decoded.id;
     next();
    
  });

};

isAdmin = async (req, res, next) => {
  try {
    
    let token = req.headers['x-access-token'];
     User.findOne({ _id: req.userId }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      
      const admin = await Role.findOne({_id:user.roles});
      if (admin.name == 'admin') {
        res.status(200).send({message:"success"});
        //next();
        return;
      }else{
        res.status(404).send({message:"Unauthorized for None Admin"});
        //next();
        return;
      }
      
    });
  } catch (error) {
    res.status(500).send(error);
    return;
    
  }
}

isModerator = async (req, res, next) => {
  try {
    
    let token = req.headers['x-access-token'];
     User.findOne({ _id: req.userId }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      
      const admin = await Role.findOne({_id:user.roles});
      if (admin.name == 'moderator') {
        res.status(200).send({message:"success"});
        next();
        return;
      }else{
        res.status(404).send({message:"Unauthorized for None Moderator"});
        next();
        return;
      }
      
    });
  } catch (error) {
    res.status(500).send(error);
    return;
    
  }
}

isUser = async (req, res, next) => {
  try {
    
    let token = req.headers['x-access-token'];
     User.findOne({ _id: req.userId }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      
      const admin = await Role.findOne({_id:user.roles});
      if (admin.name == 'user') {
        res.status(200).send({message:"success"});
        //next();
        return;
      }else{
        res.status(404).send({message:"Unauthorized for None user"});
        //next();
        return;
      }
      
    });
  } catch (error) {
    res.status(500).send(error);
    return;
    
  }
}

isContributor = async (req, res, next) => {
  try {
    
    let token = req.headers['x-access-token'];
     User.findOne({ _id: req.userId }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      
      const admin = await Role.findOne({_id:user.roles});
      if (admin.name == 'contributor') {
        res.status(200).send({message:"success"});
        //next();
        return;
      }else{
        res.status(404).send({message:"Unauthorized for None contributor"});
        //next();
        return;
      }
      
    });
  } catch (error) {
    res.status(500).send(error);
    return;
    
  }
}

isWriter = async (req, res, next) => {
  try {
    
    let token = req.headers['x-access-token'];
     User.findOne({ _id: req.userId }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      
      const admin = await Role.findOne({_id:user.roles});
      if (admin.name == 'writer') {
        res.status(200).send({message:"success"});
        //next();
        return;
      }else{
        res.status(404).send({message:"Unauthorized for None writer"});
        //next();
        return;
      }
      
    });
  } catch (error) {
    res.status(500).send(error);
    return;
    
  }
}


const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isContributor,
  isWriter,
  isUser
};
module.exports = authJwt;