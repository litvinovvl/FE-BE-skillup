const fs = require('fs');
const { buildSchema } = require('graphql');

const schema = fs.readFileSync(`${__dirname}/podcastsSchema.gql`, 'utf-8');

module.exports = buildSchema(schema);
