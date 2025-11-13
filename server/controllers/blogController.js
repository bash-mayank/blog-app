import fs from 'fs'
import imagekit from '../configs/imageKit.js'
import Blog from '../models/blogModel.js'
import { create } from 'domain'
import Comment from '../models/commentModel.js'
import main from '../configs/googleApi.js'

export const addBlog = async (req,res)=>{
    try{
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        if(!title || !subTitle || !description || !category || !imageFile){
            return res.json({success: false, message:"Missing required field"});
        }

        // Read file
        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Optimize URL
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'},
                {format: 'webp'},
                {quality: '1280'}
            ]
        });

        await Blog.create({title, subTitle, description, category, image: optimizedImageUrl, isPublished});

        res.json({
            success: true,
            message: "Blog added successfully"
        });
    }
    catch(err){
        res.json({
            success: false,
            message: err.message
        });
    }
}

export const getAllBlogs = async (req, res)=>{

    try{
        const blogs = await Blog.find({isPublished: true})
        res.json({
            success : true,
            blogs
        })
    } catch(err){
        res.json({
            success : false,
            message : err.message
        })
    }

}

export const getBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found"
      });
    }

    res.json({
      success: true,
      blog
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};
export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.body;
    await Blog.findByIdAndDelete(blogId);
    await Comment.deleteMany({ blog: blogId });

    res.json({
      success: true, // ✅ fixed
      message: "Blog deleted successfully"
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.json({
        success: false,
        message: "Blog not found"
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res.json({
      success: true,
      message: blog.isPublished 
        ? "Blog is published successfully" 
        : "Blog is unpublished successfully"
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    if (!blog || !name || !content) {
      return res.json({ success: false, message: "All fields are required" });
    }

    await Comment.create({ blog, name, content, isApproved: false }); // default false for moderation

    res.json({
      success: true,
      message: "Comment added successfully and awaiting approval"
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message
    });
  }
}
export const getBlogComment = async (req, res)=>{
    try{

        const { blogId } = req.query;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({createdAt: -1})
        res.json({success: true, comments})
        
    }
    catch(err){

        res.json({
            success : false,
            message : err.message
        })
    }
}

export const generateContent = async (req, res)=>{
  try {
    const{prompt} = req.body
    const content = await main(prompt + ' Genrate a blog content for this topic in simple text formt')
    res.json({
      success: true,
      content
    })
  } catch (error) {
    res.json({
      success: false,
      message : error.message
    })
    
  }
}