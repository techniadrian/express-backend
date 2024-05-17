import "dotenv/config";
import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import User from "./models/User/index.js";
import api from "./api/index.js";
import errorHandler from "./middlewares/errorHandler.js";

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error(error));

const app = express();

app.use(express.json());

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ message: "wszystko ok", timestamp: Date.now() });
});

app.use("/api", api);

// app.get("/users", async (req, res) => {
//   const users = await User.find();
//   res.status(200).json({ data: users });
// });

// app.post("/register", async (req, res) => {
//   const { body, query } = req;
//   const { username, email, password } = body;

//   const user = await User.create({ username, email, password });
//   res.status(201).json({ message: "Zarejestrowano uzytkownika" });
// });

app.use(errorHandler);

app.listen(process.env.PORT || 8080, function () {
  const { port } = this.address();
  console.log(`Server listening on port: ${port}`);
});
