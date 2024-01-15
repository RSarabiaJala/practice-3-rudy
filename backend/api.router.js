import { Router } from "express";
import { authenticateToken } from "./authenticateToken.js";
import postRouter from "./post.router.js";

const apiRouter = Router()

apiRouter.use(authenticateToken)
apiRouter.use("/post", postRouter)
export default apiRouter;