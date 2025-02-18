import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import Swal from 'sweetalert2';

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
        setBrands(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);



 

  const handleClick = (brand) => {
    Swal.fire({      
      title: brand.name,
      text: brand.slug,
      imageUrl: brand.image,
      imageWidth: 300,
      imageHeight: 200,
      imageAlt: brand.name,
    });
  };

  return (
    
    <div className='text-center'>
      <h1 className='text-green-500 pt-10 my-10 font-semibold'>All Brands</h1>
      {loading ? (
        <div className='flex justify-center py-8 w-full'>
          <ClimbingBoxLoader loading={loading} color="green" size={30} />
        </div>
      ) : (
        <div className='grid mt-6 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-full'>
          {brands.map((brand) => (
            <div
              key={brand._id}
              className='w-full cursor-pointer px-4 items-center shadow-lg shadow-green-200 border border-spacing-2 rounded-lg overflow-hidden gap-2 py-10 hover:shadow-3xl hover:shadow-green-400 my-2'
              onClick={() => handleClick(brand)}
            >
              <img src={brand.image} alt={brand.name} className='w-full h-32 object-cover mb-4' />
              <h2 className='text-lg font-medium'>{brand.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
