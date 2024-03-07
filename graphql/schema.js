const { buildSchema } = require("graphql");

module.exports = buildSchema(`
   type Book {
      id: ID!
      title: String!
      author: String!
      isRead: Boolean!
   }

   input BookInputData {
      title: String!
      author: String!
      isRead: Boolean!
   }

   type User {
      id: ID!
      email: String!
      password: String!
   }

   type AuthData {
      token: String!
      userId: String!
   }

   input UserInputData {
      email: String!
      password: String!
   }

   type RootQuery {
      book(id: ID!): Book!
      books: [Book!]
      login(userInput: UserInputData!) : AuthData!
   }

   type RootMutation {
      addBook(bookInput: BookInputData!): Book!
      updateBook(id: ID!, bookInput: BookInputData!): Book!
      deleteBook(id: ID!): Boolean!
      signup(userInput: UserInputData!): User!
   }

   schema {
      query: RootQuery
      mutation: RootMutation
   }
`)