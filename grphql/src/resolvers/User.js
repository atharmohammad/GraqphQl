const bcrypt = require('bcryptjs');
const Events = require('../models/Event');
const Users = require('../models/User');
const Bookings = require("../models/Bookings");
const jwt = require("jsonwebtoken");

const {getCreator,getEvent,getSingleEvent} = require("./helperFunctions")

module.exports = {
  user:async()=>{
    const users = await Users.find();
    const newUser = users.map(user=>{
      return {...user._doc,
        _id:user.id,
        event:getEvent.bind(this,user._doc.event)
      };
    });
    return newUser;
  },
  createUser:async(arg)=>{
    try{
      const exist = await Users.findOne({email:arg.userInput.email});
      if(exist)
        throw new Error('User already exists');

      const pass = await bcrypt.hash(arg.userInput.password,12);
      const user = new Users({...arg.userInput,password:pass});
      await user.save();
      return user;
    }catch(e){
      return e;
    }
  },
  login:async({email,password})=>{
    const user = await Users.findOne({email:email});
    if(!user)
      throw new Error("User dont exists");

    const isEqual = await bcrypt.compare(password,user.password);
    if(!isEqual)
      throw new Error("Password dont match");

    const token = jwt.sign({userId:user.id,email:user.email},"clientsecretKey",{
      expiresIn:"1h"
    });

    return{
      userId:user.id,
      token:token,
      tokenExpiry:1
    }
  }
}
