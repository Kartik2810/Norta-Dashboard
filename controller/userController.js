const User = require("../model/UserModel");
const HassPassword = require("../helper/password");
const dotenv = require("dotenv");
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const Loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email !== EMAIL || password !== PASSWORD) {
      return res
        .status(400)
        .send({ message: "Please provide email and password" });
    }
    const Hassdpass = await HassPassword(password);
    const user = new User({ email, password: Hassdpass });
    await user.save();
    res.status(200).send({
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    console.error(`Error in loginController: ${error}`);
    res.status(500).send({ message: "An error occurred during login" });
  }
};

module.exports = Loginuser;
