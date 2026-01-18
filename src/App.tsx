import { useEffect, useState } from 'react'
import {
  useQuery,
} from '@tanstack/react-query'
import './App.css'
import { getAllBlogs, getBlogById } from './api/blogApi'
import Sidebar from './components/Sidebar'
import BlogDetails from './components/BlogDetails'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function App() {
  const [blogId, setBlogId] = useState<number | null>(null);

  const {
    data : blogs,
    isLoading,
    error
  } = useQuery({
    queryKey:["blogs"],
    queryFn:getAllBlogs
  })

  const {
    data: blog,
    isLoading: detailLoading,
  } = useQuery({
    queryKey: ["blog-by-id", blogId],
    queryFn: () => getBlogById(blogId as number),
    enabled: !!blogId
  })

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col md:flex-row p-3 bg-gray-100 dark:bg-[#000000]">
      <div className="w-[300px] md:h-full xl:w-2/6 h-auto rounded py-2">
        <Sidebar isLoading={isLoading} blogId={blogId} setBlogId={setBlogId} blogs={blogs || []} />
      </div>

      <div className="w-full flex flex-col gap-2 p-1 pb-0 sm:p-3 md:p-6 overflow-y-auto md:overflow-y-hidden">
        <Navbar title={blog?.title ?? 'Blog Details'}/>
        
        {
          detailLoading ? 
          <div className='w-full h-full flex justify-center items-center'>
            <AiOutlineLoading3Quarters className='animate-spin' size={70}/>
          </div>
          : blog ? (
              <div className='overflow-y-auto'>
                <div className='my-3'>
                  <h1 className='text-3xl mb-2'>
                    Discover Insights & Stories
                  </h1>
                  <h1 className='text-xl'>
                    Practical tutorials, tech insights, and ideas worth sharing.
                  </h1>
                </div>
                <div className='flex flex-col gap-2'>
                  <BlogDetails {...blog} />
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a blog to view details
              </div>
            )
        }
        <Footer />
      </div>
    </div>
  )
}

export default App
