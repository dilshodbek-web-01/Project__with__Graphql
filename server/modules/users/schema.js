const { gql } = require("apollo-server-express");

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
    message: String!
  }

  type Query {
    getUsers: [User!]
  }

  type Mutation {
    getUser(id: String!): User

    createUser(
      username: String!,
      email: String!,
      role: String!,
      age: Int!
      password: String!,
    ): Message
    
    deleteUser(id: ID!): Message

    updateUser(
      id: ID!,
      username: String!,
      email: String!,
      role: String!,
      age: Int!,
      password: String!,
    ): Message
  }
`;
