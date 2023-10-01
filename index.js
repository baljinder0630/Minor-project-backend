import express from "express"
import dotenv from 'dotenv'
import { connectDb } from "./config/db.js"

dotenv.config()
const app = express()

app.use(express.json())
connectDb()

app.get("/", (req, res) => {
    res.send("Alzheimer Assistant Backend")
})

const port = process.env.PORT
app.listen(port, () => {
    console.log("Listening to the port " + port)
})