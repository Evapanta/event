const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("pg");

const app = express();
const port = 4000;

// PostgreSQL database connection setup
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "events",
  password: "admin",
  port: 5432,
  keepAlive: true,
});

client.connect();

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML, CSS, and images) from the 'public' directory
app.use(express.static("public"));

// Define route for the registration form submission
app.post("/registration", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Insert registration data into the database
    const result = await client.query(
      "INSERT INTO registration (name, email, password,) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, password]
    );

    // Send a response to the client
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Define route for the booking form submission
app.post("/bookings", async (req, res) => {
  try {
    console.log("/bookings:", req.body);
    const { eventname, useremail, eventdate, price } = req.body;

    const result = await client.query(
      'INSERT INTO "Booking" (eventname, useremail, eventdate, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [eventname, useremail, eventdate, price]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Define route for the contact form submission
app.post("/contacts", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Insert contact data into the database
    const result = await client.query(
      "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    console.log(result);

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
