import gql from "graphql-tag";

import { GraphQLRequest } from "apollo-link";
import { compose, graphql } from "react-apollo";

import AddForm from "./View";

import { IAuthor, IGenre, ILabel, IPodcast } from "../../types";
import { GET_PODCASTS } from "../Podcasts";

export interface IBaseFormValues {
  title: string
  description: string
  thumbnail: File
  date: Date
  bpm: number
  duration: number
}

export interface IFormValues extends IBaseFormValues {
  label: number
  author: number
  genre: number
}

export interface IFormInput extends IBaseFormValues {
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

export interface IPodcastInput {
  variables: {
    input: IFormValues
  }
}

export interface IPodcastOutput {
  data: {
    addPodcast: IPodcast
  }
}

const ADD_PODCAST: GraphQLRequest = gql`
  mutation addPodcast ($input: PodcastInput!) {
    addPodcast (input: $input) {
      title
    }
  }
`;

const addPodcast = graphql<{}, IPodcastOutput, { input: IFormValues }, {}>(ADD_PODCAST, {
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

interface IGenresOutput {
  getGenres: IGenre[]
}

const getGenres = graphql<{}, IGenresOutput, {}, {}>(GET_GENRES, {
  props: ({ data: { loading, error, getGenres: genres } }) => {
    if (loading) return { genres: [], genresLoading: loading };
    if (error) return { genres: [], error };
    return {
      genresLoading: loading,
      genres
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

interface IAuthorsOutput {
  getAuthors: IAuthor[]
}

const getAuthors = graphql<{}, IAuthorsOutput, {}, {}>(GET_AUTHORS, {
  props: ({ data: { loading, error, getAuthors: authors } }) => {
    if (loading) {
      return {
        authorsLoading: loading,
        authors: [],
      }
    };
    if (error) {
      return {
        authors: [],
        error
      }
    };
    return {
      authorsLoading: loading,
      authors
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

interface ILabelsOutput {
  getLabels: ILabel[]
}

const getLabels = graphql<{}, ILabelsOutput, {}, {}>(GET_LABELS, {
  props: ({ data: { loading, error, refetch, getLabels: labels } }) => {
    if (loading) {
      return {
        labelsLoading: loading,
        labels: [],
        refetchLabels: refetch
      };
    }
    if (error) {
      return {
        error,
        labels: [],
        refetchLabels: refetch
      };
    }
    return {
      labelsLoading: loading,
      labels,
      refetchLabels: refetch
    }
  },
});

export default compose(addPodcast, getGenres, getAuthors, getLabels)(AddForm);
