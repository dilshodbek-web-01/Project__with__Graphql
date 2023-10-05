const { gql } = require("apollo-server-express")

module.exports = gql`
type User {
    id: ID,
    username: String!,
    email: String!,
    role: String!,
    age: Int!,
    password: String!
  }

   type Message {
    message: String!,
    token: String
   }
   
   type Query {
       users: [ User! ]
   }

type Mutation {
    register(username: String!, email: String!, role: String!, age: Int!, password: String!): Message,

    login(email: String!, password: String!): Message,
}
`
