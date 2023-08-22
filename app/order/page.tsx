import React from 'react'
import getCart from '../actions/getCart';
import PaymentPage from './PaymentPage';

const page = async () => {
    const data = await getCart();

    return (
        <PaymentPage cartItems={data}/>
    )
}

export default page