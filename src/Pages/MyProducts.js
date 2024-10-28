import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import Card from '../Components/Card'
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const MyProducts = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [data, setData] = useState([]);
    // console.log(data)
    const [imageUrl, setImageUrl] = useState(null); 
    const [selectedFile, setSelectedFile] = useState(null); 
    const { user } = useContext(AuthContext);
    // console.log(user)
    const [loading,setLoading]=useState(false);

    useEffect(() => {
        const getAllProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/product/getAllProducts')
                if (res.status === 200) {
                    // console.log(res?.data[0].sellerName)
                    const userProducts = res.data.filter(product => product.sellerName === user?.name);
                    setData(userProducts);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getAllProducts();
    }, [user])

    const handleCreate = async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', desc);
            formData.append('category', category);
            formData.append('sellerName', user?.name);
            formData.append('image', selectedFile); // append the file
    
            const res = await axios.post('http://localhost:3001/api/product/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (res.status === 201) {
                alert('Created');
                setLoading(false)
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };
    

    // Handle image selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const url = URL.createObjectURL(file); // Create a URL for the file preview
            setImageUrl(url); // Set image URL for preview
            setSelectedFile(file); // Set selected file
        }
    }

    return (
        <Layout>
            <div className=''>
                <div className='mx-5 my-3 px-4 py-2 bg-white rounded-md border h-screen'>
                    <div className='flex justify-between'>
                        <h1 className='text-4xl text-gray-700 font-semibold'>My <span className='font-bold text-primaryRed'>Products</span> </h1>
                        <button onClick={() => document.getElementById('my_modal_3').showModal()} className='btn'>Add</button>
                    </div>
                    <div className='mt-8 grid grid-cols-6 row-auto gap-y-6'>
                        {data.map((product, index) => (
                            <Card key={index} prop={product} deleteBtn={true} />
                        ))}
                    </div>

                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box w-full h-full">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <div>
                                {/* Add Image Button */}
                                <label className='w-full h-40 bg-gray-300 mt-5 mb-4 rounded-md flex items-center justify-center relative cursor-pointer'>
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Selected" className='w-full h-full object-cover rounded-md' />
                                    ) : (
                                        <span>Add Image</span>
                                    )}
                                    <input onChange={handleImageChange} type="file" className='hidden' accept='image/png, image/jpeg, image/jpg' />
                                </label>

                                <div className='flex gap-2 my-4'>
                                    <p className='text-lg'>Name: </p>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className='text-lg border-b-2 border-gray-400 outline-none' type="text" />
                                </div>
                                <div className='flex gap-2 my-4'>
                                    <p className='text-lg'>Price: </p>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} className='text-lg border-b-2 border-gray-400 outline-none' type="text" />
                                </div>
                                <div className='flex gap-2 my-4'>
                                    <p className='text-lg'>Category: </p>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className='text-lg outline-none cursor-pointer'>
                                        <option value="">Select</option>
                                        <option value="Grocery">Grocery</option>
                                        <option value="Fashion">Fashion</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Home">Home</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Sports">Sports</option>
                                        <option value="Beauty">Beauty</option>
                                        <option value="Toys">Toys</option>
                                        <option value="Stationary">Stationary</option>
                                        <option value="Tools">Tools</option>
                                    </select>
                                </div>
                                <p className='text-lg'>Description: </p>
                                <textarea value={desc} placeholder='Press Enter for bullet points' onChange={(e) => setDesc(e.target.value)} className='w-full h-20 text-lg outline-none rounded resize-none border-2 border-gray-400' type="text"></textarea>
                                <button onClick={handleCreate} className='btn mt-5'>{loading ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </Layout>
    )
}

export default MyProducts;
