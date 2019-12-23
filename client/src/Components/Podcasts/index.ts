import gql from "graphql-tag";
import { compose, graphql, ChildDataProps, DataValue } from "react-apollo";
import { GraphQLRequest } from "apollo-link";
import Podcasts from "./View";
import { Podcast } from "../../types";

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

type Response = {
  getPodcasts: Podcast[]
}

export const getPodcasts = graphql<{}, Response, {}, {}>(GET_PODCASTS, {
  options: {
    fetchPolicy: "network-only"
  },
  props: ({ data: { loading, error, getPodcasts } }) => {
    if (loading) return { loading, podcasts: [] };
    if (error) return { error, podcasts: [] };
    return {
      podcasts: getPodcasts,
      loading: false
    }
  },
});

export default compose(getPodcasts)(Podcasts);
