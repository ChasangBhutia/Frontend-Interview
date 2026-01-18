import { z } from "zod"

export const blogSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(8, "Description must be at least 8 characters"),
    content: z.string().min(20, "Content must be at least 20 characters"),
    coverImage: z.string().url("Must be a valid image URL"),
    category: z
        .array(z.string())
        .min(1, "At least one category is required"),
})

export type BlogFormValues = z.infer<typeof blogSchema>
