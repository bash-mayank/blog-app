import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import Blog from '../Blog'
import Blogtable from '../../components/admin/Blogtable'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const DashBoard = () => {
  const {axios} = useAppContext()
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs:[]

  })
 
  const fetchDashboard = async ()=>{
    try {
      const {data} = await axios.get('/api/admin/dashboard')
      if(data.success){
        setDashboardData(data.dashboardData)
  
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchDashboard()
  },[])
  
  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Cards Row */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-[14.5rem] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="Blogs" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[14.5rem] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="Comments" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-[14.5rem] rounded shadow cursor-pointer hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="Drafts" />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs Header */}
      <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
        <img src={assets.dashboard_icon_4} alt="Latest Blogs" />
        <p>Latest Blogs</p>
      </div>

      {/* Table */}
      <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg">
        <table className="w-full text-sm text-gray-600">
          <thead className="text-xs text-gray-600 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-center font-semibold">#</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold">Blog Title</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold max-sm:hidden">Date</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold max-sm:hidden">Status</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold">Action</th>
            </tr>
        </thead>
          <tbody>
            {dashboardData.recentBlogs.map((blog, index)=>{
              return <Blogtable key={blog._id} blog={blog} index={index+1} fetchBlogs={fetchDashboard}  />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

}

export default DashBoard
