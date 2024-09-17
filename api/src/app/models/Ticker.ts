import type { TickerData } from "@/lib/validations";
import { Schema, model } from "mongoose";

const TickerSchema = new Schema<TickerData>({
    base_unit: {
        type: Schema.Types.String,
        required: true,
    },
    quote_unit: {
        type: Schema.Types.String,
        required: true,
    },
    low: {
        type: Schema.Types.String,
        required: true,
    },
    high: {
        type: Schema.Types.String,
        required: true,
    },
    last: {
        type: Schema.Types.String,
        required: true,
    },
    type: {
        type: Schema.Types.String,
        required: true,
    },
    open: {
        type: Schema.Types.String,
        required: true,
    },
    volume: {
        type: Schema.Types.String,
        required: true,
    },
    sell: {
        type: Schema.Types.String,
        required: true,
    },
    buy: {
        type: Schema.Types.String,
        required: true,
    },
    at: {
        type: Schema.Types.Number,
        required: true,
    },
    name: {
        type: Schema.Types.String,
        required: true,
    },
});

export const Ticker = model<TickerData>("Ticker", TickerSchema);
