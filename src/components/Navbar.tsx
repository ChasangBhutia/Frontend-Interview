import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "theme";

const Navbar = ({ title }: { title: string }) => {
    const [dark, setDark] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return localStorage.getItem(THEME_KEY) === "dark";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add("dark");
            localStorage.setItem(THEME_KEY, "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem(THEME_KEY, "light");
        }
    }, [dark]);

    return (
        <nav className="flex justify-between items-center bg-white h-10 p-6 rounded dark:bg-gray-900">
            <h2 className="font-semibold">{title}</h2>

            <div className="flex items-center gap-2">
                <Button>Create Blog</Button>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDark((prev) => !prev)}
                >
                    {dark ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
