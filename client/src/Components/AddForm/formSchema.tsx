import MenuItem from "@material-ui/core/MenuItem";
import React from "react";

import { IAuthor, IGenre, ILabel } from "../../types";

export const formSchema = (
  genres: IGenre[],
  authors: IAuthor[],
  labels: ILabel[],
  refetch: (fieldName: string, value: IAuthor | IGenre | ILabel | string ) => void
) => ({
  author: {
    label: "Author",
    select: true,
    refetch,
    children: authors.map((author: IAuthor) => (
      <MenuItem key={author.name} value={author as any}>
        {author.name}
      </MenuItem>
    ))
  },
  title: {
    label: "Title",
    refetch
  },
  description: {
    label: "Description",
    rows: 5,
    multiline: true,
    refetch
  },
  label: {
    label: "Label",
    select: true,
    children: labels.map((label: ILabel) => (
      <MenuItem key={label.name} value={label as any}>
        {label.name}
      </MenuItem>
    )),
    refetch
  },
  genre: {
    label: "Genre",
    select: true,
    children: genres.map((genre: IGenre) => (
      <MenuItem key={genre.name} value={genre as any}>
        {genre.name}
      </MenuItem>
    )),
    refetch
  },
  bpm: {
    label: "BPM",
    type: "number",
    refetch
  },
  duration: {
    label: "Duration",
    type: "number",
    refetch
  },
  thumbnail: {
    label: "Thumbnail",
    type: "file",
    accept: "image/*"
  },
  date: {
    label: "Release date",
    type: "date"
  }
})
