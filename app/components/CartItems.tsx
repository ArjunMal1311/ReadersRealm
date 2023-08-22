"use client"
import React from 'react'
import Button from './Button'
import { useRouter } from 'next/navigation';


const CartItems = ({ cartItems }: any) => {
    const router = useRouter()

    return (
        <div>
            {cartItems ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.bookName.id} className="mb-4 p-4 border border-gray-300 rounded">
                            <p className="text-lg font-semibold">Item ID: {item.bookName.id}</p>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                            {item.bookName ? (
                                <div>
                                    <p className="text-lg font-semibold">Book Information:</p>
                                    <p>Title: {item.bookName.title}</p>
                                    <p>Author: {item.bookName.author}</p>
                                </div>
                            ) : (
                                <p className="text-red-500">Book not found</p>
                            )}
                        </div>
                    ))}

                    <Button label='Place Order' onClick={() => router.push('/order')} />
                </div>
            ) : (
                <div className="text-gray-500">No Items found in Cart!!</div>
            )}

        </div>
    )
}

export default CartItems