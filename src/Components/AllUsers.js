import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllUsers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/admin/getAllUsers');
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getAllUsers();
    }, []);

    // Function to determine the background color based on user role
    const getRowClassName = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-300';  // Red for admin
            case 'user':
                return 'bg-blue-300'; // Blue for user
            case 'manager':
                return 'bg-yellow-300'; // Yellow for manager
            default:
                return 'bg-white'; // Default color
        }
    };

    return (
        <div className='h-screen px-2'>
            <table className='table-auto w-full border-collapse'>
                <thead className='bg-gray-400'>
                    <tr>
                        <th className='border px-4 py-2'>Id</th>
                        <th className='border px-4 py-2'>Name</th>
                        <th className='border px-4 py-2'>Email</th>
                        <th className='border px-4 py-2'>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="4" className='text-center py-4'>No data available</td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={item._id || index} className={`border ${getRowClassName(item.role)}`}>
                                <td className='border px-4 py-2 text-center'>{index + 1}</td>
                                <td className='border px-4 py-2 text-center'>{item.name}</td>
                                <td className='border px-4 py-2 text-center'>{item.email}</td>
                                <td className='border px-4 py-2 text-center'>{item.role}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AllUsers;
