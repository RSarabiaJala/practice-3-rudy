import { Router } from "express";
import apiRouter from "./api.router.js";
import { users } from "./fakeData.js";
import jwt from "jsonwebtoken"
import env from './environment.js'
export const appRouter = Router();
const {SECRET_KEY } = env;

appRouter.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
  
    const user = users.find(u => u.username === email && u.password === password);
  
    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }
  
    const accessToken = jwt.sign({id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '30m' });
  
    // Send the JWT token as a cookie
    return res.json({ accessToken });
  });
  
appRouter.use("/api", apiRouter)

export default appRouter;