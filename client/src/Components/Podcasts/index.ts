import gql from "graphql-tag";

import { GraphQLRequest } from "apollo-link";
import { compose, graphql } from "react-apollo";

import Podcasts from "./View";

import { IPodcast } from "../../types";

export const GET_PODCASTS: GraphQLRequest = gql`
  query {
    getPodcasts {
      id
      author {
        id
        name
        label {
          id
          name
        }
      }
      title
      description
      genre {
        id
        name
      }
      bpm
      duration
      thumbnail
      release_date
    }
  }
`;

interface IResponse {
  getPodcasts: IPodcast[]
}

export const getPodcasts = graphql<{}, IResponse, {}, {}>(GET_PODCASTS, {
  options: {
    fetchPolicy: "network-only"
  },
  props: ({ data: { loading, error, getPodcasts: podcasts } }) => {
    if (loading) return { loading, podcasts: [] };
    if (error) return { error, podcasts: [] };
    return {
      podcasts,
      loading: false
    }
  },
});

export default compose(getPodcasts)(Podcasts);
