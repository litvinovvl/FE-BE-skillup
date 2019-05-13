export {}
const { getConnection, getRepository } = require('typeorm');
const { podcasts } = require('../../db/entity/podcasts');

const getPodcasts = async () => {
  const repo = getConnection().getRepository(podcasts);

  return await repo.find({ relations: ['genre', 'author', 'author.label'] });;
};

module.exports = {
  getPodcasts
};
