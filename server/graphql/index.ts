const { Router } = require('express');
const graphqlHTTP = require('express-graphql');
const rootSchema = require('./types/index.ts');
const rootResolvers = require('./resolvers/index.ts');

const router = Router();

router.all('/', graphqlHTTP({
  schema: rootSchema,
  rootValue: rootResolvers,
  graphiql: true
}));

module.exports = router;
