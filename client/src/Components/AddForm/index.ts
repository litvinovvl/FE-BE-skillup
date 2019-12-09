import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import AddForm from './View';
import { GET_PODCASTS } from '../List';

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
    onCompleted: ({ addPodcast }: any) => ({ ...addPodcast }),
    refetchQueries: () => [{ query: GET_PODCASTS }],
  })
});

export const GET_GENRES = gql`
  query {
    getGenres {
      id
      name
    }
  }
`;

const getGenres = graphql(GET_GENRES, {
  props: ({ data }: any) => {
    if (data.loading || data.error) return { genres: [], genresLoading: data.loading, };
    return {
      genresLoading: data.loading,
      genres: data.getGenres
    }
  },
});

export const GET_AUTHORS = gql`
  query getAuthors ($labelId: Int) {
    getAuthors (labelId: $labelId ) {
      id
      name
      label {
        id
      }
    }
  }
`;

const getAuthors = graphql(GET_AUTHORS, {
  props: ({ data }: any) => {
    if (data.loading || data.error) {
      return {
        authorsLoading: data.loading,
        authors: [],
        refetchAuthors: data.refetch
      }
    };
    return {
      authorsLoading: data.loading,
      authors: data.getAuthors,
      refetchAuthors: data.refetch
    }
  },
});

export const GET_LABELS = gql`
  query getLabels ($labelId: Int) {
    getLabels (labelId: $labelId ) {
      id
      name
    }
  }
`;

const getLabels = graphql(GET_LABELS, {
  props: ({ data }: any) => {
    if (data.loading || data.error) {
      return {
        labelsLoading: data.loading,
        labels: [],
        refetchLabels: data.refetch
      };
    }
    return {
      labelsLoading: data.loading,
      labels: data.getLabels,
      refetchLabels: data.refetch
    }
  },
});

export default compose(addPodcast, getGenres, getAuthors, getLabels)(AddForm);
