const pool = require("../../db/db_config");
const jwt = require("jsonwebtoken");

const getAminals = async () => {
  let animals = await pool.query(`select * from animals`);
  return animals.rows;
};

const getAminal = async (_, args, context) => {
  const { id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedAnimal = await pool.query(
    `select * from animals where id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedAnimal.rowCount === 0) return { message: "Animal not found!" };

  return foundedAnimal.rows[0];
};

const createAnimal = async (args, context) => {
  const { title, color, type } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  if (title.length === 0 || color.length === 0 || type.length === 0)
    return { message: "Fill the input value" };

  await pool.query(
    `INSERT INTO animals(title, color, type, created_by_user_id)
     VALUES($1, $2, $3, $4)`,
    [title, color, type, userInfo.id]
  );

  return { message: "Created animal!" };
};

const deleteAnimal = async (args, context) => {
  const { id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedAnimal = await pool.query(
    `
  SELECT FROM animals WHERE id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedAnimal.rowCount === 0) return { message: "Animal not found!" };

  await pool.query(` DELETE FROM animals WHERE id = $1 `, [id]);
  return { message: "Deleted animal!" };
};

const updateAnimal = async (args, context) => {
  let { id, title, color, type } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedAnimal = await pool.query(
    `SELECT FROM animals WHERE id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedAnimal.rowCount === 0) return { message: "Animal not found!" };

  title = title ? title : foundedAnimal.title;
  color = color ? color : foundedAnimal.color;
  type = type ? type : foundedAnimal.type;

  await pool.query(
    `UPDATE animals set title = $1, color = $2, type = $3 WHERE id = $4`,
    [title, color, type, id]
  );
  return { message: "Updated Animal!" };
};

module.exports = {
  getAminal,
  getAminals,
  createAnimal,
  deleteAnimal,
  updateAnimal,
};
