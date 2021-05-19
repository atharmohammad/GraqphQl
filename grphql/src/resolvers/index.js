const eventResolver = require("./Events");
const bookingResolver = require("./Bookings");
const userResolver = require("./User");

//Here we are calling getCreator and getEvent instead of polpulate.('').execPopulate
// because this way it will not go in infinite loop as graphql will call the inside fucntion only
// when we needed it so it will not call again and again and we can get nested data as much we want
const rootResolver = {
  ...eventResolver,
  ...bookingResolver,
  ...userResolver
}
module.exports = rootResolver;
