import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

const Card = ({prop,deleteBtn}) => {
    // console.log(prop)
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const handleDelete = async() => {
        try {
            const res = await axios.delete(`http://localhost:3001/api/product/deleteProduct/${prop?._id}`)
            if(res.status === 200){
                alert('Product deleted successfully')
                window.location.reload()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const truncateName = (name) => {
        if (!name) return 'Shoes!'; 
        const words = name.split(' ');
        return words.length > 2 ? `${words.slice(0, 2).join(' ')}...` : name;
    }
    return (
        <div className="card hover:cursor-pointer card-compact bg-base-100 border w-44 shadow">
        <figure
            onClick={()=>navigate(`/product/${prop?._id}`)} 
            className='h-24 w-full flex justify-center items-center'
        >
            <img 
            className="max-h-full max-w-full object-contain"    
            src={prop?.image || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <p onClick={()=>navigate(`/product/${prop?._id}`)}  className="-mt-3 text-lg">{truncateName(prop?.name)||'Shoes!'}</p>
            <div className='flex justify-between items-center -mt-2'>
                <p className='font-bold'>₹ {prop?.price ? prop.price.toLocaleString('en-IN') : '₹599'}</p>

                {user?.role === 'manager' && user?.name === prop?.sellerName && deleteBtn &&
                <button onClick={handleDelete}>
                    <i className="fa-solid fa-trash"></i>
                </button>}
                
            </div>
        </div>
        </div>
    )
}

export default Card
