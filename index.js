import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import schema from './schema.js';
import mongoose from 'mongoose';
import resolvers from './resolvers/index.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

mongoose
  .connect('mongodb://127.0.0.1:27017/graphql')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});
const port = 8000;

startStandaloneServer(server, {
  listen: { port },
  context: async ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const decoded = jwt.verify(authorization, process.env.SECRET);
      return decoded;
    }
  },
})
  .then(({ url }) => {
    console.log(`ApolloServer started on port ${url}`);
  })
  .catch((err) => {
    console.error(`Error starting ApolloServer: ${err}`);
  });
