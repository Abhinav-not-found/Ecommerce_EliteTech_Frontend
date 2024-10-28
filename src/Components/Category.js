import React from 'react'
import { Link } from 'react-router-dom';

const Category = () => {
    const categories = [
        'Grocery', 'Fashion', 'Electronics', 'Home', 'Travel', 'Sports', 'Beauty', 'Toys', 'Stationary', 'Tools'
    ];

    return (
        <div className='bg-white flex justify-between px-2 flex-wrap'>
            {categories.map((category) => (
                <Link 
                    key={category}
                    to={`/categoryPage/${category.toLowerCase()}`} // Dynamically setting the URL
                    className='border px-4 py-1 hover:bg-gray-100 rounded-sm'
                >
                    {category}
                </Link>
            ))}
        </div>
    );
}

export default Category;
