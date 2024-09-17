"use client";

import { env } from "@/../env.mjs";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
import { ArrowDown, ArrowUp, Send } from "lucide-react";
import { useEffect, useState } from "react";

export function HodlInfo() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        document.body.classList.toggle("dark", isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const { data, isPending } = useQuery({
        queryKey: ["hodlInfo"],
        queryFn: async () => {
            const x = await axios.get<ResponseData<TickerData[]>>(
                env.NEXT_PUBLIC_BACKEND_URL + "/tickers"
            );

            return x.data.data;
        },
    });

    return (
        <div
            className={`flex min-h-screen flex-col ${isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}
        >
            <header
                className={`flex items-center justify-between border-b p-4 ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}
            >
                <h1
                    className={`text-3xl font-bold ${isDarkMode ? "text-teal-400" : "text-teal-600"}`}
                >
                    HODLINFO
                </h1>
                <div className="flex items-center space-x-4">
                    <Select defaultValue="INR">
                        <SelectTrigger
                            className={`w-[80px] ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}
                        >
                            <SelectValue placeholder="INR" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="INR">INR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="BTC">
                        <SelectTrigger
                            className={`w-[80px] ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}
                        >
                            <SelectValue placeholder="BTC" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="BTC">BTC</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="secondary">BUY BTC</Button>
                </div>
                <div className="flex items-center space-x-4">
                    <div
                        className={`${isDarkMode ? "bg-teal-400 text-gray-900" : "bg-teal-600 text-white"} flex size-10 items-center justify-center rounded-full`}
                    >
                        57
                    </div>
                    <Button
                        variant="outline"
                        className={`${isDarkMode ? "bg-teal-400 text-gray-900" : "bg-teal-600 text-white"}`}
                    >
                        <Send className="mr-2 size-4" /> Connect Telegram
                    </Button>
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input
                            type="checkbox"
                            value=""
                            className="peer sr-only"
                            checked={isDarkMode}
                            onChange={toggleTheme}
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-teal-800"></div>
                    </label>
                </div>
            </header>
            <main className="grow p-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-2 text-xl">Best Price to Trade</h2>
                    <div
                        className={`mb-4 text-7xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                        ₹ 26,56,110
                    </div>
                    <p
                        className={
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }
                    >
                        Average BTC/INR net price including commission
                    </p>
                </div>
                <div className="mb-12 flex justify-between">
                    {[
                        { label: "5 Mins", value: "0.1%" },
                        { label: "1 Hour", value: "0.96%" },
                        { label: "1 Day", value: "2.73%" },
                        { label: "7 Days", value: "7.51%" },
                    ].map((item, index) => (
                        <div key={index} className="text-center">
                            <div
                                className={`text-4xl font-bold ${isDarkMode ? "text-teal-400" : "text-teal-600"}`}
                            >
                                {item.value}
                            </div>
                            <div
                                className={
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }
                            >
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                className={
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }
                            >
                                #
                            </TableHead>
                            <TableHead
                                className={
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }
                            >
                                Platform
                            </TableHead>
                            <TableHead
                                className={
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }
                            >
                                Last Traded Price
                            </TableHead>
                            <TableHead
                                className={
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }
                            >
                                Buy / Sell Price
                            </TableHead>
                            <TableHead
                                className={
                                    isDarkMode
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }
                            >
                                Difference
                            </TableHead>
                            <TableHead
                                className={
                                    isDarkMode
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
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.last}</TableCell>
                                <TableCell>{row.buy}</TableCell>
                                <TableCell
                                    className={
                                        +row.buy - +row.sell > 0
                                            ? isDarkMode
                                                ? "text-teal-400"
                                                : "text-teal-600"
                                            : "text-red-400"
                                    }
                                >
                                    {+row.buy - +row.sell}%
                                </TableCell>
                                <TableCell
                                    className={
                                        +row.buy - +row.sell > 0
                                            ? isDarkMode
                                                ? "text-teal-400"
                                                : "text-teal-600"
                                            : "text-red-400"
                                    }
                                >
                                    {+row.buy - +row.sell > 0 ? (
                                        <ArrowUp className="mr-1 inline" />
                                    ) : (
                                        <ArrowDown className="mr-1 inline" />
                                    )}
                                    {+row.buy - +row.sell}%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </main>
            <footer className="p-4 text-center">
                <Button
                    variant="outline"
                    className={
                        isDarkMode
                            ? "border-teal-400 text-teal-400"
                            : "border-teal-600 text-teal-600"
                    }
                >
                    Add hodlinfo to home screen
                </Button>
            </footer>
        </div>
    );
}
