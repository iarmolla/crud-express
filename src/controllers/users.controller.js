import pool from "../db.js";

export const getUsers = async (req, res) => {
  const [query] = await pool.query("select * from users");
  res.send(query);
};

export const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const [rows] = await pool.query("select * from users where id = ?", userId);
    res.send(rows);
  } catch {
    res.status(404).json({ message: "Not found" });
  }
};

export const insertUser = async (req, res) => {
  console.log(req.body)
  try {
    const user = req.body;
    const [query] = await pool.query(
      `
        insert into users(name,salary)
        values (?,?)
    `,
      [user.name, user.salary]
    );
    res.send(query);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

export const updateSalary = async (req, res) => {
  const { salary } = req.body;
  await pool.query(
    `
    update users
    set salary = ?
    where id = ?
    `,
    [salary, req.params.id]
  );
  res.sendStatus(204);
}

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  await pool.query("delete from users where id = ?", [id]);
  res.sendStatus(204);
}

export const updateUser = async (req, res) => {
  const { name, salary } = req.body;
  const userId = parseInt(req.params.id);
  await pool.query(`update users set name = ?, salary = ? where id = ?`, [
    name,
    salary,
    userId,
  ]);
  res.sendStatus(204);
}
