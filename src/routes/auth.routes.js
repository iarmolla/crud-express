import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import cors from 'cors'

const router = Router();

router.post("/register",cors(), register);

router.post("/login",cors(), login);
 

export default router;
