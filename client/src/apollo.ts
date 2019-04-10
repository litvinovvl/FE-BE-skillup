import ApolloClient from 'apollo-client';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache();
const link = createUploadLink({ uri: "http://localhost:5000/graphql" });

export default new ApolloClient({ link, cache });
