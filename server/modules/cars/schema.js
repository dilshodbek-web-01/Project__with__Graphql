const { gql } = require("apollo-server-express");

module.exports = gql`
   type Car{
    id: ID,
    title: String,
    price: String,
    color: String,
    description: String,
    created_by_user_id: String,
    message: String
   }

   type Message {
    message: String!
   }

   type Query {
      getCars: [ Car! ]
   }

   type Mutation {

      getCar(id: String!): Car,
    
    createCar(
      title: String!,
      price: String!,
      color: String!,
      description: String!,
      created_by_user_id: String): Message,
      
      deleteCar(id: ID!): Message,

      updateCar(id: ID!,
         title: String,
         price: String,
         color: String,
         description: String
         ): Message
   }

`

