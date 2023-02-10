import jwt from "jsonwebtoken";
import { secret } from '../config.js'
import pool from "../db.js";

export const verifyToken = async (req, res, next) => {

  try {
    const token = req.headers["x-access-token"];
    const encoded = jwt.verify(token, secret)
    const [rows] = await pool.query(
      "select * from users where id = ?",
      parseInt(encoded.id)
    );
    if (rows[0].type !== 1) {
      next()
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    res.status(404).json({ error: error?.message })
  }
};
