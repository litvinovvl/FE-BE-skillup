import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { GraphQLRequest } from "apollo-link";

import ListItem from "./View";
import { GET_PODCASTS } from "../Podcasts";

type Response = {
  removePodcast: {
    id: number
  }
}

export const REMOVE_PODCAST: GraphQLRequest = gql`
  mutation removePodcast ($input: RemovePodcastInput!) {
    removePodcast (input: $input) {
      id
    }
  }
`;

const removePodcast = graphql<{}, Response, {}, {}>(REMOVE_PODCAST, {
  name: "removePodcast",
  options: {
    refetchQueries: () => [{ query: GET_PODCASTS }],
    onCompleted: ({ removePodcast: { id } }) => ({ id }),
  },
});

export default compose(removePodcast)(ListItem);
