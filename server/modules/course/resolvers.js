const {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
} = require("./model");

module.exports = {
  Query: {
    courses: async () => await getCourses(),
  },
  Mutation: {
    getCourse: async (_, args, context) => await getCourse(_, args, context),
    createCourse: async (_, args, context) => await createCourse(args, context),
    deleteCourse: async (_, args, context) => await deleteCourse(args, context),
    updateCourse: async (_, args, context) => await updateCourse(args, context),
  },
};
