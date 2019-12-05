export {}
const { getConnection, getRepository } = require('typeorm');
const { authors } = require('../../db/entity/authors');

const getAuthors = async ({ labelId }) => {
  const repo = getConnection().getRepository(authors);

  if (labelId) {
    return await repo.find({ relations: ['label', 'label.authors'], where: { label: { id: labelId } } });
  }

  return await repo.find({ relations: ['label', 'label.authors'] });
};

module.exports = {
  getAuthors
};
