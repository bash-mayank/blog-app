import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets'
import Blogtable from '../../components/admin/Blogtable'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListBlog = () => {
  const [blogs, setBlogs] = useState([])
  const {axios} = useAppContext()
  const fetchBlogs = async()=>{
    try {
      const {data} = await axios.get('api/admin/blogs')
      if(data.success){
        setBlogs(data.blogs)
      }
      else{
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }
  useEffect(()=>{
    fetchBlogs()
  },[])
  return (
    <div className='flex-1 pt-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1>All Blogs</h1>
      <div className="relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg mt-4">
      <table className="w-full text-sm text-gray-600">
        <thead className="text-xs text-gray-600 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-center font-semibold">#</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Blog Title</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold max-sm:hidden">Date</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold max-sm:hidden">Status</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Action</th>
            <th scope="col" className="px-4 py-3 text-left font-semibold">Delete</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index)=>{
            return <Blogtable key={blog._id} blog={blog} index={index+1} fetchBlogs={fetchBlogs}/>
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ListBlog
