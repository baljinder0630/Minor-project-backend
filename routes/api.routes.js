import express from "express"
import auth from "./auth.js"
import todo from "./todo.js"
const router = express.Router()


router.use("/todo", todo)
router.use("/", auth)

export default router