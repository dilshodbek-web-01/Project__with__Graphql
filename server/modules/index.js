const userModule = require("./users");
const courseModule = require("./course");
const carModule = require("./cars");
const authModule = require("./auth");
const fruitsModule = require("./fruits");
const animalsModule = require("./animals");

const { makeExecutableSchema } = require("@graphql-tools/schema");

module.exports = makeExecutableSchema({
  typeDefs: [
    userModule.typeDefs,
    courseModule.typeDefs,
    carModule.typeDefs,
    authModule.typeDefs,
    fruitsModule.typeDefs,
    animalsModule.typeDefs,
  ],

  resolvers: [
    userModule.resolvers,
    courseModule.resolvers,
    carModule.resolvers,
    authModule.resolvers,
    fruitsModule.resolvers,
    animalsModule.resolvers,
  ],
});
