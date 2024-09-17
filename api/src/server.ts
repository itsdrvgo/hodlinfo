import BP from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import { db } from "./lib/db";
import { initiateErrorHandler, logger } from "./lib/helpers";
import { apiRouter } from "./routes";

const app = express();

db.connect();

app.use(BP.json());
app.use(BP.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use("/api", apiRouter);

const url =
    process.env.NODE_ENV === "production"
        ? process.env.BACKEND_URL
        : `http://localhost:${process.env.PORT}`;

app.listen(process.env.PORT, async () => {
    initiateErrorHandler();
    logger.info(`Server running on ${url}`);
});
