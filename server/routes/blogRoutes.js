import express from "express";
import { addBlog, addComment, deleteBlog, generateContent, getAllBlogs, getBlog, getBlogComment, togglePublish } from "../controllers/blogController.js";
import upload from "../middleware/multerMiddleware.js";
import auth from "../middleware/authMiddleware.js";

const blogRouter = express.Router()

blogRouter.post("/add",upload.single('image'),auth, addBlog)
blogRouter.get("/all", getAllBlogs)
blogRouter.post("/delete",auth, deleteBlog)
blogRouter.post("/toggle-publish",auth, togglePublish)
blogRouter.post('/add-comment',addComment)
blogRouter.get('/comments',getBlogComment)
blogRouter.post('/generate',auth, generateContent)
blogRouter.post("/:blogId", getBlog)
export default blogRouter
