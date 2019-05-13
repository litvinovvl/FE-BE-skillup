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

export const GET_GENRES = gql`
  query {
    getGenres {
      name
    }
  }
`;

const getGenres = graphql(GET_GENRES, {
  props: ({ data }: any) => {
    if (data.loading || data.error) return { genres: [] };
    return {
      genres: data.getGenres
    }
  },
});

export const GET_AUTHORS = gql`
  query {
    getAuthors {
      name
    }
  }
`;

const getAuthors = graphql(GET_AUTHORS, {
  props: ({ data }: any) => {
    if (data.loading || data.error) return { authors: [] };
    return {
      authors: data.getAuthors
    }
  },
});

export const GET_LABELS = gql`
  query {
    getLabels {
      name
    }
  }
`;

const getLabels = graphql(GET_LABELS, {
  props: ({ data }: any) => {
    if (data.loading || data.error) return { labels: [] };
    return {
      labels: data.getLabels
    }
  },
});

export default compose(addPodcast, getGenres, getAuthors, getLabels)(AddForm);
