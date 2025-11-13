
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL

const AppContext = createContext()

export function AppProvider({children}){

    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState('')

    const fetchBlogs = async()=>{
      try{
        const { data } = await axios.get('/api/blog/all');
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          toast.error(data.message || 'Something went wrong!');
        }
      }
      catch(err){
        const errorMessage = err?.response?.data?.message || 'An unexpected error occurred';
        if (!toast.isActive(errorMessage)) {
          toast.error(errorMessage);
        }
      }
    }

    useEffect(()=>{
      fetchBlogs();
      const token = localStorage.getItem('token')
      if(token){
        setToken(token)
        axios.defaults.headers.common['Authorization'] = `${token}`
      }
      else{

      }
    },[])

    const value ={
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }
  return(
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
  )
}

export function useAppContext(){
  return useContext(AppContext)
}