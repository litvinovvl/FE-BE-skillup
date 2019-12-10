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

export const getPodcasts = graphql(GET_PODCASTS, {
  options: () => ({
    fetchPolicy: 'network-only'
  }),
  props: ({ data }: any) => {
    if (data.loading) return { loading: data.loading, podcasts: [] };
    if (data.error) return { error: data.error, podcasts: [] };
    return {
      podcasts: data.getPodcasts,
      loading: false
    }
  },
});

export default compose(getPodcasts)(List);
