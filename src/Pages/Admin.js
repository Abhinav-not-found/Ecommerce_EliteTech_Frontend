import React, { useState } from 'react';
import Layout from '../Components/Layout'
import Request from '../Components/Request';
import AllUsers from '../Components/AllUsers';
import AllSellers from '../Components/AllSellers';
import AllProducts from '../Components/AllProducts';
const Admin = () => {
    const [tab, setTab] = useState(1);
    return (
        <Layout>
            <div role="tablist" className="tabs tabs-boxed">
                <button role="tab" onClick={() => setTab(1)} className={`tab ${tab === 1 ? 'tab-active cursor-pointer' : ''}`}>Products</button>
                <button role="tab" onClick={() => setTab(2)} className={`tab ${tab === 2 ? 'tab-active cursor-pointer' : ''}`}>Users</button>
                <button role="tab" onClick={() => setTab(3)} className={`tab ${tab === 3 ? 'tab-active cursor-pointer' : ''}`}>Sellers</button>
                <button role="tab" onClick={() => setTab(4)} className={`tab ${tab === 4 ? 'tab-active cursor-pointer' : ''}`}>Seller Request</button>
                {/* <button role="tab" onClick={() => setTab(5)} className={`tab ${tab === 5 ? 'tab-active cursor-pointer' : ''}`}>Product Report</button>
                <button role="tab" onClick={() => setTab(6)} className={`tab ${tab === 6 ? 'tab-active cursor-pointer' : ''}`}>Seller Report</button> */}
            </div> 
            <div>
                {tab === 1 && <AllProducts/>}
                {tab === 2 && <AllUsers/>}
                {tab === 3 && <AllSellers/>}
                {tab === 4 && <Request/>}
                {tab === 5 && <div className='h-screen'>Product Report</div>}
                {tab === 6 && <div className='h-screen'>Seller Report</div>}
            </div>
        </Layout>
    );
};

export default Admin;
