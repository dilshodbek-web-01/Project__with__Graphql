const pool = require("../../db/db_config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (args) => {
  const { username, email, role, age, password } = args;

  const founded_user = await pool.query(
    `
  SELECT * FROM users WHERE username = $1 and email = $2`,
    [username, email]
  );

  foundedUser = founded_user.rowCount === 1;

  if (foundedUser) return { message: "User already registrated !!!." };

  const hashPwd = await bcrypt.hash(password, 12);

  await pool.query(
    `INSERT INTO users(username, email, role, age, password) 
    VALUES($1, $2, $3, $4, $5)`,
    [username, email, role, age, hashPwd]
  );
  return { message: "Registired!" };
};

const login = async (args) => {
  const { email, password } = args;

  let foundedUser = await pool.query(` SELECT * FROM users WHERE email = $1 `, [
    email,
  ]);

  foundedUser = foundedUser.rows[0];

  if (!foundedUser) return { msg: "User not found!!!" };

  let checkPwd = await bcrypt.compare(password, foundedUser.password);

  if (!checkPwd) return { msg: "Incorrect Password!" };

  let token = await jwt.sign(
    { id: foundedUser.id },
    process.env.SECRET_KEY,
    {}
  );

  return {
    message: "Logged in successfully",
    token,
  };
};

module.exports = {
  register,
  login,
};
