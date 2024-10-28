import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Components/Layout';
import Category from '../Components/Category';
import axios from 'axios';

const CategoryPage = () => {
    const { categoryName } = useParams(); // Capture dynamic categoryName from URL
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/product/getAllProducts');
                if (response.status === 200) {
                    setData(response.data); // Set the data with the fetched products
                    // console.log(response.data);)
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };
        getAllProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    // Safely filter products, ensuring categoryName exists and is not undefined
    const filteredProducts = data.filter(product => 
        product.category && product.category.toLowerCase() === categoryName.toLowerCase()
    );

    return (
        <Layout>
            <Category />
            <div className='h-screen p-5'>
                <h1 className='text-2xl mb-2'>All <span className='capitalize'>{categoryName}</span> Products</h1>
                <div className='flex flex-col gap-5'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div onClick={()=>navigate(`/product/${product?._id}`)} key={product._id} className='flex cursor-pointer flex-row items-center gap-5'>
                                <img src={product.image} alt={product.name} className='w-20 h-20 object-contain' />
                                <div>
                                    <h2 className='text-xl'>{product.name}</h2>
                                    {/* <p>{product.description}</p> */}
                                    <p>Price: <span className='font-bold'>${product.price}</span> </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryPage;
