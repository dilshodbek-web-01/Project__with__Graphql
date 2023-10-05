const {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
} = require("./model");

module.exports = {
  Query: {
    getCars: async () => await getCars(),
  },
  Mutation: {
    getCar: async (_, args, context) => await getCar(_, args, context),
    createCar: async (_, args, context) => await createCar(args, context),
    deleteCar: async (_, args, context) => await deleteCar(args, context),
    updateCar: async (_, args, context) => await updateCar(args, context),
  },
};
