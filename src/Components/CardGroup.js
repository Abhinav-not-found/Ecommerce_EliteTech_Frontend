import React from 'react';
import Home1 from '../Assets/Images/home1.jpg';

const CardGroup = ({ images,text }) => {
    return (
        <div className="px-4 w-fit bg-white mx-2 py-4 rounded-2xl border">
        <p className="mb-5 text-xl font-semibold">{text}</p>
        <div className="grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-4">
            {images && images.length > 0
            ? images.map((img, index) => (
                <img key={index} src={img} alt={`Product ${index + 1}`} className="rounded-lg h-auto w-40" />
                ))
            : (
                <>
                    {/* <img src={Home1} alt="Product" className="rounded-lg" />
                    <img src={Home1} alt="Product" className="rounded-lg" />
                    <img src={Home1} alt="Product" className="rounded-lg" />
                    <img src={Home1} alt="Product" className="rounded-lg" /> */}
                </>
            )}
        </div>
        </div>
    );
};

export default CardGroup;
