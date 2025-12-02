import type { Request, Response } from "express";
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import type { ClientRequest, ClientRow } from "./interfaces";

const pool = new Pool({
  database: "jupiter_clients",
});

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.post("/clients", (req: Request<{}, {}, ClientRequest>, res: Response) => {
  const { fullName, title, email, phone, address } = req.body;

  const queryStr = `INSERT INTO clients (full_name, title, email, phone, address_line1, city, post_code)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

  const values = [
    fullName,
    title || null,
    email,
    phone,
    address.line1,
    address.city,
    address.postCode,
  ];

  pool
    .query<ClientRow>(queryStr, values)
    .then((result) => {
      res.status(201).json(result.rows[0]);
    })
    .catch((err: Error) => {
      console.error(err);
      res.status(500).json({ error: "Failed to save client" });
    });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
