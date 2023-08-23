import React from 'react'
import getCart from '../actions/getCart';
import PaymentPage from './PaymentPage';
import { getCurrentUser } from '../actions/getCurrentUser';

const page = async () => {
    const data = await getCart();
    const user = await getCurrentUser();

    return (
        <div>
            {user ? <><PaymentPage cartItems={data} /></> : <div className='m-4 text-4xl font-extrabold text-gray-500'>Unauthorized Access</div>}

        </div>
    )
}

export default page