"use client";

import { env } from "@/../env.mjs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ResponseData } from "@/lib/validation/response";
import { TickerData } from "@/lib/validation/ticker";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTheme } from "next-themes";

export function HodlInfo() {
    const { theme } = useTheme();

    const { data } = useQuery({
        queryKey: ["hodlInfo"],
        queryFn: async () => {
            const x = await axios.get<ResponseData<TickerData[]>>(
                env.NEXT_PUBLIC_BACKEND_URL + "/tickers"
            );

            return x.data.data;
        },
    });

    return (
        <div className="grow p-12">
            <h2 className="mb-4 text-center text-xl">Best Price to Trade</h2>

            <div className="mb-8 flex items-center justify-around gap-10">
                {[
                    { label: "5 Mins", value: "0.1%" },
                    { label: "1 Hour", value: "0.96%" },
                ].map((item, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl font-bold">{item.value}</div>
                        <div>{item.label}</div>
                    </div>
                ))}

                <div className="text-7xl font-bold">₹ 26,56,110</div>

                {[
                    { label: "1 Day", value: "2.73%" },
                    { label: "7 Days", value: "7.51%" },
                ].map((item, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl font-bold">{item.value}</div>
                        <div>{item.label}</div>
                    </div>
                ))}
            </div>

            <p className="mb-12 text-center text-muted-foreground">
                Average BTC/INR net price including commission
            </p>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className={
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }
                        >
                            #
                        </TableHead>
                        <TableHead
                            className={
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }
                        >
                            Platform
                        </TableHead>
                        <TableHead
                            className={
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }
                        >
                            Last Traded Price
                        </TableHead>
                        <TableHead
                            className={
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }
                        >
                            Buy / Sell Price
                        </TableHead>
                        <TableHead
                            className={
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }
                        >
                            Difference
                        </TableHead>
                        <TableHead
                            className={
                                theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-600"
                            }
                        >
                            Savings
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell className="uppercase">
                                {row.platform}
                            </TableCell>
                            <TableCell>
                                ₹{" "}
                                {Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                })
                                    .format(+row.last)
                                    .slice(1)}
                            </TableCell>
                            <TableCell>
                                ₹{" "}
                                {Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                })
                                    .format(+row.buy)
                                    .slice(1)}{" "}
                                / ₹{" "}
                                {Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                })
                                    .format(+row.sell)
                                    .slice(1)}
                            </TableCell>
                            <TableCell
                                className={
                                    +row.low < +row.last
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            >
                                {Intl.NumberFormat("en-IN", {
                                    style: "percent",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format((+row.last - +row.low) / +row.low)}
                            </TableCell>
                            <TableCell
                                className={
                                    +row.low < +row.last
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            >
                                ₹{" "}
                                {Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                })
                                    .format(+row.low - +row.last)
                                    .slice(1)}
                                {+row.low < +row.last ? (
                                    <ArrowUp className="inline size-4" />
                                ) : (
                                    <ArrowDown className="inline size-4" />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
