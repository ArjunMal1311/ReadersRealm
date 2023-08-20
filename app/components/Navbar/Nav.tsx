"use client"
import React, { useCallback, useState } from 'react'
import { SafeUser } from '../types';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from './Avatar';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className='flex flex-row items-center justify-between gap-4 md:gap-0 mx-6 my-2 border-b-2 py-2'>
            <Link href="/" className='purple_gradient font-extrabold leading-[1.15] text-black text-2xl'>ReadR.</Link>
            <div className='relative'>
                <div className='flex flex-row items-center gap-3'>
                    <Link href='/search' className='text-bold border-2 border-neutral-200 px-3 py-1 mr-2 rounded-lg cursor-pointer' >
                        Search
                    </Link>

                    <div onClick={toggleOpen} className='p-4 md:py-2 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' >
                        <AiOutlineMenu />
                        <div className="hidden md:block">
                            <Avatar src={currentUser?.image} />
                        </div>
                    </div>

                    {isOpen && (
                        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-full bg-white overflow-hidden right-0 top-12 text-sm hover:cursor-pointer border-2'>
                            <div>
                                {currentUser ? (
                                    <>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/profile')}>Hello, {currentUser.name}</div>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/addBook')}>Add a Book</div>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/mybooks')}>My Books</div>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/cart')}>My Cart</div>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/books')}>All Books</div>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => signOut()}>Sign Out</div>
                                    </>

                                ) : (
                                    <>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/books')}>All Books</div>
                                        <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer' onClick={() => router.push('/login')}>Login</div>
                                        <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer' onClick={() => router.push('/register')}>SignUp</div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar