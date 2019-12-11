export {}
const { getConnection } = require('typeorm');
const { genres } = require('../../db/entity/genres');

const getGenres = async () => {
  try {
    const repo = getConnection().getRepository(genres);
    const genresRes = await repo.find();

    return genresRes;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getGenres
};
