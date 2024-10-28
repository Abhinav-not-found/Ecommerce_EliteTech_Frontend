import React from 'react'
import CardGroup from './CardGroup'
import home1 from '../Assets/Images/home1.jpg'
import home2 from '../Assets/Images/home2.jpg'
import home3 from '../Assets/Images/home3.jpg'
import home4 from '../Assets/Images/home4.jpg'
import home5 from '../Assets/Images/home5.jpg'
import home6 from '../Assets/Images/home6.jpg'
import home7 from '../Assets/Images/home7.jpg'
import home8 from '../Assets/Images/home8.jpg'
import home9 from '../Assets/Images/home9.jpg'
import home10 from '../Assets/Images/home10.jpg'
import home11 from '../Assets/Images/home11.jpg'

const BestProducts = () => {
    return (
        <div className='absolute top-64'>
            <div className='flex gap-5'>
                <CardGroup text={'Starting ₹299 | Latest styles from top brands'} images={[home4,home5,home6,home7]}/>
                <CardGroup text={'Up to 75% off | Never before offers on appliances'} images={[home8,home9,home10,home11]}/>
                <CardGroup text={'Minimum 50% off | Home, kitchen & more'} images={[home1,home2,home3]}/>
            </div>
        </div>
    )
}

export default BestProducts
