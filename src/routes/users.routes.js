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
import cors from 'cors'

const router = Router()

router.get("/users", cors(), getUsers)

router.get("/users/:query",cors(), getUser)

router.post("/users",cors(), verifyToken, insertUser)

router.delete("/users/:id",cors(), verifyToken, deleteUser)

router.put("/users",cors(), verifyToken, updateUser)

router.patch("/users",cors(), verifyToken, update)

export default router
