const { register, login } = require("./model");

module.exports = {
  Mutation: {
    register: async (_, args) => register(args),
    login: async (_, args) => login(args),
  },
};
