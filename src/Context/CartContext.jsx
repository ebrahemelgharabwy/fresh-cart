import axios from 'axios'
import React, { createContext, useContext, useState } from 'react'
export let CartContecxt = createContext();

export default function CartContextProvaider(props) {
    let headers = {
        token: localStorage.getItem('usertoken')
    }
    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
            .then((response) => response)
            .catch((error) => error)
    }
    function removeCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: headers })
            .then((response) => response)
            .catch((error) => error)
    }
    function updatCartItem(productId,count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count}, { headers: headers })
            .then((response) => response)
            .catch((error) => error)
    }

    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then((response) => response)
            .catch((eror) => eror)

    }
    function Checkout() {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/6668d051ed0dc0016cde10be?url=http://localhost:3000`, { headers })
            .then((response) => response)
            .catch((eror) => eror)

    }









    
    return <CartContecxt.Provider value={{ addToCart, getCartItems ,removeCartItem ,updatCartItem,Checkout}}>
        {props.children}
    </CartContecxt.Provider>
}
