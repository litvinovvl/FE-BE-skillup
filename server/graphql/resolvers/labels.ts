export {}
const { getConnection, getRepository } = require('typeorm');
const { labels } = require('../../db/entity/labels');

const getLabels = async ({ labelId }) => {
  try {
    const repo = getConnection().getRepository(labels);

    if (labelId) {
      const authorsList = await repo.find({ relations: ['authors'], where: { id: labelId } });

      return authorsList;
    }

    const authorsList = await repo.find({ relations: ['authors']});

    return authorsList;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  getLabels
};
