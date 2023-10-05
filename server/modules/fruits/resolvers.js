const {
  getFruits,
  getFruit,
  createFruit,
  deleteFruit,
  updateFruit,
} = require("./model");

module.exports = {
  Query: {
    getFruits: async () => await getFruits(),
  },
  Mutation: {
    getFruit: async (_, args, context) => await getFruit(_, args, context),
    createFruit: async (_, args, context) => await createFruit(args, context),
    deleteFruit: async (_, args, context) => await deleteFruit(args, context),
    updateFruit: async (_, args, context) => await updateFruit(args, context),
  },
};
