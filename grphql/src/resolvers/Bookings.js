const bcrypt = require('bcryptjs');
const Events = require('../models/Event');
const Users = require('../models/User');
const Bookings = require("../models/Bookings");
const {getCreator,getEvent,getSingleEvent} = require("./helperFunctions")

module.exports = {
  booking:async(req)=>{
    if(!req.isAuth){
      throw new Error("UnAuthenticated!")
    }
    try{
      const bookings = await Bookings.find();
      const newBookings = bookings.map(book=>{
        return{...book._doc,
          _id:book.id,
          user:getCreator.bind(this,book._doc.user),
          event:getSingleEvent.bind(this,book._doc.event)
        }
      })
      return newBookings;
    }catch(err){
      throw err
    }
  },

  createBooking:async(arg,req)=>{
    if(!req.isAuth){
      throw new Error("UnAuthenticated!")
    }
    const booking = new Bookings({
      user:req.userId,
      event:arg.bookEvent
    });
    await booking.save();
    return {...booking,_id:booking.id,
      event:getSingleEvent.bind(this,arg.bookEvent),
      user:getCreator.bind(this,booking._doc.user)}
  },
  cancelBooking:async(arg,req)=>{
    if(!req.isAuth){
      throw new Error("UnAuthenticated!")
    }
    const booking = await Bookings.findByIdAndDelete(arg.bookingId);
    const canceledEvent = await Events.findById(booking._doc.event);
    return{
      ...canceledEvent._doc,
      creator:getCreator.bind(this,canceledEvent._doc.creator),
      _id:canceledEvent.id
    }
  }
}
