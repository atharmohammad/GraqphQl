const mongoose = require('mongoose');
const URL = 'mongodb+srv://athar:athar123@task-manager-cluster.w1cta.mongodb.net/graphQL?retryWrites=true&w=majority'

mongoose.connect(URL,{useNewUrlParser:true,useCreateIndex:true},(e,r)=>{
  if(e)
    return console.log(e);

  console.log('connected');
})
