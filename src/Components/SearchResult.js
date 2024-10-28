// SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout'
const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    // Extract search query from the URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/search?q=${searchQuery}`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchProducts();
    }, [searchQuery]);

    return (
        <Layout>
            <div className='h-screen p-6'>
                <h2 className='text-2xl mb-5'>Search Results for <span className='font-semibold'>"{searchQuery}"</span> </h2>
                <div className="product-list flex flex-col gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div onClick={()=>navigate(`/product/${product?._id}`)} key={product.id} className="product-item cursor-pointer bg-gray-100 flex items-top gap-10">
                                <div className='h-36 w-36 px-10 bg-white rounded'
                                    style={{
                                        backgroundImage: `url(${product.image})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                    }}
                                ></div>
                                <div>
                                    <h3 className='text-2xl'>{product.name}</h3>
                                    <div className='mt-3 flex items-center gap-5'>
                                        <p className='font-bold text-xl'>${product.price}</p>
                                        <p className='bg-gray-600 text-white h-fit py-0 px-3 w-fit rounded-full'>{product?.category || 'Category'}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            </div>
        </Layout>

    );
};

export default SearchResults;
