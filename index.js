const express = require("express");
const ConnectDatabase = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

ConnectDatabase();

//middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", require("./route/paymentRoutes"));

app.use("/api", require("./route/userRoutes"));


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port 5000`);
});
