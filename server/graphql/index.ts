import * as graphqlHTTP from 'express-graphql';

import { Router } from 'express';

import resolvers from './resolvers';
import types from './types';

const router = Router();

router.all('/', graphqlHTTP({
  schema: types,
  rootValue: resolvers,
  graphiql: true,
}));

export default router;
