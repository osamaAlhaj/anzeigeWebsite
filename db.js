const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  connectionLimit: 5,
  database: "guestbook",
});

// setup DB
pool.query(`CREATE TABLE IF NOT EXISTS entry (
                  id INT(11) NOT NULL AUTO_INCREMENT,
                  name VARCHAR(255) NOT NULL,
                  text TEXT NOT NULL,
                  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                  PRIMARY KEY(id)
              )`)
  .then(() => console.info('Database initizalied'))
  .catch(err => {
    console.error('Could not initialize database', err);
    process.exit();
  });

module.exports = { pool };