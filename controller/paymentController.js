const Payments = require("../model/UserPayment");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const RAZORPAY_API_KEY = process.env.API_KEY;
const RAZORPAY_API_SECRET = process.env.API_SECRET;

const PaymentData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.razorpay.com/v1/payments?count=35",
      {
        auth: {
          username: RAZORPAY_API_KEY,
          password: RAZORPAY_API_SECRET,
        },
      }
    );
    const payments = response.data.items;

    for (let paymentData of payments) {
      try {
        const payment = new Payments(paymentData);
        await payment.save();
      } catch (err) {
        console.error("Error saving payment:", err);
      }
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = PaymentData;
