import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContextProvider, { UserContext } from '../../Context/UserContext';

export default function Register() {
    let {setuserLogin}=useContext(UserContext);
    let navigate=useNavigate();
    const [apiError, setapiError] = useState('');
    const [isLouding, setIsLouding] = useState(false);
    function handleRegister(formValues) {
        setIsLouding(true);
       let {response}= axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
            .then((apiResponse) => { 

                if(response.data.message==='success'){
                    localStorage.setItem('usertoken',response?.data?.token);
                    setuserLogin(response.data.token);
                    navigate('/');
                    setIsLouding(false);
                }
              
               })
            .catch((apiResponse) => {
                setapiError(apiResponse?.response?.data?.message);
                // setapiError('Email or password is incorrect');
                setIsLouding(false);

            })

    }

    let validationSchema = yup.object().shape({
        name: yup.string().min(3, 'name is min length 3').max(10, 'name is max length 10').required('name is note valid'),
        email: yup.string().email('email is invalid').required('email is required'),
        phone: yup.string().matches(/^01[0-2|5|6|8|9][0-9]{8}$/, 'phone not valid').required('phone is required'),
        password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with A-Z uppercase').required('password is required'),
        rePassword: yup.string().oneOf([yup.ref('password')], 'password and repassword must be the same').required('repassword is required'),
    });

    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema: validationSchema,
        onSubmit: handleRegister
    });

    return (
        <div className='max-w-xl mx-auto py-10 mt-10'>
                         <div className='text-green-500 py-10'><h2 className='text-3xl font-bold text-start'>Register Now</h2></div>

          {apiError? <div className="pt-10 mt-10 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{apiError}</div> 
:null}
            <form onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        id="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        name="name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                        placeholder=" "
                    />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-0 start-0 peer-focus:text-green-500">Name:</label>
                </div>
                {formik.errors.name && formik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.name}</div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        id="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        name="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                        placeholder=" "
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-0 start-0 peer-focus:text-green-500">Email address:</label>
                </div>
                {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.email}</div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        id="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        name="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                        placeholder=" "
                    />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-0 start-0 peer-focus:text-green-500">Password:</label>
                </div>
                {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.password}</div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        id="rePassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rePassword}
                        name="rePassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                        placeholder=" "
                    />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-0 start-0 peer-focus:text-green-500">Repassword:</label>
                </div>
                {formik.errors.rePassword && formik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.rePassword}</div> : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        id="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        name="phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-500 peer"
                        placeholder=" "
                    />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-0 start-0 peer-focus:text-green-500">Phone:</label>
                </div>
                {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.phone}</div> : null}

                <button type="submit" className="text-white bg-green-500 rounded-lg">

                    {isLouding?<i className='fas fa-spinner fa-spin'></i>:"Register"}
                     </button>
            </form>
        </div>
    );
}
