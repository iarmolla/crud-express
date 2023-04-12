import express from "express"
import usersRoutes from "./routes/users.routes.js"
import auth from "./routes/auth.routes.js"
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(usersRoutes,cors())

app.use(auth, cors())

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" })
})

export default app;
