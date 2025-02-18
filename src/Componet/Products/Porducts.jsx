import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { CartContecxt } from '../../Context/CartContext';
import toast from 'react-hot-toast';


export default function RecentProudcts() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  let { addToCart } = useContext(CartContecxt);

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === 'success') {
      toast.success('proudct added successfully to your cart', { duration: 1500, position: 'bottom-right' });
    } else {
      toast.error('error added product to your cart', { duration: 1500, position: 'bottom-right' });
    }
  }


  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let { data, isError, error, isFetched, isLoading } =
    useQuery({
      queryKey: ['recentproudcts'],
      queryFn: getRecent,
      staleTime: 20000,
    })

  if (isLoading) {
    return <>
      <div className='flex justify-center py-8 w-full'><ClimbingBoxLoader loading={loading} color="green" size={30} />
      </div>
    </>
  }
  if (isError) {
    return <>
      <div className='flex w-full justify-center py-8 '>
        <h3>{error}</h3>
      </div>  </>
  }
  let filteredProducts = data?.data.data.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return <>

    <form className="flex items-center max-w-2xl mx-auto pt-10 mt-10">
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

        </div>
        <input type="text" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." />
      </div>
    </form>
    <div className="grid mt-6 gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 max-w-full">
      {filteredProducts.map((product) => (
        <div key={product.id} className="w-full w px-4 items-center shadow-lg shadow-green-200 border border-spacing-2 rounded-lg overflow-hidden gap-1 hover:shadow-2xl hover:shadow-green-400 my-2">
          <Link to={`/productdatials/${product.id}/${product.category.name}`}>
            <div className="product">
              <img className='w-full p-3' src={product.imageCover} alt={product.title} />
              <span className="block font-light text-green-600">{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className='flex justify-between items-center'>
                <span className='text-gray-950'>{product.price} EGP</span>
                <span className='text-gray-950'>{product.ratingsAverage}<i className='fas fa-star text-yellow-400'></i> </span>
              </div>
            </div>
          </Link>
          <button onClick={() => addProductToCart(product.id)} className='btn hover-btn'>Add to cart</button>
        </div>
      ))}
    </div>

  </>
}
