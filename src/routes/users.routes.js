import { Router } from "express"
import {
  getUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  update
} from "../controllers/users.controller.js"
import { verifyToken } from '../middlewares/index.js'
const router = Router()

router.get("/users", getUsers)

router.get("/users/:query", getUser)

router.post("/users", verifyToken, insertUser)

router.delete("/users/:id",verifyToken, deleteUser)

router.put("/users",verifyToken, updateUser)

router.patch("/users",verifyToken,update)

export default router
