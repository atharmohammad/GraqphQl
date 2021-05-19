const mongoose = require('mongoose');
const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@task-manager-cluster.w1cta.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose.connect(URL,{useNewUrlParser:true,useCreateIndex:true},(e,r)=>{
  if(e)
    return console.log(e);

  console.log('connected');
})
