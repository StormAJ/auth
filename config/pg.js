const { Pool } = require("pg");
const config = require("config");

const pool = new Pool({
  host: "localhost",
  port: 6000,
  user: "postgres",
  database: "postgres",
  password: "1234"
});

async function dbRequest(query, res) {
  try {
    return await pool.query(query);
  } catch (err) {
    if (err.detail) res.status(403).send(err.detail);
    else res.status(403).send(err);
    return null;
  }
}

async function initDb(table) {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS ${table} ` +
      "(name character varying, " +
      "email character varying, " +
      "pw character varying, " +
      "created date)"
  );
  try {
    await pool.query(`ALTER TABLE ${table} ` + "ADD PRIMARY KEY (email)");
  } catch (err) {}
}

// module.exports.pool = pool;
module.exports = { dbRequest, pool, initDb };
