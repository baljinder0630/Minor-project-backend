import express from "express"
import createToDo from "../controller/todo/createToDo.js"
import getToDoList from "../controller/todo/getToDoList.js"
import deleteToDo from "../controller/todo/deleteToDo.js"

const router = express()

router.post("/createToDo", createToDo)
router.get("/getToDoList", getToDoList)
router.post("/deleteToDo", deleteToDo)

export default router