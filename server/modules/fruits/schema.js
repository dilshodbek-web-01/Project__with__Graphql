const { gql } = require("apollo-server-express");

module.exports = gql`
   type Fruit{
    id: ID,
    title: String,
    price: String,
    country: String,
    description: String,
    created_by_user_id: String,
    message: String
   }

   type Message {
    message: String!
   }

   type Query {
      getFruits: [ Fruit! ]
   }

   type Mutation {

      getFruit(id: String!): Fruit,
    
    createFruit(
      title: String!,
      price: String!,
      country: String!,
      description: String!,
      created_by_user_id: String): Message,
      
      deleteFruit(id: ID!): Message,

      updateFruit(id: ID!,
         title: String!,
         price: String!,
         country: String!,
         description: String!
         ): Message
   }

`

