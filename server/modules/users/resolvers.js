const { getUsers, createUser, getUser, deleteUser, updateUser } = require("./model")
module.exports = {
    Query: {
        getUsers: async () => await getUsers()
    },
    Mutation: {
        getUser: async (_, args,context)    => await getUser(args, context),
        createUser: async (_, args, context) => await createUser(args, context),
        deleteUser: async (_, args, context) => await deleteUser(args, context),
        updateUser: async (_, args, context) => await updateUser(args, context)
    }
}