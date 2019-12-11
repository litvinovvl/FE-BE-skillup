export {}
const { getConnection } = require('typeorm');
const { authors } = require('../../db/entity/authors');

const getAuthors = async ({ labelId }) => {
  try {
    const repo = getConnection().getRepository(authors);

    if (labelId) {
      const label = await repo.find({ relations: ['label', 'label.authors'], where: { label: { id: labelId } } });

      return label;
    }
    const label = await repo.find({ relations: ['label', 'label.authors'] });

    return label;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getAuthors
};
