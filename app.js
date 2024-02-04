const express = require("express");
const bodyParser = require("body-parser");
const client = require("./db");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User Registration CRUD operations

// Create user (Registration)
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, id } = req.body;
    console.log(name, email, password);

    // Insert user into the database
    const result = await client.query(
      "INSERT INTO Registration (id,name, email, password) VALUES (  $1, $2, $3,$4) RETURNING *",
      [name, email, password, id]
    );

    // Send a response to the client
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Read all users
app.get("/register", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "Registration"');
    res.json(result.rows);
    console.log(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Update user
app.put("/register/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const result = await client.query(
      "UPDATE register SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [name, email, password, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete user
app.delete("/register/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await client.query("DELETE FROM register WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Booking CRUD operations

// Create booking
app.post("/bookings", async (req, res) => {
  try {
    const { eventName, name, email, date, price } = req.body;

    // Insert booking into the database
    const result = await client.query(
      "INSERT INTO bookings (event_name, user_name, user_email, event_date, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [eventName, name, email, date, price]
    );

    // Send a response to the client
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Read all bookings
app.get("/bookings", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM bookings");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update booking
app.put("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { eventName, name, email, date, price } = req.body;
    const result = await client.query(
      "UPDATE bookings SET event_name = $1, user_name = $2, user_email = $3, event_date = $4, price = $5 WHERE id = $6 RETURNING *",
      [eventName, name, email, date, price, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete booking
app.delete("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await client.query("DELETE FROM bookings WHERE id = $1", [id]);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Contact Us CRUD operations

// Create contact
app.post("/contacts", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Insert contact into the database
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

// Read all contacts
app.get("/contacts", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM contacts");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update contact
app.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, message } = req.body;
    const result = await client.query(
      "UPDATE contacts SET name = $1, email = $2, message = $3 WHERE id = $4 RETURNING *",
      [name, email, message, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete contact
app.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await client.query("DELETE FROM contacts WHERE id = $1", [id]);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
client.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("Db connected successfully");
});
