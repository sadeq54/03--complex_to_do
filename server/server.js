
import express from "express";
import db from "./db.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const port = process.env.PORT || 8000;

// middleware
const app = express();
app.use(cors());
app.use(express.json());

// routes

// get all todoes

// fetch all todoes that belong to a specific user email
app.get("/todo/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const response = await db.query(
      "SELECT * FROM todos where user_email = $1",
      [userEmail]
    );
    res.json(response.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});

app.post("/todo", async (req, res) => {
  const { user_email, title, progress, date } = req.body;

  try {
    const response = await db.query(
      "insert into todos VALUES ($1,$2,$3,$4,$5)",
      [uuidv4(), user_email, title, progress, date]
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});
app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const response = await db.query(
      "UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;",
      [user_email, title, progress, date, id]
    );
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.query("delete from todos where id = $1", [id]);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signup = await db.query(
      `insert into users (email, hashed_password) values($1, $2)`,
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    res.json({ email, token });
  } catch (error) {
    console.error(error);

    if (error.constraint === "users_pkey") {
      return res.status(400).json({ detail: "Email already exists" });
      res.status(500).json({ detail: "Internal Server Error" });
    }
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const dataDB = await db.query("select * from users where email = $1", [
      email,
    ]);

    if (!dataDB.rows.length)
      return res.status(400).json({ detail: "the email does not exist!" });

    const seuccess = await bcrypt.compare(
      password,
      dataDB.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });
    if (seuccess) {
      res.json({ email: dataDB.rows[0].email, token });
    } else {
      res.status(400).json({ detail: "wrong password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ detail: "Internal Server Error" });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port} at http://localhost:${port}`);
});


