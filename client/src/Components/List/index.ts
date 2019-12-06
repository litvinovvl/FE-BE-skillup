import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import List from './View';

export const GET_PODCASTS = gql`
  query {
    getPodcasts {
      id
      author {
        id
        name
      }
      title
      description
      label
      genre {
        id
        name
      }
      bpm
      duration
      thumbnail
      date
    }
  }
`;

const getPodcasts = graphql(GET_PODCASTS, {
  props: ({ data }: any) => {
    if (data.loading || data.error) return { podcasts: [] };
    return {
      podcasts: data.getPodcasts
    }
  },
});

export default compose(getPodcasts)(List);
