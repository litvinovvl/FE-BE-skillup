import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
const { buildSchema } = require('graphql');

const typeDefs = mergeTypes(fileLoader(`${__dirname}/*.gql`), { all: true })

module.exports = buildSchema(typeDefs);
