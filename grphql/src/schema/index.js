const {buildSchema} = require('graphql');


module.exports = buildSchema(`

  type AuthData{
    userId:ID!
    token:String!
    tokenExpiry:Int!
  }

  type Booking{
    _id:ID!
    event:Event!
    user:User!
  }

  type User{
    _id:ID!
    email:String!
    password:String
    event:[Event!]
  }

  input UserInput{
    email:String!
    password:String!
  }

  type Event{
    _id:ID!
    title:String!
    description:String!
    price:Float!
    date:String!
    creator:User!
  }

  input EventInput{
    title:String!
    description:String!
    price:Float!
    date:String!
  }

  type rootQuery{
    event:[Event!]!
    user:[User!]!
    booking:[Booking!]!
    login(email:String! , password:String!):AuthData!
  }

  type rootMutation{
    createEvent(eventInput:EventInput):Event
    createUser(userInput:UserInput):User
    createBooking(bookEvent:ID!):Booking
    cancelBooking(bookingId:ID!):Event
  }

  schema{
    query: rootQuery
    mutation:rootMutation
  }
`)
