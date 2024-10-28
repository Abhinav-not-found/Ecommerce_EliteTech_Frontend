import React, { useState } from 'react';
import RegisterSVG from '../Assets/Svg/Register.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        setError(''); 
        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', { name, email, password });
            if (response.status === 201) {
                alert('Registration Successful');
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                const errorMessage = getErrorMessage(error.response.data.message);
                setError(errorMessage);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'missing_fields':
                return 'Please fill in all required fields.';
            case 'email_exists':
                return 'This email is already registered.';
            case 'server_error':
                return 'An unexpected server error occurred. Please try again.';
            default:
                return 'An unexpected error occurred. Please try again.';
        }
    };

    return (
        <div className='h-screen bg-white flex'>
            <div className='LEFT w-1/2 pt-24 pl-40'>
                <h1 className='text-5xl font-semibold mb-10' style={{ fontFamily: 'Playwrite CU' }}>
                    Register
                </h1>
                <p className='text-lg mb-1'>Name</p>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className='bg-transparent input-bordered text-xl px-1 py-1 w-3/6 border rounded-sm mb-3' 
                    type="text" 
                />
                <p className='text-lg mb-1'>Email</p>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className='bg-transparent input-bordered text-xl px-1 py-1 w-3/6 border rounded-sm mb-3' 
                    type="text" 
                />
                <p className='text-lg mb-1'>Password</p>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className='bg-transparent input-bordered text-xl px-1 py-1 w-3/6 border rounded-sm mb-6' 
                    type="password" 
                />
                <br/>
                {error && <p className='text-red-500 mb-4'>{error}</p>} {/* Display error message */}
                <button 
                    onClick={handleRegister} 
                    className='btn bg-[#E8505B] text-white hover:bg-[#cf474e] hover:shadow-lg'>
                    Register
                </button>
                <p className='mt-5 text-xl'>Already have an account? <Link to='/login' className='link'>Login here</Link></p>
            </div>
            <div className='RIGHT w-1/2 pt-24'>
                <img className='w-5/6 h-auto ml-10' src={RegisterSVG} alt='registerSVG'/>
            </div>
        </div>
    );
};

export default Register;
