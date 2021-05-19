const bcrypt = require('bcryptjs');
const Events = require('../models/Event');
const Users = require('../models/User');
const Bookings = require("../models/Bookings");
const {getCreator,getEvent,getSingleEvent} = require("./helperFunctions")

module.exports = {
  event:async(req)=>{
    const eevent = await Events.find();
    const newEvent = eevent.map(events=>{
      return{
        ...events._doc,
        _id:events._doc._id.toString(),
        creator:getCreator.bind(this,events._doc.creator)
      }
    });
    return newEvent;
  },
  createEvent:async(arg,req)=>{
    if(!req.isAuth){
      throw new Error("UnAuthenticated!")
    }
    const eevent = {
      title:arg.eventInput.title,
      description:arg.eventInput.description,
      price:arg.eventInput.price,
      date:new Date(arg.eventInput.date),
      creator:req.userId
    }
    const newEvent = new Events(eevent);
    await newEvent.save();
    const user = await Users.findById(req.userId);
    if(!user)
    throw new Error("user dont exist")

    user.event.push(newEvent);
    await user.save();
    const eventMade = {...newEvent._doc,creator:getCreator.bind(this,newEvent._doc.creator)}
    return eventMade;
  }
}
