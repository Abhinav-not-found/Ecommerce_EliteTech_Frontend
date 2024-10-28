import React, {  } from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import BestProducts from '../Components/BestProducts'
import ProductByCategory from '../Components/ProductByCategory'
import Footer from '../Components/Footer'
import Category from '../Components/Category'
const Home = () => {
    return (
        <div>
            <Navbar/>
            <Category/>
            <div className='relative'>
                <Banner/>
                <BestProducts />
            </div>
            <ProductByCategory Category={'Fashion'} />
            <ProductByCategory Category={'Electronics'} />
            <ProductByCategory Category={'Home'} />
            <Footer/>
        </div>
    )
}

export default Home
