require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const { loginRouter } = require("./routes/login");
const { todoRouter } = require("./routes/todo");

const app = express();
app.use(express.json());

app.use("/v1/user", loginRouter);
app.use("/v1/todo", todoRouter);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB Server");

    app.listen(process.env.PORT, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed", err);
  }
}
main();
