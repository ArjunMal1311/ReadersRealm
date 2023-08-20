import React from 'react';
import Image from 'next/image';
import { SafeListing } from './types';
import Link from 'next/link';

interface ListingCardProps {
    data: SafeListing;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}

const Card: React.FC<ListingCardProps> = ({ data, disabled, actionLabel, actionId = '' }) => {
    return (
        <div className="hover:bg-purple-100 rounded-lg shadow-md p-4 transform hover:scale-105 transition cursor-pointer border-2 hover:border-purple-100">
            <Link href={`/books/${data.id}`}>
                <Image
                    src={data.imageUrl}
                    alt="Listing"
                    className="object-cover rounded-t-lg"
                    width={200}
                    height={100}
                />
                <div className="mt-4">
                    
                    <p className="mt-1 font-semibold text-2xl">
                        {data.title.substring(0, 15)}
                    </p>
                    <p className="mt-1 text-purple-700 font-semibold">
                        ₹ {data.price}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Card;
