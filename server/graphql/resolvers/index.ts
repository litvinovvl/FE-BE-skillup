const labels = require('./labels');
const genres = require('./genres');
const authors = require('./authors');
const podcasts = require('./podcasts');

module.exports = {
  ...labels,
  ...genres,
  ...authors,
  ...podcasts,
}
