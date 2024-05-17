import express from "express";
import auth from "./auth/index.js";

const api = express.Router();

api.use("/auth", auth);
// api.use("/conversations", conversations);
// api.use("/users", users);

export default api;
