const { gql } = require("apollo-server-express");

module.exports = gql`
   type Animal{
    id: ID,
    title: String,
    color: String,
    type: String,
    created_by_user_id: String,
    message: String
   }

   type Message {
    message: String!
   }

   type Query {
      getAminals: [ Animal! ]
   }

   type Mutation {

   getAminal(id: String!): Animal,
    
   createAnimal(
      title: String!,
      color: String!,
      type: String!,
      created_by_user_id: String): Message,
      
      deleteAnimal(id: ID!): Message,

      updateAnimal(id: ID!,
         title: String!,
         color: String!,
         type: String!,
         ): Message
   }

`

