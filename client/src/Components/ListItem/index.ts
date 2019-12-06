import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import ListItem from './View';
import { GET_PODCASTS } from '../List';

export const REMOVE_PODCAST = gql`
  mutation removePodcast ($input: RemovePodcastInput!) {
    removePodcast (input: $input) {
      id
    }
  }
`;

const removePodcast = graphql(REMOVE_PODCAST, {
  name: 'removePodcast',
  options: {
    refetchQueries: () => [{ query: GET_PODCASTS }],
    onCompleted: ({ removePodcast: { id } }: any) => console.log(id),
  },
});

export default compose(removePodcast)(ListItem);
