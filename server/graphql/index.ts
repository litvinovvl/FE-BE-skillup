const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./types/index.ts');
const rootResolvers = require('./resolvers/itemsResolvers.ts');

const router = express.Router();

router.all('/', graphqlHTTP({
  schema,
  rootValue: rootResolvers,
  graphiql: true
}));

module.exports = router;
