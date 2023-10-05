const pool = require("../../db/db_config");
const jwt = require("jsonwebtoken");

const getCourses = async () => {
  let courses = await pool.query(`select * from courses`);
  return courses.rows;
};

const getCourse = async (_, args, context) => {
  const { id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedCourse = await pool.query(
    `select * from courses where id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedCourse.rowCount === 0) return { message: "Course not found!" };

  return foundedCourse.rows[0];
};

const createCourse = async (args, context) => {
  const { title, price, description, teacher_id } = args;
  console.log(args);
  console.log(context);

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  if (
    title.length === 0 ||
    price.length === 0 ||
    description.length === 0 ||
    teacher_id.length === 0
  )
    return { message: "Fill the input value" };

  await pool.query(
    `INSERT INTO courses(title, price, description, teacher_id, created_by_user_id)
     VALUES($1, $2, $3, $4, $5)`,
    [title, price, description, teacher_id, userInfo.id]
  );

  return { message: "Created course!" };
};

const deleteCourse = async (args, context) => {
  const { id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedCourse = await pool.query(
    `
  SELECT FROM courses WHERE id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedCourse.rowCount === 0) return { message: "Course not found!" };

  await pool.query(` DELETE FROM courses WHERE id = $1 `, [id]);
  return { message: "Deleted course!" };
};

const updateCourse = async (args, context) => {
  let { id, title, price, description, teacher_id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedCourse = await pool.query(
    `SELECT FROM courses WHERE id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedCourse.rowCount === 0) return { message: "Course not found!" };

  title = title ? title : foundedCourse.title;
  price = price ? price : foundedCourse.price;
  description = description ? description : foundedCourse.description;
  teacher_id = teacher_id ? teacher_id : foundedCourse.teacher_id;

  await pool.query(
    `UPDATE courses set title = $1, price = $2, description = $3, teacher_id = $4
     WHERE id = $5`,
    [title, price, description, teacher_id, id]
  );
  return { message: "Updated Course!" };
};

module.exports = {
  getCourse,
  getCourses,
  createCourse,
  deleteCourse,
  updateCourse,
};
