import React from "react";
import { type Blog as BlogCardProps} from "../types/blog";
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

interface BlogCardComponentProps extends BlogCardProps {
    setBlogId: (id: number | null) => void;
    blogId: number | null;
}

const BlogCard: React.FC<BlogCardComponentProps> = ({
    id,
    title,
    category,
    description,
    date,
    setBlogId,
    blogId
}: BlogCardComponentProps) => {

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return(
        <Card 
            onClick={()=>setBlogId(id)}
            className={`border h-[150px] w-[300px] p-4 gap-0 ${(id === blogId) && 'border-l-6 border-l-blue-500'} hover:bg-gray-100 cursor-pointer dark:bg-gray-900`}>
            <CardHeader className='p-0'>
              <div className="w-full flex justify-between">
                    <div className="flex gap-1">
                        {category.map(c => (
                            <Badge key={c} variant="default" className="rounded px-1 text-xs dark:bg-blue-500 dark:text-gray-100">{c}</Badge>
                        ))}
                    </div>
                    <span className="text-sm text-gray-400 ">{formattedDate}</span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
                <CardTitle className="text-md line-clamp-2 mb-2 pb-1 border-b">{title}</CardTitle>
                <CardDescription className="text-sm line-clamp-4">{description}</CardDescription>
            </CardContent>
        </Card>
    )
}

export default BlogCard