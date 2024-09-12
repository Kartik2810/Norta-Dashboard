const bcrypt = require("bcrypt");

const HassPassword = async (password) => {
  try {
    const salt = 10;
    const hashpass = await bcrypt.hash(password, salt);
    return hashpass;
  } catch (error) {
    console.log(`error in hashpssword function ${error}`);
  }
};
module.exports = HassPassword;
