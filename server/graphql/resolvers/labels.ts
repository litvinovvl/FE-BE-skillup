export {}
const { getConnection, getRepository } = require('typeorm');
const { labels } = require('../../db/entity/labels');

const getLabels = async () => {
  const repo = getConnection().getRepository(labels);

  return await repo.find({ relations: ['authors'] });
};

module.exports = {
  getLabels
};
