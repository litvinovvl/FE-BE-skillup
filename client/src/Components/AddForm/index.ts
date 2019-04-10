import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import AddForm from './View';

const ADD_PODCAST = gql`
  mutation addPodcast ($input: PodcastInput!) {
    addPodcast (input: $input) {
      title
    }
  }
`;

const addPodcast = graphql(ADD_PODCAST, {
  name: 'addPodcast',
  options: () => ({
    onCompleted: ({ addPodcast: { title } }: any) => console.log(title),
  })
});

export default compose(addPodcast)(AddForm);
