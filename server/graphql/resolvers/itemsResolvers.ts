const { GraphQLDate } = require('graphql-iso-date');
const GraphQLObjectId = require('graphql-scalar-objectid');
const { GraphQLUpload } = require('graphql-upload');
// const Todo = require('../../models/todo');

const getPodcasts = async (filter) => {
  return [{ title: "test" }]
};

// const getItemById = async ({ id }) => await Todo.findById(id);

const addPodcast = async ({ input }) => {
  console.log(input.thumbnail)
  return { title: "test" }
};

// const updateItem = async ({ id, title, completed }) => await Todo.findByIdAndUpdate(id, { $set: { title, completed } }, { new: true });

// const deleteItem = async ({ id }) => {
//   await Todo.findByIdAndRemove(id);

//   return id;
// };

module.exports = {
  getPodcasts,
  // getItemById,
  addPodcast,
  // updateItem,
  // deleteItem,
  DateTime: GraphQLDate,
  ObjectID: GraphQLObjectId,
  Upload: GraphQLUpload
};
