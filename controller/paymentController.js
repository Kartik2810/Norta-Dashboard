const Payments = require("../model/UserPayment");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const RAZORPAY_API_KEY = process.env.API_KEY;
const RAZORPAY_API_SECRET = process.env.API_SECRET;

const PaymentData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.razorpay.com/v1/payments?count=30",
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
        const existingPayment = await Payments.findOne({ id: paymentData.id });

        const payment = new Payments({
          ...paymentData,
          ticket_status: "pendind",
        });
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

const updateTicketStatus = async (req, res) => {
  const { id, newStatus } = req.body;

  try {
    const payment = await Payments.findOneAndUpdate(
      { id: id },
      { ticket_status: newStatus },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json(payment);
  } catch (error) {
    console.error("Error updating ticket status backend:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { PaymentData, updateTicketStatus };
