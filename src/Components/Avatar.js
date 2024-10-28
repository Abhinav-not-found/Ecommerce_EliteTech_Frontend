import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';

const Avatar = () => {
    const { user } = useContext(AuthContext);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [isManagerAuthenticated, setIsManagerAuthenticated] = useState(false);

    useEffect(() => {
        const getRole = localStorage.getItem('role');
        if (getRole === 'admin') {
            setIsAdminAuthenticated(true);
        } else if (getRole === 'manager') {
            setIsManagerAuthenticated(true);
        } else {
            setIsManagerAuthenticated(false);
            setIsAdminAuthenticated(false);
        }
    }, []);

    const nameInitial = user && user.name ? user.name.charAt(0).toUpperCase() : 'D';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.reload();
    };

    const handleSellerRequest = async () => {
        try {
            const res = await axios.post('http://localhost:3001/api/admin/sellerRequest', {
                userId: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            });
            if (res.status === 201) {
                alert('Sent request');
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 404) {
                alert('Already sent request');
            } else if (error.response.status === 400) {
                alert('Already sent request');
            }
        }
    };

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} className="avatar btn btn-sm btn-ghost btn-circle placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                    <span className="text-xs capitalize">{nameInitial}</span>
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 shadow">
                {!isAdminAuthenticated && (
                    <div>
                        <li><Link to='/'>Profile</Link></li>
                        {isManagerAuthenticated ? (
                            <li><Link to='/myProducts'>My Products</Link></li>
                        ) : (
                            <li><button onClick={handleSellerRequest}>Become a seller</button></li>
                        )}
                    </div>
                )}
                {/* {isAdminAuthenticated && <li><Link to='/admin-dashboard'>Admin Dashboard</Link></li>} */}
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </div>
    );
};

export default Avatar;
