import gql from "graphql-tag";
import { compose, graphql } from "react-apollo";
import { GraphQLRequest } from "apollo-link";

import AddForm from "./View";
import { GET_PODCASTS } from "../Podcasts";
import { Podcast, Genre, Author, Label } from "../../types";

export type BaseFormValues = {
  title: string
  description: string
  thumbnail: File
  date: Date
  bpm: number
  duration: number
}

export interface IFormValues extends BaseFormValues {
  label: number
  author: number
  genre: number
}

export interface IFormInput extends BaseFormValues {
  label: {
    id: number
  }
  author: {
    id: number
  }
  genre: {
    id: number
  }
}

export type PodcastInput = {
  variables: {
    input: IFormValues
  }
}

export type PodcastOutput = {
  data: {
    addPodcast: Podcast
  }
}

const ADD_PODCAST: GraphQLRequest = gql`
  mutation addPodcast ($input: PodcastInput!) {
    addPodcast (input: $input) {
      title
    }
  }
`;

const addPodcast = graphql<{}, PodcastOutput, { input: IFormValues }, {}>(ADD_PODCAST, {
  name: "addPodcast",
  options: () => ({
    onCompleted: (data) => (data),
    refetchQueries: () => [{ query: GET_PODCASTS }],
  })
});

export const GET_GENRES: GraphQLRequest = gql`
  query {
    getGenres {
      id
      name
    }
  }
`;

type GenresOutput = {
  getGenres: Genre[]
}

const getGenres = graphql<{}, GenresOutput, {}, {}>(GET_GENRES, {
  props: ({ data: { loading, error, getGenres } }) => {
    if (loading) return { genres: [], genresLoading: loading };
    if (error) return { genres: [], error: error };
    return {
      genresLoading: loading,
      genres: getGenres
    }
  },
});

export const GET_AUTHORS: GraphQLRequest = gql`
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

type AuthorsOutput = {
  getAuthors: Author[]
}

const getAuthors = graphql<{}, AuthorsOutput, {}, {}>(GET_AUTHORS, {
  props: ({ data: { loading, error, getAuthors } }) => {
    if (loading) {
      return {
        authorsLoading: loading,
        authors: [],
      }
    };
    if (error) {
      return {
        authors: [],
        error: error
      }
    };
    return {
      authorsLoading: loading,
      authors: getAuthors,
    }
  },
});

export const GET_LABELS: GraphQLRequest = gql`
  query getLabels ($labelId: Int) {
    getLabels (labelId: $labelId ) {
      id
      name
    }
  }
`;

type LabelsOutput = {
  getLabels: Label[]
}

const getLabels = graphql<{}, LabelsOutput, {}, {}>(GET_LABELS, {
  props: ({ data: { loading, error, refetch, getLabels } }) => {
    if (loading) {
      return {
        labelsLoading: loading,
        labels: [],
        refetchLabels: refetch
      };
    }
    if (error) {
      return {
        error: error,
        labels: [],
        refetchLabels: refetch
      };
    }
    return {
      labelsLoading: loading,
      labels: getLabels,
      refetchLabels: refetch
    }
  },
});

export default compose(addPodcast, getGenres, getAuthors, getLabels)(AddForm);
