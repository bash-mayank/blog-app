import React, { useEffect, useState } from 'react'
import { assets, comments_data } from '../../assets/assets.js'
import CommentsTable from '../../components/admin/CommentsTable.jsx'
import { useAppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Comments = () => {
  const { axios } = useAppContext();
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const fetchComments = async () => {
   try {
      const {data} = await axios.get('api/admin/comments')
      if(data.success){
        setComments(data.comments)
      }
      else{
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      {/* Header row */}
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-sm cursor-pointer text-xs border rounded-full px-4 py-1 transition-colors
              ${
                filter === 'Approved'
                  ? 'text-primary border-primary bg-primary/10'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
          >
            Approved
          </button>

          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-sm cursor-pointer text-xs border rounded-full px-4 py-1 transition-colors
              ${
                filter === 'Not Approved'
                  ? 'text-primary border-primary bg-primary/10'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table wrapper */}
      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Blog Title & Comment
              </th>
              <th scope="col" className="px-6 py-3 text-left max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment)=>{
              if(filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false
            }).map((comment, index)=> <CommentsTable
              key={comment._id} comment={comment} fetchComments={fetchComments}
            />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Comments
