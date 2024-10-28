import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Request = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        const getSellerRequest = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/admin/getSellerRequest')
                if (res.status === 200) {
                    setData(res.data)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getSellerRequest()
    }, [])

    const handleAccept = async(userId) => {
        try {
            const res = await axios.put('http://localhost:3001/api/admin/acceptRequest',{userId})
            if (res.status === 200) {
                alert('Updated')
                window.location.reload()
            }
        } catch (error) {
            console.log(error.message)
            if(error.status === 404){
                alert('User not found')
            }
        }
    }
    const handleReject = async(userId) => {
        try {
            const res = await axios.put('http://localhost:3001/api/admin/rejectRequest',{userId})
            if (res.status === 200) {
                alert('Updated')
                window.location.reload()
            }
        } catch (error) {
            console.log(error.message)
            if(error.status === 404){
                alert('User not found')
            }
        }
    }

    return (
        <div className='h-screen px-2'>
            <table className='table-auto w-full border-collapse'>
                <thead className='bg-gray-300'>
                    <tr>
                        <th className='border px-4 py-2'>Sr. No.</th>
                        <th className='border px-4 py-2'>Name</th>
                        <th className='border px-4 py-2'>Email</th>
                        <th className='border px-4 py-2'>UserId</th>
                        <th className='border px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="6" className='text-center py-4'>No data available</td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={item.userId || index} className='bg-white'>
                                <td className='border px-4 py-2 text-center'>{index + 1}</td>
                                <td className='border px-4 py-2 text-center'>{item.name}</td>
                                <td className='border px-4 py-2 text-center'>{item.email}</td>
                                <td className='border px-4 py-2 text-center'>{item.userId}</td>
                                <td className='border px-4 py-2 text-center'>
                                    {item.action === 'pending' ? (
                                        <div>
                                            <button 
                                                className='text-green-500 mr-8' 
                                                onClick={() => handleAccept(item.userId)}
                                            >
                                                <i className="fa-regular text-2xl fa-circle-check"></i>
                                            </button>
                                            <button 
                                                className='text-red-500' 
                                                onClick={() => handleReject(item.userId)}
                                            >
                                                <i className="fa-regular text-2xl fa-circle-xmark"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={item.action === 'accepted' ? 'text-green-600' : 'text-red-600'}>
                                            {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Request;
