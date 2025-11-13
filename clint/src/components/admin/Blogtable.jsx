import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Blogtable = ({ blog, index , fetchBlogs}) => {
  const { title, createdAt, isPublished } = blog
  const BlogDate = new Date(createdAt)
  const {axios} = useAppContext()
  const deleteBlog = async ()=>{
    const confirm = window.confirm("are you sure you wnat to delete this blog?")
    if(!confirm) return;
    try {
          const { data } = await axios.post('/api/blog/delete', { blogId: blog._id }) 
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      }
      else{
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }
  const toggelPublish = async ()=>{
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { blogId: blog._id })
      if(data.success){
        toast.success(data.message)
        await fetchBlogs()
      }
      else{
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }

  }

  

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* Index */}
      <th className="px-4 py-3 font-medium text-gray-700 text-center">
        {index}
      </th>

      {/* Title */}
      <td className="px-4 py-3">{title}</td>

      {/* Date */}
      <td className="px-4 py-3 max-sm:hidden whitespace-nowrap text-gray-500">
        {BlogDate.toLocaleString()}
      </td>

      {/* Status */}
      <td className="px-4 py-3 max-sm:hidden">
        <span
          className={`font-medium ${
            isPublished ? 'text-green-600' : 'text-orange-600'
          }`}
        >
          {isPublished ? 'Published' : 'Unpublished'}
        </span>
      </td>

      {/* Action Button */}
      <td className="px-4 py-3">
        <button
          onClick={toggelPublish}
          className={`px-3 py-1 rounded border text-xs font-medium transition-colors cursor-pointer ${
            isPublished
              ? 'border-green-500 text-green-600 hover:bg-green-50'
              : 'border-orange-500 text-orange-600 hover:bg-orange-50'
          }`}
        >
          {isPublished ? 'Unpublish' : 'Publish'}
        </button>
      </td>
      <td className="px-4 py-3">
        <button 
          onClick={deleteBlog}
          className="px-3 py-1 rounded border border-red-500 text-red-600 text-xs font-medium transition-colors hover:bg-red-50 cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default Blogtable
