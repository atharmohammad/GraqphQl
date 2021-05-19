const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  event:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Events',
  }]
});

module.exports = mongoose.model('User',schema);
