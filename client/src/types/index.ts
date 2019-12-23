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
  label: string
  genre: Genre
  bpm: number
  duration: {
    hours: number
    minutes: number
  }
  thumbnail: string
  release_date: Date
}
