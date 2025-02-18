import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import Swal from 'sweetalert2';

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allCategories, setAllCategories] = useState(null);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
        setBrands(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  async function fetchAllCatgiory(id) {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setAllCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  }

  return (
    <>
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
                onClick={() => fetchAllCatgiory(brand._id)}
              >
                <img src={brand.image} alt={brand.name} className='w-full h-40 object-cover mb-4' />
                <h2 className='text-lg text-green-600 font-medium'>{brand.name}</h2>
              </div>
            ))}
          </div>
        )}
        {allCategories &&(
          <div className='mt-10 p-4 border border-green-500 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-semibold text-green-500 mb-4'>{allCategories.name}</h2>
            <div className='text-left'>
              <p><strong>Name:</strong> {allCategories.name}</p>
              <p><strong>Description:</strong> {allCategories.description}</p>
              {/* يمكنك إضافة المزيد من التفاصيل هنا بناءً على بيانات الفئة */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
