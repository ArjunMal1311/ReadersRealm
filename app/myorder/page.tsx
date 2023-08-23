import React from 'react'
import getAllOrders from '../actions/getAllOrders'
import { getCurrentUser } from '../actions/getCurrentUser';
import Link from 'next/link';
import { SafeOrder } from '../components/types';

const page = async () => {
    const data = await getAllOrders();
    const user = await getCurrentUser();
    return (
        <div className='ml-6 '>
            {user ? <>
                <span className='text-4xl font-extrabold'>Hello, {user?.name}, Here are your orders!</span>
                {data?.map((item: any) => (
                    <div key={item.id} className='flex mt-6'>
                        <Link href={`myorder/${item.id}`}>
                            <div className='border-2 border-black px-2 py-1 rounded-xl'>
                                <div>
                                    {item.id}
                                </div>

                                <div>
                                    ₹ {item.itemsPrice}
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}</> :
                <div>
                    <div className='m-6'>
                        <h2 className='text-4xl purple_gradient font-bold mb-8'>Login to view your Orders!</h2>
                        <Link href="/login" className='mt-8 border-2 p-4 rounded-lg'>Login</Link>
                    </div>
                </div>}

        </div>
    )
}

export default page