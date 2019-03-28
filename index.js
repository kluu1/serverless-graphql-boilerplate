import express from 'express';
import serverless from 'serverless-http';
import graphiql from 'graphql-playground-middleware-express';
import { ApolloServer } from 'apollo-server-express';
import fs from 'fs';

const typeDefs = fs.readFileSync('./graphql/typeDefs.gql', 'utf-8');
const resolvers = require('./graphql/resolvers');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.get('/playground', graphiql({ endpoint: '/graphql' }));

const handler = serverless(app);

export { handler };