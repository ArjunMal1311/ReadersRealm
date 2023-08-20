"use client"
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
import Card from '../components/Card';
import { GetServerSidePropsContext } from 'next';
import { bookCategories } from '../components/ItemsList/CategoriesList';


const Page = () => {
    const [listing, setListing] = useState<[]>([]);
    const [searchParams, setSearchParams] = useState({
        title: '',
        author: '',
        price: '',
        category: '',
        minPrice: '',
        maxPrice: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const queryParams: { [key: string]: string } = {};

        for (const key in searchParams) {
            if (searchParams[key as keyof typeof searchParams]) {
                queryParams[key] = searchParams[key as keyof typeof searchParams];
            }
        }

        try {
            const apiUrl = "/api/search/";

            const response = await axios.get(apiUrl, {
                params: queryParams
            });

            setListing(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCategoryChange = (e) => {
        setSearchParams({ ...searchParams, category: e.target.value });
    };

    return (
        <div className='m-4'>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Title"
                        value={searchParams.title}
                        onChange={(e) => setSearchParams({ ...searchParams, title: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Author"
                        value={searchParams.author}
                        onChange={(e) => setSearchParams({ ...searchParams, author: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Price"
                        value={searchParams.price}
                        onChange={(e) => setSearchParams({ ...searchParams, price: e.target.value })}
                    />
                    <select
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        value={searchParams.category}
                        onChange={handleCategoryChange}
                    >
                        <option value="" className="flex-1 p-1 mr-2 rounded-lg focus:border-none" disabled>Select a category</option>
                        {bookCategories.map((category, index) => (
                            <option key={index} value={category.label}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Min Price"
                        value={searchParams.minPrice}
                        onChange={(e) => setSearchParams({ ...searchParams, minPrice: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Max Price"
                        value={searchParams.maxPrice}
                        onChange={(e) => setSearchParams({ ...searchParams, maxPrice: e.target.value })}
                    />
                    <button type="submit">
                        <IoSearch className="text-gray-600 text-xl cursor-pointer" />
                    </button>

                </form>
            </div>

            {listing ? (
                <div>
                    <div className='mx-auto md:px-6 sm:px-2 mt-10'>
                        <h4 className='purple_gradient text-4xl font-bold mb-5'>
                            Here are the results!
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                            {listing.map((listing: any) => (
                                <Card key={listing.id} data={listing} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const queryParams = context.query;
        const response = await axios.get("/api/search/", {
            params: queryParams
        });

        const listing = response.data;

        return {
            props: {
                listing,
            },
        };
    } catch (error) {
        return {
            props: {},
        };
    }
}



export default Page;