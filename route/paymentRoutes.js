const express = require("express");
const PaymentData = require("../controller/paymentController");
const router = express.Router();


router.get("/payments",PaymentData);
module.exports =router
