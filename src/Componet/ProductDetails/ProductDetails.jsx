import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";

export default function ProductDetails() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const params = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProductDetails, setRelatedProductDetails] = useState([]);
    const [currentId, setCurrentId] = useState(params.id);
    const [currentCategory, setCurrentCategory] = useState(params.category);

    function getProductDetails(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then(({ data }) => {
                setProductDetails(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function getRelatedProducts(category) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then(({ data }) => {
                let allProducts = data.data;
                setRelatedProductDetails(allProducts.filter(product => product.category.name === category));
            })
            .catch(() => {
                console.log("error getRelatedProducts");
            });
    }

    useEffect(() => {
        getProductDetails(currentId);
        getRelatedProducts(currentCategory);
    }, [currentId, currentCategory]);

    const handleProductClick = (productId, productCategory) => {
        setCurrentId(productId);
        setCurrentCategory(productCategory);
    };

    return (
        <>
            <div className="row">
                <div className="w-1/4">
                    <Slider {...settings}>
                        {productDetails?.images.map((src) => <div key={src}><img className='w-full pt-4' src={src} alt={productDetails?.title}/></div> )}
                    </Slider>
                </div>
                <div className="w-3/4 p-6">
                    <h1 className='text-lg font-bold text-start text-green-500'>{productDetails?.title}</h1>
                    <p className='text-gray-600 mt-4 text-start'>{productDetails?.description}</p>
                    <div className='flex justify-between items-center py-4'>
                        <span className='font-semibold'>{productDetails?.price} EGP</span>
                        <span>{productDetails?.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
                    </div>
                    <button className='btn hover-btn'>Add to cart</button>
                </div>
            </div>

            <div className="related-products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {relatedProductDetails.map((product) => (
                    <div key={product.id} className="product w bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-green-400 p-4">
                        <div onClick={() => handleProductClick(product.id, product.category.name)}>
                            <img className='w-full h-48 object-cover' src={product.imageCover} alt={product.title} />
                            <span className="block font-light text-green-600 mt-2">{product.category.name}</span>
                            <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-950'>{product.price} EGP</span>
                                <span className='text-gray-950'>{product.ratingsAverage}<i className='fas fa-star text-yellow-400'></i></span>
                            </div>
                        </div>
                        <button className='btn hover-btn mt-4'>Add to cart</button>
                    </div>
                ))}
            </div>
        </>
    );
}
