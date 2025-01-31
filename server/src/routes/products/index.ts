import { Router } from "express";
import { followRouter } from "./follow.route";

const productsRouter = Router();

productsRouter.use("/follow", followRouter);

export { productsRouter };
