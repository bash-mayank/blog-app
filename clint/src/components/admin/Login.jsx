import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const {axios, setToken} = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async(e)=>{
     e.preventDefault()

    try{
      const { data } = await axios.post('/api/admin/login',{
        email,
        password
      })
      if(data.success){
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
      }
      else{
        toast.error(data.message)
      }
    }
    catch(err){
      toast.error(err.message)
    }
   
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6 w-full sm:max-w-md text-gray-600">
            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input onChange={(e)=>setEmail(e.target.value) } value={email}
                type="email" required placeholder="enter your email id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input onChange={(e)=>setPassword(e.target.value) } value={password}
                 type="password" required placeholder="enter password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"/>
            </div>
            <button className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all" type="submit">Login</button>
            <button
              type="button"
              onClick={() => {
                setEmail("admin@example.com");
                setPassword("admin123");
              }}
              className="w-full mb-3 mt-2 py-2 border border-primary text-primary rounded hover:bg-primary/10"
            >
              Use Demo Credentials
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
