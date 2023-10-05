const pg = require("pg");

const { Pool } = pg;

// --------- LOCAL DATABASE ----------- //
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "graphql_db",
//   password: "01023dk",
//   port: 5432,
// });

// --------- CONNECT ONLINE SERVER LINK ----------- // V1.
const pool = new Pool({
  connectionString:
    "postgres://gocawqdd:26H54YOPkqVLxRoZSSKT4ovW9vXWnAne@balarama.db.elephantsql.com/gocawqdd",
});

// --------- CONNECT ONLINE SERVER LINK ----------- // V2.
// const pool = new Pool({
//   user: "gocawqdd",
//   database: "gocawqdd",
//   host: "balarama.db.elephantsql.com",
//   password: "26H54YOPkqVLxRoZSSKT4ovW9vXWnAne",
//   port: 5432,
// });

module.exports = pool;
