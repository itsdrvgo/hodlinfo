import { z } from "zod";

export const tickerSchema = z.object({
    platform: z.string(),
    base_unit: z.string(),
    quote_unit: z.string(),
    low: z.string(),
    high: z.string(),
    last: z.string(),
    type: z.string(),
    open: z.string(),
    volume: z.string(),
    sell: z.string(),
    buy: z.string(),
    at: z.number(),
    name: z.string(),
});
const responseTickerSchema = tickerSchema.omit({ platform: true });

export const dynamicTickerSchema = z.record(responseTickerSchema);

export type TickerData = z.infer<typeof tickerSchema>;
export type DynamicTickerData = z.infer<typeof dynamicTickerSchema>;
