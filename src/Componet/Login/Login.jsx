import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
    let { setuserLogin } = useContext(UserContext);
    let navigate = useNavigate();
    const [apiError, setapiError] = useState('');
    const [isLouding, setIsLouding] = useState(false);
    function handleLogin(formValues) {
        setIsLouding(true);
        let { response } = axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
            .then((response) => {
                if (response?.data?.message === 'success'
                ) {
                    localStorage.setItem('usertoken', response?.data?.token)
                    navigate('/');
                    setIsLouding(false);
                }
            })
            .catch((apiResponse) => {
                // setapiError(apiResponse?.response?.data?.message)
                setIsLouding(false);
                console.log('error');

            })

    }

    let validationSchema = yup.object().shape({
        email: yup.string().email('email is invalid').required('email is required'),
        password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password must start with A-Z uppercase').required('password is required'),
    });

    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: validationSchema,
        onSubmit: handleLogin

    });

    return (
       
        <div className='max-w-xl mx-auto py-10 mt-10'>
             <div className='text-green-500 py-10'><h2 className='text-3xl font-bold text-start'>Login Now</h2></div>
            {apiError ? <div className="pt-10 mt-10 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{apiError}</div>
                : null}
            <form onSubmit={formik.handleSubmit}>

                <div className="relative z-0 w-full mb-5 group py-5">
                    <input
                        type="email"
                        id="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        name="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-0 start-0 peer-focus:text-green-600">Email address:</label>
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
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                        placeholder=" "
                    />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-green-500 duration-300 transform -translate-y-6 scale-75 top-0 start-0 peer-focus:text-green-600">Password:</label>
                </div>
                {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">{formik.errors.password}</div> : null}

                <div className='flex items-center'>  <button type="submit" className="text-white  bg-green-500 rounded-lg">

                    {isLouding ? <i className='fas fa-spinner fa-spin'></i> : "Login"}
                </button>
                    <p className='pl-4'>didn't have account yet ?<span className='font-semibold  cursor-pointer'> <Link to={'/Regester'} className='text-green-500'>Regester Now</Link></span></p></div>

            </form>
        </div>
    );
}
