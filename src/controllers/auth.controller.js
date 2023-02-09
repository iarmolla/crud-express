import bcrypt from "bcrypt";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import { secret } from "../config.js";

export const login = async (req, res) => {
  const user = req.body;
  const [rows] = await pool.query(
    "select * from users where email = ?",
    user.email
  );
  if (await comparePassword(user?.password, rows[0]?.password)) {
    const token = jwt.sign({ id: user?.id }, secret, {
      expiresIn: 86400,
    });
    return res.status(200).json({ token: token });
  } else {
    return res.status(401).json({ message: "invalid user or password" });
  }
  res.send("ok");
};

export const register = async (req, res) => {
  const user = req.body;
  const hash = await encryptPassword(user.password);
  const [rows] = await pool.query(
    "select * from users where email = ?",
    user.email
  );
  if (rows.length === 0) {
    const user = req.body;
    const [query] = await pool.query(
      `
            insert into users(name,lastname,salary,type,email,password)
            values (?,?,?,?,?,?)
        `,
      [user.name, user.lastname, user.salary, user.type, user.email, hash]
    );
    const [rows] = await pool.query(
      "select * from users where email = ?",
      user.email
    );
    const token = jwt.sign({id:rows[0].id},secret, {
      expiresIn: 86400,
    });

    res.json({ token: token });
  } else {
    res.json({ error: "error" });
  }
};
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};
