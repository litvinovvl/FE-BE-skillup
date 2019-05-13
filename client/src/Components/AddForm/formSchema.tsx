import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';

export const formSchema = (genres: any[], authors: any[], labels: any[]) => ({
  author: {
    label: "Author",
    select: true,
    children: authors.map(({ name }: any) => (
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    ))
  },
  title: {
    label: "Title"
  },
  description: {
    label: "Description",
    rows: 5,
    multiline: true
  },
  label: {
    label: "Label",
    select: true,
    children: labels.map(({ name }: any) => (
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    ))
  },
  genre: {
    label: "Genre",
    select: true,
    children: genres.map(({ name }: any) => (
      <MenuItem key={name} value={name}>
        {name}
      </MenuItem>
    ))
  },
  bpm: {
    label: "BPM"
  },
  duration: {
    label: "Duration"
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
