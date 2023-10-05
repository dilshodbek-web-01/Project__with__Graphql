const pool = require("../../db/db_config");
const jwt = require("jsonwebtoken");

const getCars = async () => {
  let cars = await pool.query(`select * from cars`);
  return cars.rows;
};

const getCar = async (_, args, context) => {
  const { id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedCar = await pool.query(
    `select * from cars where id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedCar.rowCount === 0) return { message: "Car not found!" };

  return foundedCar.rows[0];
};

const createCar = async (args, context) => {
  const { title, price, color, description } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  if (
    title.length === 0 ||
    price.length === 0 ||
    color.length === 0 ||
    description.length === 0
  )
    return { message: "Fill the input value" };

  await pool.query(
    `INSERT INTO cars(title, price, color, description, created_by_user_id)
     VALUES($1, $2, $3, $4, $5)`,
    [title, price, color, description, userInfo.id]
  );

  return { message: "Created car!" };
};

const deleteCar = async (args, context) => {
  const { id } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedCar = await pool.query(
    `
  SELECT FROM cars WHERE id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedCar.rowCount === 0) return { message: "Car not found!" };

  await pool.query(` DELETE FROM cars WHERE id = $1 `, [id]);
  return { message: "Deleted car!" };
};

const updateCar = async (args, context) => {
  let { id, title, price, color, description } = args;

  let userInfo = await jwt.verify(context.token, process.env.SECRET_KEY);

  let foundedCar = await pool.query(
    `SELECT FROM cars WHERE id = $1 AND created_by_user_id = $2`,
    [id, userInfo.id]
  );

  if (foundedCar.rowCount === 0) return { message: "Car not found!" };

  title = title ? title : foundedCar.title;
  price = price ? price : foundedCar.price;
  color = color ? color : foundedCar.color;
  description = description ? description : foundedCar.description;

  await pool.query(
    `UPDATE cars set title = $1, price = $2, color = $3, description = $4 WHERE id = $5`,
    [title, price, color, description, id]
  );
  return { message: "Updated Car!" };
};

module.exports = {
  getCar,
  getCars,
  createCar,
  deleteCar,
  updateCar,
};
