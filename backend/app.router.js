import { Router } from "express";
import apiRouter from "./api.router.js";
import { users } from "./fakeData.js";
import jwt from "jsonwebtoken";
import env from "./environment.js";
import { randomInt } from "crypto";
export const appRouter = Router();
const { SECRET_KEY } = env;

appRouter.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.username === email && u.password === password
  );

  if (!user) {
    return res.status(404).json({ error: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "30m" }
  );

  // Send the JWT token as a cookie
  return res.json({ accessToken });
});

appRouter.post("/auth/register", (req, res) => {
  const { username, email, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Create a new user
  const newUser = {id: randomInt, username : email, password };
  users.push(newUser);

  return res
    .status(201)
    .json({ status: "success", message: "User registered successfully"});
});

appRouter.use("/api", apiRouter);

export default appRouter;
