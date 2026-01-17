import axiosInstance from "./axiosInstance";
import type { Blog } from "../types/blog";

export const getAllBlogs = async (): Promise<Blog[]> => {
    const response = await axiosInstance.get("/blogs");
    return response.data;
}

export const getBlogById = async (id:number): Promise<Blog> => {
    const response = await axiosInstance.get(`/blogs/${id}`);
    return response.data;
}