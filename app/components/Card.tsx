"use client"
import React from 'react';
import Image from 'next/image';
import { SafeListing } from './types';
import Link from 'next/link';
import axios from 'axios';

interface ListingCardProps {
    data: SafeListing;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}

const Card: React.FC<ListingCardProps> = ({ data, disabled, actionLabel, actionId = '' }) => {
    const AddCart = () => {
        try {
            axios.patch('/api/cart', {
                id: data.id,
                quantity: 1,
            });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }
    return (
        <div className="hover:bg-purple-100 rounded-lg shadow-md p-4 transform hover:scale-105 transition cursor-pointer border-2 hover:border-purple-100">
            <Link href={`/books/${data.id}`}>
                <Image
                    src={data.imageUrl}
                    alt="Listing"
                    className="object-cover h-48 w-full rounded-t-lg"
                    width={500}
                    height={500}
                />
                <div className="mt-4">

                    <p className="mt-1 font-semibold text-2xl">
                        {data.title.substring(0, 15)}
                    </p>
                    <p className="mt-1 mb-2 text-md">
                        {data.author}
                    </p>
                    <p className="mt-2 text-purple-700 font-semibold flex justify-between items-center">
                        ₹ {data.price}

                        <button onClick={AddCart} className='px-2 py-1 border-2 rounded-lg hover:bg-purple-500 hover:text-white'>Add to Cart</button>
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Card;
