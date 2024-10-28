import React, { useState } from 'react'
import LoginSVG from '../Assets/Svg/Login.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleLogin=async()=>{
        try {
            const response = await axios.post("http://localhost:3001/api/auth/login",{email: email,password: password})
            if(response.status === 200) {
                console.log(response.data)
                localStorage.setItem('token',response.data.token)
                localStorage.setItem('role',response.data.role)
                alert('Login Successful')
                navigate('/')
                window.location.reload()
            }
        } catch (error) {
            console.log(error.message)
            if(error.response.status === 400) {
                alert('Invalid email or password')
            } 
        }
    }
    return (
        <div className='h-screen flex'>
            <div className='LEFT w-1/2 pt-28'>
                <img className='w-5/6 h-auto ml-10' src={LoginSVG} alt='loginSVG'/>
            </div>
            <div className='RIGHT w-1/2 mt-28 pl-20'>
                <h1 className='text-5xl font-semibold mb-10'
                    style={{fontFamily:'Playwrite CU'}}
                >Login</h1>
                <p className='text-lg mb-1'>Email</p>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className='bg-transparent input-bordered text-xl px-1 py-1 w-3/6 border rounded-sm mb-3' type="text" />
                <p className='text-lg mb-1'>Password</p>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} className='bg-transparent input-bordered text-xl px-1 py-1 w-3/6 border rounded-sm mb-6' type="text" /><br/>
                <div className='flex gap-4 items-center'>
                    <button onClick={handleLogin} className='btn bg-[#E8505B] text-white hover:bg-[#cf474e] hover:shadow-lg'>Login</button>
                    <Link to='/adminLogin'  className='btn border' >Admin</Link>
                </div>
                <p className='mt-5 text-xl'>Don't have an account? <Link to='/register' className='link' >Register here</Link> </p>
            </div>
        </div>
    )
}

export default Login

