import express from "express";
import handleSendOtp from "../controller/forgotPassword/sendOtp.js";
import handleVerifyOtp from "../controller/forgotPassword/verifyOtp.js";
import handleResetPassword from "../controller/forgotPassword/resetPassword.js";
const router = express.Router();

router
  .route("/")
  .get(handleSendOtp)
  .post(handleVerifyOtp)
  .put(handleResetPassword);
export default router;
