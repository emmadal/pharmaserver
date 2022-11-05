const fs = require("fs");
const { ApolloServer } = require("@apollo/server");
const {
  startServerAndCreateLambdaHandler,
} = require("@as-integrations/aws-lambda");
const mongoose = require("mongoose");

const resolvers = require("./src/resolvers.js");

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./src/schema.graphql", { encoding: "utf-8" }),
  resolvers,
  introspection: process.env.NODE_ENV !== "production",
  csrfPrevention: true,
});

mongoose
  .connect(process.env.MONGO_URI, {
    keepAlive: true,
    serverSelectionTimeoutMS: 9000,
  })
  .then(() => console.log("Connected to Database 🥳"))
  .catch((err) => console.log('DB Error: ', err.message));

// This final export is important!
exports.graphqlHandler = startServerAndCreateLambdaHandler(server);
