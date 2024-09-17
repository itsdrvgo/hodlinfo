import { tickerController } from "@/app/controllers";
import { Router } from "express";

const tickerRouter = Router();

tickerRouter.get("/", tickerController.getTickers);
tickerRouter.get("/validate", tickerController.validate);

export default tickerRouter;
