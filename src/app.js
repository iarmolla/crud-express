import express from "express"
import usersRoutes from "./routes/users.routes.js"

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(usersRoutes)

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" })
})

export default app;
