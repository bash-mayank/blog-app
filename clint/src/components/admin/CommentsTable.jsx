import React from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const CommentsTable = ({ comment, fetchComments }) => {
  const {axios} = useAppContext()
  const { blog, createdAt, _id } = comment
  const BlogDate = new Date(createdAt)
  const approveComment = async ()=>{
    try {
      const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const deleteComment = async ()=>{
    const confirm = window.confirm('are you sure you want to delete this comment')
    if(!confirm) return
    try {
      const {data} = await axios.post('/api/admin/delete-comment', {id: _id})
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <tr className="order-y border-gray-300">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-600">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-600">Comment</b> : {comment.comment}
      </td>
      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {/* Approve button/icon if not approved */}
          {!comment.isApproved && (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              alt="Approve"
              className="w-5 cursor-pointer hover:scale-110 transition-all"
            />
          )}

          {/* Approved badge */}
          {comment.isApproved && (
            <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          {/* Delete button */}
          <button
            onClick={() => deleteComment()}
            className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition-all m-5"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default CommentsTable
