import express from "express";
import handleSendOtp from "../controller/forgotPassword/sendOtp.js";
import handleVerifyOtp from "../controller/forgotPassword/verifyOtp.js";
const router = express.Router();

router.route("/")
      .get(handleSendOtp)
      .post(handleVerifyOtp)
export default router;
