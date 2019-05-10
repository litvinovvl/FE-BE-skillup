export {}
const { getConnection, getRepository } = require('typeorm');
const { authors } = require('../../db/entity/authors');

const getAuthors = async () => {
  const repo = getConnection().getRepository(authors);

  return await repo.find({ relations: ['label', 'label.authors'] });
};

module.exports = {
  getAuthors
};
