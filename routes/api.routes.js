import express from "express"
import auth from "./auth.js"
import todo from "./todo.js"
import location from "./location.js"
const router = express.Router()


router.use("/todo", todo)
router.use("/auth", auth)
router.use("/location",location)

export default router