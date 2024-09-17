import { Ticker } from "@/app/models";
import mongoose from "mongoose";
import { logger } from "../helpers";
import { generateDbUrl } from "../utils";

class Database {
    private readonly uri: string;
    public readonly tickers: typeof Ticker;

    constructor(uri: string) {
        this.uri = uri;
        this.tickers = Ticker;
    }

    connect = async () => {
        const connection = await mongoose.connect(this.uri);
        logger.info(`Connected to database : ${connection.connection.name}`);
    };

    disconnect = async () => {
        await mongoose.disconnect();
        logger.info("Disconnected from database");
    };
}

export const db = new Database(generateDbUrl());
