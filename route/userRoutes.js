const express = require("express");
const Loginuser = require("../controller/userController");
const router =express.Router();

router.post("/login",Loginuser)
module.exports = router

