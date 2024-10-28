import React, { useContext, useEffect, useState } from 'react'
import Avatar from './Avatar'
import CartIconSVG from './CartIconSVG'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import SearchBar from './SearchBar'
const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const {user} = useContext(AuthContext)
    useEffect(() =>{
        const getToken = localStorage.getItem('token')
        const getRole = localStorage.getItem('role')
        if( getRole === 'admin'){
            setIsAdminAuthenticated(true);
        }
        else{
            setIsAdminAuthenticated(false);
        }
        if(getToken ){
            setIsAuthenticated(true)
        }
        else{
            setIsAuthenticated(false)
        } 
    }, [])
    return (
        <div className='flex bg-white px-2 items-center justify-between h-12  border' >
            <div>
                {isAdminAuthenticated ? 
                    <Link to='/admin' className='link no-underline'>
                        <span className='font-bold text-gray-700 text-xl'>Zoom</span>
                        <span className='font-bold text-primaryRed text-xl'>cart</span>
                    </Link> 
                : 
                    <Link to='/' className='link no-underline'>
                        <span className='font-bold text-gray-700 text-xl'>Zoom</span>
                        <span className='font-bold text-primaryRed text-xl'>cart</span>
                    </Link>
                }
                
            </div>
            <div>
                {!isAdminAuthenticated && 
                <SearchBar/>  
                }
            </div>
            <div className='flex gap-3'>
                {!isAdminAuthenticated && 
                <button onClick={()=>navigate('/cart')} className='btn btn-sm bg-white hover:bg-gray-700 hover:text-white border-black text-black indicator relative'>
                <CartIconSVG />
                    Cart
                    <span className='badge badge-xs bg-red-200 border-red-200 py-2 indicator-item text-xs absolute top-1 right-0' >{user?.cart.length || '0'}</span>
                </button>}
                
                
                {isAuthenticated? 
                    <Avatar /> 
                    :
                    <button onClick={()=>navigate('/login')} className='btn btn-sm bg-primaryRed hover:bg-secondaryRed text-white'>Login</button> 
                }
                
            </div>
        </div>
    )
}

export default Navbar
