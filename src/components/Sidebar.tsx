import React, { useState, type ChangeEvent } from "react";
import BlogCard from "./BlogCard";
import { type Blog } from "../types/blog";
import { GraduationCap, Search } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";

interface SideBarProps {
    blogs: Blog[],
    blogId: number | null,
    setBlogId: (id: number | null) => void;
}

const Sidebar : React.FC<SideBarProps> = ({blogs, blogId, setBlogId}: SideBarProps)=>{

    const [operSearch, setOpenSearch] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.category.some(cat => cat.toLowerCase().includes(query.toLowerCase())) ||
            blog.description.toLowerCase().includes(query.toLowerCase())
    )

    return(
        <aside className="w-full h-full flex flex-col items-center p-5 pt-0 overflow-y-auto bg-white rounded-xl dark:bg-[#000000]">
            <div className="w-full sticky top-0 bg-white pt-3 dark:bg-[#000000]">
                <header className="flex gap-2 w-full py-3 bg-white items-center dark:bg-[#000000]">
                    <div className="bg-blue-900 p-2 rounded-xl text-white">
                        <GraduationCap  />
                    </div>
                    <h3 className="text-xl">Blogging</h3>
                </header>
                <div className="flex justify-between items-center w-full bg-blue-800 p-3 rounded mb-2 text-white">
                    <p>Blogs</p>
                    <div className="flex items-center relative">
                        <Input 
                            type="text" 
                            placeholder="Search.." 
                            className={` h-8 transition-all duration-300 ${operSearch ? 'w-50 pr-10' : 'w-0 p-0'}`} 
                            value={query}
                            onChange={handleSearchChange}
                        />
                        <button
                            onClick={() => setOpenSearch(!operSearch)}
                            className="absolute right-2">
                            <Search />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                { filteredBlogs.length > 0 ? (
                        filteredBlogs?.map(blog => (
                            <BlogCard
                                key={blog?.id}
                                id={blog?.id}
                                title={blog?.title}
                                description={blog?.description}
                                date={blog?.date}
                                coverImage={blog?.coverImage}
                                content={blog?.content}
                                category={blog?.category}
                                setBlogId={setBlogId}
                                blogId={blogId}
                            />
                        )   
                    )) : 
                    <p className="text-gray-500 dark:text-gray-400 text-center mt-4">
                        No blogs found
                    </p>
                }
            </div>
        </aside>
       
    )
}

export default Sidebar