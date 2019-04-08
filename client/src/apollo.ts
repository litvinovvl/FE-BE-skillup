import ApolloClient from 'apollo-client';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = createHttpLink({ uri: "http://localhost:5000/graphql" });

export default new ApolloClient({ link, cache });
