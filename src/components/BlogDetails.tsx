import React from "react";
import {type Blog as BlogProps} from "../types/blog";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const BlogDetails: React.FC<BlogProps> = (blog) =>{

    const formattedDate =(date:string)=>{
       return(
        new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    )};

    return(
        <section>
            <Card className="p-2 sm:py-6 rounded gap-1 h-ful dark:bg-gray-900">
                <div className="sm:px-6">
                    <img src={blog?.coverImage} alt="cover image" className="h-[250px] w-full object-cover" />
                </div>
                <CardHeader className="mt-2 sm:mt-5 px-0 sm:px-6">
                    <div className='flex items-center justify-between'>
                        <CardTitle className="text-xl sm:text-3xl">{blog?.title}</CardTitle>
                        <p className="text-sm sm:text-md text-gray-500 lg:text-lg">{formattedDate(blog?.date)}</p>
                    </div>
                </CardHeader>
                <div className="flex gap-2 sm:px-6 mb-5">
                    {blog?.category.map(c => 
                        <Badge key={c} variant="default" className="rounded h-5 sm:h-7 text-xs sm:text-sm dark:bg-blue-500 dark:text-gray-100">{c}</Badge>
                    )}
                </div>
                <CardContent className="px-0 sm:px-6">
                    <p className="mb-2 text-sm sm:text-[16px] lg:text-lg"><span className="font-bold text-md sm:text-lg lg:text-xl">Description: </span> {blog?.description}</p>
                    <p className="mb-2 text-sm sm:text-[16px] lg:text-lg">{blog?.content}</p>
                </CardContent>
            </Card>
        </section>
    )
}

export default BlogDetails