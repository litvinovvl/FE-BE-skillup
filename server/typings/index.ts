import { FileUpload } from 'graphql-upload';

export interface ILabel {
  id: number;
  name: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IAuthor {
  id: number;
  name: string;
  label: ILabel;
}

export interface IPodcast {
  id: number;
  author: IAuthor;
  title: string;
  description: string;
  genre: IGenre;
  bpm: number;
  duration: number;
  thumbnail: FileUpload;
  date: string;
}
