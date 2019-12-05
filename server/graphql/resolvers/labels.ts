export {}
const { getConnection, getRepository } = require('typeorm');
const { labels } = require('../../db/entity/labels');

const getLabels = async ({ labelId }) => {
  const repo = getConnection().getRepository(labels);
  if (labelId) {
    return await repo.find({ relations: ['authors'], where: { id: labelId } });
  }

  return await repo.find({ relations: ['authors']});
};

module.exports = {
  getLabels
};
