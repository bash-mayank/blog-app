import React, { useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; 
import { assets, blogCategories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked'

const AddBlog = () => {
  const { axios } = useAppContext();


  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);
  const [content, setContent] = useState(''); 

  const generateContent = async () => {
      if (!title)  return toast.error('please enter a title')
        try{
          setIsGenerating(true)
          const {data} = await axios.post('/api/blog/generate',{prompt : title})
          if(data.success){
            quillRef.current.root.innerHTML = parse(data.content)
            
          }else{
            toast.error(data.message)
          }
        }
        catch(error){
          toast.error(error.message)
        }
        finally{
          setIsGenerating(false)
        }
    };

  const onSubmitHandler = async (e) => {

    try {

      e.preventDefault();
      setIsLoading(true)

      const blog = {
      title,
      subTitle,
      description : quillRef.current.root.innerHTML,
      category,
      isPublished

    }

    const formData = new FormData();
    formData.append('blog', JSON.stringify(blog))
    formData.append('image', image)
    const {data} = await axios.post('/api/blog/add',formData)

    if(data.success){
      toast.success(data.message)
      setImage(null)
      setTitle('')
      setSubTitle('')
      quillRef.current.root.innerHTML = ''
      setCategory('Startup')
      setIsGenerating(false);
    }
    else{
      toast.error(data.message)
    }
    } catch (err) {
      toast.error(err.message)
    }
    finally{
      setIsLoading(false)
    }
  
  };

  

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your blog content here...',
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });

      quillRef.current.on('text-change', () => {
        setContent(editorRef.current.querySelector('.ql-editor').innerHTML);
      });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded">
        <p>Upload thumbnail</p>
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt="Thumbnail preview"
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        <p className="mt-4">Blog title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <p className="mt-4">Sub title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded"
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-4">Blog Description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div
            ref={editorRef}
            className="h-64 border border-gray-300 rounded bg-white"
          ></div>

          <button
            disabled={isGenerating}
            type="button"
            onClick={generateContent}
            className={`absolute bottom-1 right-2 ml-2 text-xs px-4 py-1.5 rounded 
                        ${isGenerating ? 'bg-gray-500 cursor-not-allowed' : 'bg-black/70 hover:underline cursor-pointer'} text-white`}
          >
            {isGenerating ? "Generating..." : "Generate with AI"}
          </button>
        </div>
        <p className='mt-4'>Blog category</p>
        <select onChange={e=> setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">select category</option>
          {blogCategories.map((item, index)=>{
            return <option key={index} value={item}>{item}</option>
          })}
        </select>
        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input onChange={e=> setIsPublished(e.target.checked)} className='scale-125 cursor-pointer' type="checkbox" checked = {isPublished} />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-6  px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLoading ? 'Adding.....' : 'Add Blog'}
        </button>
      </div>
    </form>
  );
};

export default AddBlog;
