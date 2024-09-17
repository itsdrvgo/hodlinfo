"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Send } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(theme === "dark");
    }, [theme]);

    return (
        <header className="flex items-center justify-between border-b p-4">
            <h1 className="text-3xl font-bold text-teal-600">HODLINFO</h1>
            <div className="hidden items-center space-x-4 md:flex">
                <Select defaultValue="INR">
                    <SelectTrigger className="w-[80px]">
                        <SelectValue placeholder="INR" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                </Select>
                <Select defaultValue="BTC">
                    <SelectTrigger className="w-[80px]">
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
                <div className="hidden size-10 items-center justify-center rounded-full border border-foreground md:flex">
                    57
                </div>
                <Button className="bg-teal-600 hover:bg-teal-600/90 dark:hover:bg-teal-600/90">
                    <Send className="mr-2 size-4" /> Connect Telegram
                </Button>

                <Switch
                    checked={checked}
                    onCheckedChange={(checked) => {
                        setChecked(checked);
                        setTheme(checked ? "dark" : "light");
                    }}
                />
            </div>
        </header>
    );
}
