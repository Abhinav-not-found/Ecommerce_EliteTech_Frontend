import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Components/Layout';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const Cart = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0); // State for total amount

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/cart/getCartItems/${user?._id}`);
                if (res.status === 200) {
                    setData(res.data);
                    calculateTotal(res.data); // Calculate total when items are fetched
                }
            } catch (error) {
                console.error(error);
            }
        };
        getCartItems();
    }, [user?._id]);

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price, 0); // Sum up item prices
        setTotalAmount(total);
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const res = await axios.delete(`http://localhost:3001/api/cart/removeFromCart/${user?._id}/${productId}`);
            if (res.status === 200) {
                setData((prevData) => prevData.filter((item) => item.id !== productId)); // Update cart items
                calculateTotal(data); // Recalculate total
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className='h-screen flex'>
                <div className='rounded-lg p-4 h-fit w-3/4 mx-4 mt-4 border bg-white'>
                    <h1 className='text-4xl font-semibold'>Shopping<span className='text-primaryRed font-extrabold'> Cart</span></h1>
                    <div className='mt-10'>
                        {data.map((item, index) => (
                            <div key={index} className='flex gap-4 mb-3 items-center'>
                                <div className='w-fit h-fit bg-red-300'>
                                    <img src={item.image} alt={item.name} className='w-24 h-auto' />
                                </div>
                                <div className='flex justify-between w-full ml-2'>
                                    <div>
                                        <h2 className='text-2xl'>{item.name}</h2>
                                        <p>Price: <span className='font-semibold'>${item.price}</span></p>
                                    </div>
                                    <button onClick={() => handleRemoveFromCart(item.id)} className='btn bg-primaryRed hover:bg-secondaryRed text-white'>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='bg-white border p-4 rounded-lg h-fit w-1/4 mr-4 mt-4'>
                    <h1 className='text-2xl mb-3'>Total Amount:</h1>
                    <p className='mb-5 font-extrabold'>${totalAmount.toFixed(2)}</p> {/* Format total amount */}
                    <button className='btn bg-primaryRed hover:bg-secondaryRed text-white'>Check Out</button>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
