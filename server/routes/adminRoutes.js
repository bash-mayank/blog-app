import express from 'express'
import { adminLogin, approveComment, deleteComment, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js';
import auth from "../middleware/authMiddleware.js";

const adminRouter = express.Router()

adminRouter.post('/login',adminLogin)
adminRouter.get('/comments',auth, getAllComments)
adminRouter.get('/blogs',auth, getAllBlogsAdmin)
adminRouter.post('/delete-comment',auth, deleteComment)
adminRouter.post('/approve-comment',auth, approveComment)
adminRouter.get('/dashboard',auth, getDashboard)




export default adminRouter;