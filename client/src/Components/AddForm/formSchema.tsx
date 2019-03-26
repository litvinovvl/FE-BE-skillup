import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';

const currencies = [1, 2, 3];

export const schema: any = {
  author: {
    label: "Author"
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
    label: "Label"
  },
  genre: {
    label: "Genre",
    select: true,
    children: currencies.map(option => (
      <MenuItem key={option} value={option}>
        {option}
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
  }
}