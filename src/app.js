import express from "express"
import usersRoutes from "./routes/users.routes.js"
import auth from "./routes/auth.routes.js"
import cors from 'cors'

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://chimerical-mandazi-47f4f8.netlify.app');
  next();
});

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(usersRoutes,cors())

app.use(auth, cors())

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" })
})

export default app;
