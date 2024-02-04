const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();
const port = 3000;

// PostgreSQL database connection setup
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "events",
  password: "admin",
  port: 5432,
});

client.connect();

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, and images) from the 'public' directory
app.use(express.static("public"));

// Define route for the registration form submission
app.get("/registration", async (req, res) => {
  try {
    const { fname, email, password, confirm_password } = req.body;

    // Insert registration data into the database
    const result = await client.query(
      "INSERT INTO registration (fname, email, password, confirm_password) VALUES ($1, $2, $3, $4) RETURNING *",
      [fname, email, password, confirm_password]
    );

    // Send a response to the client
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Define route for the booking form submission
app.get("/bookings", async (req, res) => {
  try {
    const { event, name, email, date, price } = req.body;

    // Insert booking data into the database
    const result = await client.query(
      "INSERT INTO bookings (event_name, user_name, user_email, event_date, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [event, name, email, date, price]
    );

    // Send a response to the client
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Define route for the contact form submission
app.get("/contacts", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Insert contact data into the database
    const result = await client.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    // Send a response to the client
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
