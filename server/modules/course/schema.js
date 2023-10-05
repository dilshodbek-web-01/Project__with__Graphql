const { gql } = require("apollo-server-express");

module.exports = gql`
   type Course{
    id: ID,
    title: String,
    price: String,
    description: String,
    teacher_id: String,
    created_by_user_id: String,
    message: String
   }

   type Message {
    message: String!
   }

   type Query {
       courses: [ Course! ]
   }

   type Mutation {

    getCourse(id: String!): Course ,
    
    createCourse(
      title: String!,
      price: String!,
      description: String!,
      teacher_id: String!,
      created_by_user_id: String): Message,
      
      deleteCourse(id: ID!): Message,

      updateCourse(id: ID!,
         title: String,
         price: String,
         description: String,
         teacher_id: String
         ): Message
   }

`

