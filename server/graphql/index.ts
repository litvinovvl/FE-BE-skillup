import * as graphqlHTTP from "express-graphql";
import { Router } from "express";

import rootSchema from "./types";
import rootResolvers from "./resolvers";

const router = Router();

router.all("/", graphqlHTTP({
  schema: rootSchema,
  rootValue: rootResolvers,
  graphiql: true
}));

export default router;
