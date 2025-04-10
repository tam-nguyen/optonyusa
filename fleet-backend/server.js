// server.js
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "optonyusa",
  waitForConnections: true,
});

async function fetchVehicles() {
  let connection;
  try {
    connection = await pool.getConnection();
    let query = "SELECT * FROM public_vehicles";

    const [rows] = await connection.execute(query);

    return rows;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

app.get("/api/vehicles", async (req, res) => {
  try {
    const vehicles = await fetchVehicles();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});

app.post("/api/update", async (req, res) => {
  try {
    let connection = await pool.getConnection();
    const { id, name, body_type, maintenance_status, img_url } = req.body;
    console.log("this is backend Tam");
    console.log(req.body);
    const query =
      "INSERT INTO public_vehicles (id, name, body_type, maintenance_status, img_url) VALUES (?, ?, ?, ?, ?)";
    const values = [id, name, body_type, maintenance_status, img_url];

    const [result] = await connection.execute(query, values);
    connection.release();

    res
      .status(201)
      .json({ message: "Vehicle added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error adding vehicle:", error);
    res.status(500).json({ error: "Failed to add vehicle" });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
