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
  } = useQuery({
    queryKey: ["blog-by-id", blogId],
    queryFn: () => getBlogById(blogId as number),
    enabled: !!blogId
  })

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col md:flex-row p-3 bg-gray-100 dark:bg-[#000000]">
      {/* Sidebar */}
      <div className="w-[25%] md:h-full h-auto border-r rounded">
        <Sidebar blogId={blogId} setBlogId={setBlogId} blogs={blogs || []} />
      </div>

      {/* Blog Details */}
      <div className="flex-1 w-[75%] flex flex-col gap-2 p-5 pb-0">
        <Navbar title={blog?.title ?? 'Blog Details'}/>
        
        {blog ? (
          <div className='overflow-y-auto'>
            <div className='my-3'>
              <h1 className='text-5xl mb-2'>
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
        )}
        <Footer />
      </div>
    </div>
  )
}

export default App
