const express = require("express");
const {
  PaymentData,
  updateTicketStatus,
} = require("../controller/paymentController");
const router = express.Router();

router.get("/payments", PaymentData);
router.post("/payments/status", updateTicketStatus);
module.exports = router;
