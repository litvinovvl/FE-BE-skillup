export {}
const { getConnection, getRepository } = require('typeorm');
const { genres } = require('../../db/entity/genres');

const getGenres = async () => {
  const repo = getConnection().getRepository(genres);

  return await repo.find();
};

module.exports = {
  getGenres
};
