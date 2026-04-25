const express = require("express");
const {
    sendEmailController,
    resendOtpController,
  } = require("../controllers/portfolioController.js");

//router object
const router = express.Router();

//routes
router.post("/sendEmail", sendEmailController);
router.post("/resend-otp", resendOtpController);

// /export
module.exports = router;