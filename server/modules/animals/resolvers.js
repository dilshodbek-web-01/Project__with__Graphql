const {
  getAminals,
  getAminal,
  createAnimal,
  deleteAnimal,
  updateAnimal,
} = require("./model");

module.exports = {
  Query: {
    getAminals: async () => await getAminals(),
  },
  Mutation: {
    getAminal: async (_, args, context) => await getAminal(_, args, context),
    createAnimal: async (_, args, context) => await createAnimal(args, context),
    deleteAnimal: async (_, args, context) => await deleteAnimal(args, context),
    updateAnimal: async (_, args, context) => await updateAnimal(args, context),
  },
};
