"use client"
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { SafeListing, SafeUser } from './types';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Input from './Input';
import { toast } from 'react-hot-toast';

interface BookInterface {
    user: SafeUser | null;
    book: SafeListing;
    review: any
}

const BookInformation: React.FC<BookInterface> = ({ user, book, review }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            comment: '',
            rating: 0,
            productId: book.id
        }
    });

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
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        axios.post('/api/review', data).then(() => {
            toast.success('Book Added Successfully!')
            router.refresh()
        }).catch(() => {
            toast.error('Something went wrong.');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div>
            <div className='w-full flex items-center flex-col'>
                <div className='flex mt-10'>
                    <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-96 h-96 object-cover rounded-lg border-2 border-black p-1 border-dashed"
                    />
                </div>
                <div className='m-4 flex mt-10 flex-col items-center w-[80vw]'>
                    <div className='head_text orange_gradient'>Book Information</div>
                    <div className="text-2xl font-semibold mb-4 text-gray-900 mt-4">
                        <span className='text-4xl font-extrabold'>{book.title}</span>
                    </div>
                    <div className='flex justify-around items-center w-full'>
                        <div className="text-xl mb-4 text-gray-700">
                            Author: <span className='text-2xl font-extrabold'>{book.author}</span>
                        </div>

                        <div className='rounded-lg px-2 py-1 border-2 border-black hover:bg-black hover:text-white'>{book.category}</div>
                    </div>
                    <div className="text-md mb-4 mt-4 text-gray-700 sm:w-3/4 w-full">
                        {book.description}
                    </div>
                    <div className="text-2xl text-gray-900 mt-10 mb-6">
                        Price: <span className="font-extrabold text-4xl">₹ {book.price}</span>
                    </div>

                    <div className="flex justify-around w-full">
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

                    <div className="mt-6 sm:w-3/4 w-full">
                        <div className="head_text text-xl font-bold mb-4">
                            Reviews
                        </div>

                        {review.map((rev: any) => (
                            <div className="flex-col mb-4 border-b-2 py-2" key={book.id}>
                                <div className="font-medium">{rev.comment.substring(0, 100)}...</div>
                                <div className="text-gray-500 mt-1">Rating: {rev.rating}</div>
                            </div>
                        ))}

                        <form onSubmit={handleSubmit(onSubmit)} className='w-full sm:w-1/2 border-2 border-gray-600 p-4 rounded-lg '>
                            <div className='font-bold my-1 text-xl'>Add Review</div>
                            <div className="mb-4">
                                <label htmlFor="comment" className="block font-medium text-gray-700">
                                    Comment
                                </label>
                                <input
                                    id="comment"
                                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 disabled:bg-gray-100"
                                    type="text"
                                    disabled={isLoading}
                                    {...register('comment', { required: true })}
                                />
                                {errors.comment && <p className="text-red-500">This field is required</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="rating" className="block font-medium text-gray-700">
                                    Rating
                                </label>
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`text-2xl cursor-pointer ${star <= selectedRating ? 'text-yellow-500' : 'text-gray-400'
                                                }`}
                                            onClick={() => setSelectedRating(star)}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                                onClick={handleSubmit(onSubmit)}
                                disabled={isLoading}
                            >
                                Add Review
                            </button>
                        </form>
                    </div>

                </div>

            </div>


        </div>
    );
};

export default BookInformation;
