import { Router } from "express"
import {
  getUsers,
  getUser,
  insertUser,
  updateSalary,
  deleteUser,
  updateUser,
} from "../controllers/users.controller.js"
import { verifyToken } from '../middlewares/index.js'
const router = Router()

router.get("/users", getUsers)

router.get("/users/:id", getUser)

router.post("/users", verifyToken, insertUser)

router.delete("/users/:id",verifyToken, deleteUser)

router.put("/users",verifyToken, updateUser)

export default router
