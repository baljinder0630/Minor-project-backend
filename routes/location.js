import express from "express"
import getLocation from "../controller/location.js/getLocation.js"
import updateLocation from "../controller/location.js/updateLocation.js"
const router = express.Router()

router.get("/patient",getLocation)
router.post("/update",updateLocation)

export default router
