import React, { useState, type ChangeEvent } from "react";
import BlogCard from "./BlogCard";
import { type Blog } from "../types/blog";
import { GraduationCap, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface SideBarProps {
    blogs: Blog[];
    blogId: number | null;
    setBlogId: (id: number | null) => void;
    isLoading: boolean | false;
}

const Sidebar: React.FC<SideBarProps> = ({ blogs, blogId, setBlogId, isLoading }) => {
    const [openSearch, setOpenSearch] = useState(false);
    const [query, setQuery] = useState("");
    const [collapsed, setCollapsed] = useState(false);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.category.some((cat) => cat.toLowerCase().includes(query.toLowerCase())) ||
            blog.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <div className="md:hidden fixed top-2 left-2 z-50">
                <Button
                    size="icon"
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="bg-blue-700 text-white p-2"
                >
                    <Menu size={20} />
                </Button>
            </div>

            <aside
                className={`md:rounded-md
          fixed md:relative top-0 left-0 z-40 h-full w-80 md:w-full
          bg-white dark:bg-gray-900 p-2 md:p-2 pt-0 md:pt-0 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${collapsed ? "translate-x-0" : "-translate-x-90"} md:translate-x-0
        `}
            >
                <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 pb-3 md:pt-5">
                    <header className="pt-17 md:pt-0 flex gap-2 items-center mb-3">
                        <div className="bg-blue-900 p-2 rounded-xl text-white">
                            <GraduationCap />
                        </div>
                        <h3 className="text-xl font-semibold">Blogging</h3>
                    </header>

                    <div className="flex justify-between items-center bg-blue-800 p-2 rounded text-white mb-3">
                        <p >Blogs</p>
                        <div className="flex items-center relative">
                            <Input
                                type="text"
                                placeholder="Search..."
                                className={`h-8 transition-all duration-300 ${openSearch ? "w-40 md:w-48 pr-10" : "w-0 p-0 opacity-0"
                                    }`}
                                value={query}
                                onChange={handleSearchChange}
                            />
                            <button
                                onClick={() => setOpenSearch((prev) => !prev)}
                                className="absolute right-1"
                            >
                                <Search />
                            </button>
                        </div>
                    </div>
                </div>

                {
                    isLoading ? 
                    <div className="flex justify-center w-full mt-5">
                            <AiOutlineLoading3Quarters className="animate-spin" size={50}/>
                        </div> : <div className="flex flex-col items-center gap-2">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog) => (
                                    <BlogCard
                                        key={blog.id}
                                        {...blog}
                                        blogId={blogId}
                                        setBlogId={setBlogId}
                                        setCollapsed={setCollapsed}
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center mt-4">
                                    No blogs found
                                </p>
                            )}
                        </div>
                }
            </aside>

            {collapsed && (
                <div
                    onClick={() => setCollapsed(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                />
            )}
        </>
    );
};

export default Sidebar;
