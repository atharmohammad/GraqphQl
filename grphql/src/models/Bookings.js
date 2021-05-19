const mongoose = require("mongoose");

const schema = mongoose.Schema({
  event:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Events"
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
},{timestamps:true});

module.exports = mongoose.model("Bookings",schema);
