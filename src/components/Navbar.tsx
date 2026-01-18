import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { CreateBlogDialog } from "./CreateBlogDialog";

const THEME_KEY = "theme";

const Navbar = ({ title }: { title: string }) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
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
        <nav className="flex justify-between items-center bg-white h-10 p-1 rounded dark:bg-gray-900 sm:p-8">
            <h2 className="font-semibold text-xs ml-10 sm:text-lg sm:ml-0">{title}</h2>

            <div className="flex items-center sm:gap-1 md:gap-2">
                <Button onClick={()=>setOpenDialog(true)} className="h-6 w-15 text-[10px] sm:h-10 sm:w-25 sm:text-sm">Create Blog</Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-lg"
                    onClick={() => setDark((prev) => !prev)}
                >
                    {dark ? <Sun size={25} /> : <Moon size={25} />}
                </Button>
            </div>
            <CreateBlogDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
            />
        </nav>
    );
};

export default Navbar;
