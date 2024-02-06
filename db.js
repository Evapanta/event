const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "events",
  password: "admin",
  port: 5432,
});

client.query('SELECT * FROM events."Booking"', (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(result.rows); // Result rows from the SELECT query

  // Close the connection after the query is executed
  // client.end();
});

module.exports = client;
