const pool = require("../../db/db_config");
const jwt = require("jsonwebtoken");

const getFruits = async () => {
  let fruits = await pool.query(`select * from fruits`);
  return fruits.rows;
};

const getFruit = async (_, args, context) => {
  const { id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedFruit = await pool.query(
    `select * from fruits where id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedFruit.rowCount === 0) return { message: "Fruit not found!" };

  return foundedFruit.rows[0];
};

const createFruit = async (args, context) => {
  const { title, price, country, description } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  if (
    title.length === 0 ||
    price.length === 0 ||
    country.length === 0 ||
    description.length === 0
  )
    return { message: "Fill the input value" };

  await pool.query(
    `INSERT INTO fruits(title, price, country, description, created_by_user_id)
     VALUES($1, $2, $3, $4, $5)`,
    [title, price, country, description, userInfo.id]
  );

  return { message: "Created fruit!" };
};

const deleteFruit = async (args, context) => {
  const { id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedFruit = await pool.query(
    `
  SELECT FROM fruits WHERE id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedFruit.rowCount === 0) return { message: "fruit not found!" };

  await pool.query(` DELETE FROM fruits WHERE id = $1 `, [id]);
  return { message: "Deleted fruit!" };
};

const updateFruit = async (args, context) => {
  let { id, title, price, country, description } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedFruit = await pool.query(
    `SELECT FROM fruits WHERE id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedFruit.rowCount === 0) return { message: "Fruit not found!" };

  title = title ? title : foundedFruit.title;
  price = price ? price : foundedFruit.price;
  country = country ? country : foundedFruit.country;
  description = description ? description : foundedFruit.description;

  await pool.query(
    `UPDATE fruits set title = $1, price = $2, country = $3, description = $4 
    WHERE id = $5`,
    [title, price, country, description, id]
  );
  return { message: "Updated fruit!" };
};

module.exports = {
  getFruit,
  getFruits,
  createFruit,
  deleteFruit,
  updateFruit,
};
