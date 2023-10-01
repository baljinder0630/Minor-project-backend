import express from "express"
import signup from "../controller/auth/signup"
const router = express.Router()

router.post("/signup", signup)