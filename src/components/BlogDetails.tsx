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
            {/* <img src={blog?.coverImage} alt="cover image" className="h-[200px] w-[840px] object-cover rounded-md" />
            <h1>{blog?.title}</h1>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    {blog?.category.map((c:string)=><p>{c}</p>)}
                </div>
                <p>{formattedDate(blog?.date)}</p>
            </div>
            <p>{blog?.description}</p>
            <p>{blog?.content}</p> */}
            <Card className="p-2 py-6 rounded gap-1 h-ful dark:bg-gray-900">
                <div className="px-6">
                    <img src={blog?.coverImage} alt="cover image" className="h-[250px] w-full object-cover" />
                </div>
                <CardHeader className="mt-5">
                    <div className='flex items-center justify-between'>
                        <CardTitle className="text-3xl">{blog?.title}</CardTitle>
                        <p>{formattedDate(blog?.date)}</p>
                    </div>
                </CardHeader>
                <div className="flex gap-2 px-6 mb-5">
                    {blog?.category.map(c => 
                        <Badge variant="default" className="rounded h-7 text-sm dark:bg-blue-500 dark:text-gray-100">{c}</Badge>
                    )}
                </div>
                <CardContent>
                    <p className="font-body">{blog?.description}</p>
                    <p>{blog?.content}</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </section>
    )
}

export default BlogDetails