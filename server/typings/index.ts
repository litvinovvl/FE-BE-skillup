import { FileUpload } from "graphql-upload"

export type Label = {
  id: number
  name: string
}

export type Genre = {
  id: number
  name: string
}

export type Author = {
  id: number
  name: string
  label: Label
}

export type Podcast = {
  id: number
  author: Author
  title: string
  description: string
  genre: Genre
  bpm: number
  duration: number
  thumbnail: FileUpload
  date: string
}
