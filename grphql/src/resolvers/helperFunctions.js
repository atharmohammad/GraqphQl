const bcrypt = require('bcryptjs');
const Events = require('../models/Event');
const Users = require('../models/User');
const Bookings = require("../models/Bookings");

const getCreator=async(id)=>{
  const user = await Users.findById(id);
  const newUser ={
      ...user._doc,
      _id:user._doc._id.toString(),
      event:getEvent.bind(this,user._doc.event)
    }
  return newUser
}

const getEvent=async(ids)=>{
  const eevent = await Events.find({_id:{$in:ids}});
  console.log(eevent)
  const newEvent = eevent.map(e=>{
    return{
      ...e._doc,
      _id:e._doc._id.toString(),
      creator:getCreator.bind(this,e._doc.creator)
    }
  })
  return newEvent;
}

const getSingleEvent = async(eventId)=>{
  const singleEvent = await Events.findById(eventId);
  const newEvent = {
        ...singleEvent._doc,
        _id:singleEvent.id,
        creator:getCreator.bind(this,singleEvent._doc.creator),
        }
  return newEvent;
}

module.exports = {
  getSingleEvent:getSingleEvent,
  getEvent:getEvent,
  getCreator:getCreator
}
