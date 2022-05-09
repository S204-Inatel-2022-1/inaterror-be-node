import { Router } from "express";
import userRouter from "./routes";

const routes = Router();

routes.use("/user", userRouter);

export default routes;
