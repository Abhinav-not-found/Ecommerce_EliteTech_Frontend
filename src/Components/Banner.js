import React from 'react'

const Banner = () => {
    return (
        <div className='carousel w-full mb-20'>
            <div id='slide1' className='carousel-item relative w-full'>
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img24hp/urec/hero/Under1499_Tallhero_3000x1200._CB568928188_.jpg" alt="Slide 1"/>
                <div className="absolute left-5 right-5 top-32 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id='slide2' className='carousel-item relative w-full'>
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/GW/Uber/Nov/D103625178_DesktopTallHero_3000x1200_V3._CB558389732_.jpg" alt="Slide 2"/>
                <div className="absolute left-5 right-5 top-32 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id='slide3' className='carousel-item relative w-full'>
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/MA2024/GW/August/Unrec/BAU/21Aug/1-1._CB565867124_.jpg" alt="Slide 3"/>
                <div className="absolute left-5 right-5 top-32 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
            </div>
        </div>
    )
}

export default Banner
