import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import Category from '../Components/Category'
import CartIconSVG from '../Components/CartIconSVG'
import BuyIconSVG from '../Components/BuyIconSVG'
import TickIconSVG from '../Components/TickIconSVG'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext'
const Product = () => {
    const {id} = useParams()
    const [product,setProduct]=useState(null);
    // console.log(product)
    const {user} = useContext(AuthContext)
    // console.log(user)
    useEffect(() =>{
        const getSpecificProduct = async()=>{
            try {
                const res = await axios.get(`http://localhost:3001/api/product/getProductById/${id}`)
                if(res.status === 200){
                    // console.log(res.data)
                    setProduct(res.data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getSpecificProduct()
    }, [id])
    const handleAddToCart = async() => {
        try {
            const res = await axios.post(`http://localhost:3001/api/cart/addToCart/${user?._id}`,{productId:product._id})
            if(res.status === 200){
                alert('Product added to cart')
                window.location.reload()
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleRemoveFromCart = async () => {
        try {
            const res = await axios.delete(`http://localhost:3001/api/cart/removeFromCart/${user?._id}/${product._id}`);
            if (res.status === 200) {
                alert('Product removed from cart');
                window.location.reload()
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const isProductInCart = user?.cart?.includes(product?._id);

    const renderDescription = () => {
        if (!product?.description) return null;
        const lines = product?.description.split(/\r?\n/); // split by new lines
        return (
            <ul className='list-disc pl-5'>
                {lines.map((line, index) => (
                    line.trim() ? <li className='mb-3' key={index}>{line.trim()}</li> : null
                ))}
            </ul>
        );
    };
    return (
        <Layout>
            <Category/>
            <div className='flex gap-4 px-4'>
                <div className='w-2/4 bg-red-30 h-[89vh] flex'>
                    {/* <div className='w-1/6 h-96 bg-blue-200'></div> */}
                    <div className='w-full h-96 bg-yellow'
                        style={{
                            backgroundImage: `url(${product?.image || 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    ></div>
                </div>
                <div className='w-2/3 bg-green-30 h-fit py-4'>
                    <p className='text-2xl mb-2 font-semibold w-full'>{product?.name ||'Ant Esports MK1001 One Handed Gaming Keyboard RGB Backlit 35 Keys Portable Mini Gaming Keypad Ergonomic Game Controller for PC Gamer'}</p>
                    <div className='flex gap-3 items-center mb-5'>
                        <p className='bg-gray-600 text-white h-fit py-0 px-3 rounded-full'>{product?.category || 'Category'}</p>
                        <p className='text-md hover:underline hover:cursor-pointer'>{product?.sellerName || 'Seller_Name'}</p>
                    </div>
                    <p className='font-extrabold text-3xl' >₹ {product?.price ? product.price.toLocaleString('en-IN') : '₹599'}</p>
                    <div className='flex gap-3 mt-3'>
                        <p>Start rating</p>
                        <p>(133)Reviews</p>
                    </div>
                    <div className='flex gap-3 mt-4 mb-5'>
                        {!isProductInCart? 
                        <button onClick={handleAddToCart} className='btn-md btn bg-gray-700 text-white border-black hover:bg-gray-900 hover:border-black hover:text-white'>
                            <CartIconSVG />
                            Add to Cart
                        </button>
                        :
                        <button onClick={handleRemoveFromCart} className='btn-md btn bg-green-700 text-white border-black hover:bg-green-900 hover:border-black hover:text-white'>
                            <TickIconSVG />
                            Added to Cart
                        </button>
                        }
                        
                        <button className='btn-md btn bg-primaryRed border-primaryRed text-white hover:bg-secondaryRed hover:border-secondaryRed'>
                            <BuyIconSVG />
                            Buy Now</button>
                    </div>
                    <p className='text-xl font-semibold mb-2'>About this product:</p>
                    <p>{renderDescription() ||'Description'}</p>
                    <button className='flex text-sm items-center gap-1 hover:underline cursor-pointer'>
                        <i className="fa-solid fa-triangle-exclamation"></i>
                        <p>Report an issue with this product</p>
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default Product
