import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, type BlogFormValues } from "./blog.schema";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog, type CreateBlogPayload } from "../api/blogApi";

import { toast } from "sonner";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function CreateBlogDialog({ open, onClose }: Props) {
    const [categoryInput, setCategoryInput] = useState("");
    const queryClient = useQueryClient();

    const createBlogMutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog created successfully");
            onClose();
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to create blog. Please try again.");
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            category: [],
        },
    });

    const categories = watch("category");

    const addCategory = () => {
        if (!categoryInput.trim()) return;

        setValue("category", [...categories, categoryInput.toUpperCase()], {
            shouldValidate: true,
        });

        setCategoryInput("");
    };

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const firstErrorKey = errorKeys[0] as keyof typeof errors;
            const message = errors[firstErrorKey]?.message as string;
            if (message) toast.error(message);
        }
    }, [errors]);

    const onSubmit = (data: BlogFormValues) => {
        const payload: CreateBlogPayload = {
            ...data,
            date: new Date().toISOString(),
        };
        createBlogMutation.mutate(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-2xl p-4 sm:p-6 dark:bg-gray-900 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-2xl sm:text-3xl font-semibold">
                        Create Your Blog
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base text-gray-500 dark:text-gray-300">
                        Fill in the details below to publish a new blog post.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 sm:gap-6 mt-2"
                >
                    <div className="w-full">
                        <Input
                            placeholder="Blog Title"
                            {...register("title")}
                            className="w-full sm:text-base"
                        />
                        {errors.title && (
                            <p className="text-xs sm:text-sm text-red-500 mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <Input
                            placeholder="Cover Image URL"
                            {...register("coverImage")}
                            className="w-full sm:text-base"
                        />
                        {errors.coverImage && (
                            <p className="text-xs sm:text-sm text-red-500 mt-1">
                                {errors.coverImage.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <Textarea
                            placeholder="Short Description"
                            {...register("description")}
                            className="w-full min-h-[80px] max-h-[150px] resize-none overflow-y-auto sm:min-h-[100px] sm:max-h-[180px]"
                        />
                        {errors.description && (
                            <p className="text-xs sm:text-sm text-red-500 mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <Textarea
                            placeholder="Full Blog Content"
                            {...register("content")}
                            className="w-full min-h-[120px] max-h-[250px] resize-none overflow-y-auto sm:min-h-[150px] sm:max-h-[300px]"
                        />
                        {errors.content && (
                            <p className="text-xs sm:text-sm text-red-500 mt-1">
                                {errors.content.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                                placeholder="Add category (TECH)"
                                value={categoryInput}
                                onChange={(e) => setCategoryInput(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && (e.preventDefault(), addCategory())
                                }
                                className="flex-1"
                            />
                            <Button type="button" onClick={addCategory} className="sm:w-auto">
                                Add
                            </Button>
                        </div>

                        {errors.category && (
                            <p className="text-xs sm:text-sm text-red-500 mt-1">
                                {errors.category.message}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2">
                            {categories.map((cat, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs sm:text-sm">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={createBlogMutation.isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={createBlogMutation.isPending}>
                            {createBlogMutation.isPending ? "Creating..." : "Create Blog"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
