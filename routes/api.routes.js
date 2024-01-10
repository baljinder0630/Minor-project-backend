import express from "express"
import auth from "./auth.js"
import location from "./location.js"
import profile from "./profile.js"
import allocateCaretaker from "../controller/caretakerAlloc/caretakerAllocation.js"
import assignedPatients from "../controller/caretakerAlloc/assignedPatients.js"
const router = express.Router()


router.use("/auth", auth)
router.use("/profile", profile)
router.use("/location", location)
router.post("/allocateCaretaker", allocateCaretaker)
router.get("/patientAssigned", assignedPatients)

export default router