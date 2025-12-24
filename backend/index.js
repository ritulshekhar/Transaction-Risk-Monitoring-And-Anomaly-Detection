require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(express.json());

app.use("/api/transactions", require("./routes/transactions"));

app.listen(5000, () => console.log("Server started"));
app.use("/api/model", require("./routes/model"));
