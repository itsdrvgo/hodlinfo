import { Router } from "express";
import tickerRouter from "./ticker.routes";

const apiRouter = Router();

apiRouter.use("/tickers", tickerRouter);

export { apiRouter };
