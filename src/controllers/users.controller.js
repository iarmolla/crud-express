import pool from "../db.js";

export const getUsers = async (req, res) => {
  const [query] = await pool.query("select * from api_rest_db.users");
  console.log(query);
  res.send(query);
};

export const getUser = async (req, res) => {
  const userId = req.params.id;
  const [rows] = await pool.query(
    "select * from api_rest_db.users where id = ?",
    userId
  );
  res.send(rows);
};

export const insertUser = async (req, res) => {
  const user = req.body;
  const [query] = await pool.query(
    `
        insert into api_rest_db.users(name,salary)
        values (?,?)
    `,
    [user.name, user.salary]
  );
  res.send(query);
};

export const updateSalary = async (req, res) => {
  const { salary } = req.body;
  await pool.query(
    `
    update api_rest_db.users
    set salary = ?
    where id = ?
    `,
    [salary, req.params.id]
  );
  res.sendStatus(204);
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  await pool.query("delete from api_rest_db.users where id = ?", [id]);
  res.sendStatus(204);
};

export const updateUser = async (req, res) => {
  const {name, salary} = req.body;
  const userId = parseInt(req.params.id)
  await pool.query(
    `update api_rest_db.users set name = ?, salary = ? where id = ?`,
    [name,salary,userId]
  );
  res.sendStatus(204);
};
