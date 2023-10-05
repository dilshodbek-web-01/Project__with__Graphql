const pool = require("../../db/db_config");
const bcrypt = require("bcrypt");

const getUsers = async () => {
  let users = await pool.query(`select * from users`);
  return users.rows;
};

const getUser = async ({ id }) => {
  let foundedUser = await pool.query(`select * from users where id = $1`, [id]);
  return foundedUser.rows[0];
};

const createUser = async (args) => {
  const { username, email, role, age, password } = args;
  let users = await getUsers();
  let foundedUser = users.find((u) => u.user_email === email);

  if (foundedUser) return { msg: "User already exists!" };

  await pool.query(
    `INSERT INTO users(id, user_name, user_email, user_password, user_age, user_surname, user_role) VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [users.length + 10, username, email, password, age, user_surname, user_role]
  );
  return { msg: "User created!" };
};

const deleteUser = async ({ id }) => {
  let foundedUser = await getUser({ id: id });

  if (!foundedUser) return { message: "User not found!" };

  await pool.query(` DELETE FROM users WHERE id = $1 `, [id]);
  return { message: "Deleted user!" };
};

const updateUser = async ({ id, username, email, role, age, password }) => {
  let foundedUser = await getUser({ id: id });

  if (!foundedUser) return { message: "User not found!" };

  let hashPwd = await bcrypt.hash(password, 12);

  username = username ? username : foundedUser.username;
  email = email ? email : foundedUser.email;
  role = role ? role : foundedUser.role;
  age = age ? age : foundedUser.age;
  password = password ? hashPwd : foundedUser.password;

  await pool.query(
    `UPDATE users set username = $1, email = $2, role = $3, age = $4, password = $5 
    WHERE id = $6`,
    [username, email, role, age, password, id]
  );
  return { message: "Updated user!" };
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
