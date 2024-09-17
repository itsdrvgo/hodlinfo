import { db } from "@/lib/db";
import { CResponse, handleError } from "@/lib/utils";
import type { DynamicTickerData } from "@/lib/validations";
import axios from "axios";
import type { Request, Response } from "express";

class TickerController {
    validate = async (req: Request, res: Response) => {
        try {
            const { data } = await axios.get<DynamicTickerData>(
                process.env.WAZIRX_BASE_URL + "/tickers"
            );

            const tickers = Object.values(data).slice(0, 10);

            await db.tickers.deleteMany();
            await db.tickers.insertMany(tickers);

            return CResponse({
                res,
                message: "OK",
                data: tickers,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };

    getTickers = async (req: Request, res: Response) => {
        try {
            const tickers = await db.tickers.find();

            return CResponse({
                res,
                message: "OK",
                data: tickers,
            });
        } catch (err) {
            return handleError(err, res);
        }
    };
}

export const tickerController = new TickerController();
