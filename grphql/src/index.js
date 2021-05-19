const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
require('./db/mongoose');
const resolver = require('./resolvers/index');
const schema = require('./schema/index');
const isAuth = require("./middleware/auth");
const cors = require("cors");

const port = process.env.port || 8100 ;


app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());
app.use(isAuth);

app.use('/graphql',graphqlHTTP({
  schema:schema,
  rootValue:resolver,
  graphiql:true
}))

app.listen(port,()=>console.log('server is running at port ' + port));
