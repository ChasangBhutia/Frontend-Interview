import React from "react";
import { Youtube, Github, Linkedin, User } from 'lucide-react'

interface FooterProps {
    companyName?: string;
    links?: { icon: string; href: string }[];
}

const Footer: React.FC<FooterProps> = ({
    companyName = "MyBlog",
    links = [
        { icon: Github, href: "https://github.com/ChasangBhutia" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/chasang/" },
        { icon: User, href: "https://portfolio-chasang-tserinh-bhutias-projects.vercel.app/" },
        { icon: Youtube, href:"https://youtube.com/@chasang_47?si=ydSE8Fm5Zkc3kTll"}
    ],
}) => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-4 px-6 mt-auto flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-sm">
                &copy; {year} {companyName}. All rights reserved.
            </p>

            <div className="flex gap-4">
                {links.map((link, idx) => {
                    const ICON = link?.icon;
                    return(
                        <a
                            key={idx}
                            href={link.href}
                            className="hover:text-blue-500 transition-colors text-sm"
                        >
                            <ICON />
                        </a>
                )})}
            </div>
        </footer>
    );
};

export default Footer;
