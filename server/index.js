const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

const { ApolloServer } = require("apollo-server-express");
const schema = require("./modules");

app.get("/", (req, res) => {
  return res.send("OK");
});

const startApolloServer = async () => {
  const server = new ApolloServer({
    context: ({ req }) => {
      return req.headers;
    },
    introspection: true,
    schema,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });
  console.log(
    `Apollo server is running at http://localhost:${port}${server.graphqlPath}`
  );
};

startApolloServer();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
