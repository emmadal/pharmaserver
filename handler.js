const fs = require("fs");
const { ApolloServer } = require("@apollo/server");
const {
  startServerAndCreateLambdaHandler,
} = require("@as-integrations/aws-lambda");

const resolvers = require("./src/resolvers.js");

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./src/schema.graphql", { encoding: "utf-8" }),
  resolvers,
  introspection: process.env.NODE_ENV !== 'production'
});

// This final export is important!
exports.graphqlHandler = startServerAndCreateLambdaHandler(server);
