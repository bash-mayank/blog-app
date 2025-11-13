import jwt from 'jsonwebtoken'
import Blog from '../models/blogModel.js'
import Comment from '../models/commentModel.js'

export const adminLogin = async(req, res)=>{

    try{
        const{email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign({email},process.env.S_KEY)
            return res.json({
                success: true,
                token
            })
        }
        return res.json({
            success: false,
            message: "invalid credentials"
        })

    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}
export const getAllBlogsAdmin = async(req, res)=>{

    try{
        const blogs = await Blog.find({}).sort({createdAt: -1})
        return res.json({
            success: true,
            blogs
        })

    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}
export const getAllComments = async(req, res)=>{

    try{
        const comments = await Comment.find({}).populate('blog').sort({createdAt: -1})
        return res.json({
            success: true,
            comments
        })

    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}
export const getDashboard = async(req, res)=>{

    try{
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5)
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished: false})

        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        }

        return res.json({
            success: true,
            dashboardData
        })

    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}
export const deleteComment = async(req, res)=>{

    try{
        
        const {id} = req.body
        await Comment.findByIdAndDelete(id)

        return res.json({
            success: true,
            message: "comment delete successfully"
        })

    }
    catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }
}
export const approveComment = async (req, res) => {
  try {
    const { id } = req.body

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $set: { isApproved: true } }, // actually update the field
      { new: true } // return updated doc
    )

    if (!updatedComment) {
      return res.json({
        success: false,
        message: "Comment not found"
      })
    }

    return res.json({
      success: true,
      message: "Comment approved successfully",
      comment: updatedComment
    })
  } catch (err) {
    return res.json({
      success: false,
      message: err.message
    })
  }
}
