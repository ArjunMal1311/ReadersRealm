"use client"
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { SafeListing, SafeUser } from './types';
import axios from 'axios';

interface BookInterface {
    user: SafeUser | null;
    book: SafeListing;
}

const BookInformation: React.FC<BookInterface> = ({ user, book }) => {
    const [cartQuantity, setCartQuantity] = useState(1);
    const increaseQuantity = () => {
        setCartQuantity(cartQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (cartQuantity > 1) {
            setCartQuantity(cartQuantity - 1);
        }
    };

    const addToCart = async () => {
        try {
            const response = await axios.patch('/api/cart', {
                id: book.id,
                quantity: cartQuantity,
            });

            console.log(response.data);

        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <div className='w-screen flex'>
            <div className='w-1/2 flex items-center justify-center mt-28'>
                <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-96 h-96 object-cover rounded-lg"
                />
            </div>
            <div className='w-1/3 flex mt-20 flex-col'>
                <div className='head_text orange_gradient'>Book Information</div>
                <div className="text-4xl font-extrabold mb-4 text-gray-900 mt-4">
                    {book.title}
                </div>
                <div className='flex justify-between items-center'>
                    <div className="text-xl mb-4 text-gray-700">
                        {book.author}
                    </div>

                    <div className='rounded-lg px-2 py-1 border-2 border-black hover:bg-black hover:text-white'>{book.category}</div>
                </div>
                <div className="text-md mb-4 mt-4 text-gray-700">
                    {book.description}
                </div>
                <div className="text-4xl text-gray-900 mt-10">
                    <span className="font-extrabold">₹ {book.price}</span>
                </div>

                <div className="flex items-center mt-4 justify-between">
                    <div>
                        <button
                            className="text-white bg-gray-300 px-3 py-2 rounded-full hover:bg-gray-600 focus:outline-none"
                            onClick={decreaseQuantity}
                        >
                            <AiOutlineMinus />
                        </button>
                        <span className="text-xl mx-4">Quantity: {cartQuantity}</span>
                        <button
                            className="text-white bg-gray-300 px-3 py-2 rounded-full hover:bg-gray-600 focus:outline-none"
                            onClick={increaseQuantity}
                        >
                            <AiOutlinePlus />
                        </button>
                    </div>
                    <div>
                        <button onClick={addToCart} className='rounded-lg px-2 py-1 border-2 border-black hover:bg-black hover:text-white'>Add to cart</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookInformation;
