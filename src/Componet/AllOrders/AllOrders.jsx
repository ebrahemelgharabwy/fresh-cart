import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import * as yup from 'yup';
import { CartContecxt } from '../../Context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
export default function AllOrders() {
  const [isLouding, setisLouding] = useState(false)
  let { Checkout } = useContext(CartContecxt);
  async function check() {
    setisLouding(true)
    let data = await Checkout()
    
    console.log(data)

  }
  let validationSchema = yup.object().shape({
    details: yup.string().min(3, 'name is min length 3').max(10, 'details is max length 10').required('details is note valid'),
    phone: yup.string().matches(/^01[0-2|5|6|8|9][0-9]{8}$/, 'phone not valid').required('phone is required'),

    city: yup.string().min(3, 'name is min length 3').max(10, 'city is max length 10').required('city is note valid'),

  });


  let formik = useFormik({

    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: check,

  })






  return <>
    <div className='className=" py-10 mt-10'>    <form onSubmit={formik.handleSubmit}  className='w-3/4 mx-auto'>
      <div className="relative z-0   mb-5 group py-5">
        <input
          type="details"
          id="details"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.details}
          name="details"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
        />
        <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-10 start-0 peer-focus:text-green-600">details :</label>
      </div>
      {formik.errors.details && formik.touched.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.details}</div> : null}



      <div className="relative z-0 w-full mb-5 group py-5">
        <input
          type="phone"
          id="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          name="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
        />
        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-10 start-0 peer-focus:text-green-600">phone address:</label>
      </div>
      {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.phone}</div> : null}




      <div className="relative z-0 w-full mb-5 group py-5">
        <input
          type="city"
          id="city"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
          name="city"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
          placeholder=" "
        />
        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-10 start-0 peer-focus:text-green-600">city address:</label>
      </div>
      {formik.errors.city && formik.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.city}</div> : null}
      <button   type="submit" className="text-white  bg-green-500 px-7 py-3 rounded-lg">

        {isLouding ? <i className='fas fa-spinner fa-spin'></i> : <Link to={'/pay'}>pay Now</Link>}
      </button >




    </form>
    </div>



  </>
}
