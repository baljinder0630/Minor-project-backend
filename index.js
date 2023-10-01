import express from "express"
import dotenv from 'dotenv'
import api from "./routes/api.routes.js"
import db from "./config/db.js"

dotenv.config()
const app = express()

app.use(express.json())
// connectDb()

app.use('/api', api)


app.get("/", (req, res) => {
    res.send("Alzheimer Assistant Backend")
})

const port = process.env.PORT
app.listen(port, () => {
    console.log("Listening to the port " + port)
})

export default app