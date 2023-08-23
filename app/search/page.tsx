"use client"
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
import Card from '../components/Card';
import { GetServerSidePropsContext } from 'next';
import { bookCategories } from '../components/ItemsList/CategoriesList';
import { Range } from 'react-range';

const Page = () => {
    const [listing, setListing] = useState<[]>([]);
    const [searchParams, setSearchParams] = useState({
        title: '',
        author: '',
        price: '',
        category: '',
        minPrice: 0,
        maxPrice: 2000
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

    const handlePriceChange = (values) => {
        setSearchParams({
            ...searchParams,
            minPrice: values[0],
            maxPrice: values[1],
        });
    };

    return (
        <div className='sm:flex m-4 flex-col'>
            <div className='lg:w-[15vw] flex justify-center w-full items-center'>
                <form onSubmit={handleSubmit} className='my-4 rounded-xl p-4 flex flex-col border-2'>
                    <input
                        type='text'
                        className='p-2 m-2 rounded-lg focus:outline-none'
                        placeholder='Title'
                        value={searchParams.title}
                        onChange={(e) =>
                            setSearchParams({ ...searchParams, title: e.target.value })
                        }
                    />
                    <input
                        type='text'
                        className='p-2 m-2 rounded-lg focus:outline-none'
                        placeholder='Author'
                        value={searchParams.author}
                        onChange={(e) =>
                            setSearchParams({ ...searchParams, author: e.target.value })
                        }
                    />

                    <select
                        className='p-2 mx-1 my-2 rounded-lg focus:outline-none'
                        value={searchParams.category}
                        onChange={handleCategoryChange}
                    >
                        <option value='' disabled>
                            Category
                        </option>
                        {bookCategories.map((category, index) => (
                            <option key={index} value={category.label}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    <div className='p-2 m-4 rounded-lg focus:outline-none'>
                        <Range
                            step={100}
                            min={0}
                            max={2000}
                            values={[searchParams.minPrice, searchParams.maxPrice]}
                            onChange={handlePriceChange}
                            renderTrack={({ props, children }) => (
                                <div {...props} className='h-2 w-full bg-gray-300 rounded-md relative'>
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props, value }) => (
                                <div {...props} className='h-8 w-8 bg-blue-500 rounded-full shadow-md cursor-pointer transform -translate-x-1/2 -translate-y-2'>
                                    <div className='text-white text-sm'>{value}</div>
                                </div>
                            )}
                        />
                    </div>
                    <button type="submit" className='flex justify-center items-center border-2  border-gray-200 m-4 rounded-lg hover:bg-gray-200'>
                        <IoSearch className="text-gray-600 text-xl cursor-pointer" />
                        Search
                    </button>

                </form>
            </div>

            {listing ? (
                <div>
                    <div className='mx-auto md:px-6 sm:px-2'>
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