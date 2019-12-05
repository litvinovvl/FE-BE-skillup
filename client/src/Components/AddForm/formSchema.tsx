import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';

export const formSchema = (genres: any[], authors: any[], labels: any[], refetch: (fieldName: any, id: any) => void) => ({
  author: {
    label: "Author",
    select: true,
    refetch,
    children: authors.map((author: any) => (
      <MenuItem key={author.name} value={author}>
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
    children: labels.map((label: any) => (
      <MenuItem key={label.name} value={label}>
        {label.name}
      </MenuItem>
    )),
    refetch
  },
  genre: {
    label: "Genre",
    select: true,
    children: genres.map((genre: any) => (
      <MenuItem key={genre.name} value={genre}>
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
