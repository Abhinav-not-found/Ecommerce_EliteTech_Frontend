import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/product/getAllProducts');
                if (res.status === 200) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getAllProducts();
    }, []);

    // Function to truncate the text by word count
    const truncateText = (text, maxWords) => {
        const words = text.split(' ');
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ') + '...';
        }
        return text;
    };

    const handleDelete = async (productId) => {
        try {
            const res = await axios.delete(`http://localhost:3001/api/product/deleteProduct/${productId}`);
            if (res.status === 200) {
                // Remove the deleted product from the products list
                setProducts(products.filter((product) => product._id !== productId));
                alert('Product deleted!!')
            }
        } catch (error) {
            console.log('Error deleting product:', error.message);
        }
    };

    return (
        <div className='h-fit px-2'>
            <table className='table-auto w-full border-collapse'>
                <thead className='bg-gray-400'>
                    <tr>
                        <th className='border px-4 py-2 text-start'>Id</th>
                        <th className='border px-4 py-2 text-start'>Name</th>
                        <th className='border px-4 py-2 text-start'>Category</th>
                        <th className='border px-4 py-2 text-start'>Price</th>
                        <th className='border px-4 py-2 text-start'>Seller Name</th>
                        <th className='border px-4 py-2 text-start'>Description</th>
                        <th className='border px-4 py-2 text-start'>Image</th>
                        <th className='border px-4 py-2 text-start'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan="7" className='text-center py-4'>No products available</td>
                        </tr>
                    ) : (
                        products.map((product, index) => (
                            <tr key={product._id || index} className='border'>
                                <td className='border px-4 py-2 text-start'>{index + 1}</td>
                                <td className='border px-4 py-2 text-start'>
                                    {truncateText(product.name, 10)} {/* Limit name to 10 words */}
                                </td>
                                <td className='border px-4 py-2 text-start'>{product.category}</td>
                                <td className='border px-4 py-2 text-start'>${product.price}</td>
                                <td className='border px-4 py-2 text-start'>{product.sellerName}</td>
                                <td className='border px-4 py-2 text-start'>
                                    {truncateText(product.description, 15)} {/* Limit description to 15 words */}
                                </td>
                                <td className='border px-4 py-2 text-start'>
                                    <img src={product.image} alt={product.name} className='w-20 h-20 object-cover' />
                                </td>
                                <td className='border px-4 py-2 text-center '>
                                    <button onClick={() => handleDelete(product._id)}>
                                        <i className="fa-solid fa-trash hover:text-primaryRed"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllProducts;
