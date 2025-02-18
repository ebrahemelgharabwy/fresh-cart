import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

export default function CategoriesSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 8,
        slidesToScroll: 3,
        autoplay:true
    };

    const [categories, setCategories] = useState([]);

    function getCategories() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/Categories`)
            .then(({ data }) => {
                setCategories(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getCategories();
    }, []);

    return <>
           <div className='py-8'>
            <h2 className='py-4 text-gray-900   text-xl font-medium text-start'>Shop popular categories</h2> <Slider {...settings}>
                {categories.map((category) => (
                    <div key={category}>
                        <img className='category-img ' src={category.image} alt={category.name} />
                        <h3 className='font-light mt-2'>{category.name}</h3>
                    </div>
                ))}
            </Slider></div>
        </>
    
}
