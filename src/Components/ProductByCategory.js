import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'

const ProductByCategory = ({ Category }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/product/getAllProducts')
                if (res.status === 200) {
                    setData(res.data)
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        getAllProducts();
    }, [Category]); 

    const handleLink = () => {
        window.location.href = `/categoryPage/${Category}`;
    }

    return (
        <div className='mb-4 mx-2 bg-white px-4 border rounded-2xl py-4'>
            <div className='flex justify-between'>
                <p className='text-2xl font-semibold mb-5'>{Category} Products</p>
                <p onClick={handleLink}  className='cursor-pointer hover:underline text-sm'>view all</p>
            </div>
            <div className='grid grid-flow-col auto-cols-max gap-x-5 overflow-x-auto'>
            {data
                    ?.filter(product => product?.category === Category) // filter by category
                    ?.slice(0, 7) // limit to 7 products
                    ?.map(product => (
                        <Card key={product._id} prop={product} deleteBtn={false} />
                    ))}
            </div>
        </div>

    )
}

export default ProductByCategory;
