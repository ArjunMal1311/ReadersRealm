import Image from 'next/image'
import { bookCategories, rating } from './components/ItemsList/CategoriesList'
import { AuthorsList } from './components/ItemsList/AuthorsList'
import { FaFacebook, FaInstagram, FaSnapchat } from 'react-icons/fa'
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div className='flex flex-col min-h-screen'>
        <div className="mt-8 m-4 text-center text-4xl flex flex-col sm:flex-row justify-center items-end textout head_text">
          ReadersRealm
        </div>

        <div className="mt-8 mx-4">
          <div className="w-full flex flex-col sm:flex-row justify-around">
            <div className="text-center mb-4 sm:mb-0">
              <h4 className="text-lg font-semibold">Fast delivery</h4>
              <p>Fast Delivery on all orders above ₹1000</p>
            </div>
            <div className="sm:h-6 sm:border-gray-500 sm:border-l-2 m-2"></div>
            <div className="text-center mb-4 sm:mb-0">
              <h4 className="text-lg font-semibold">WorldWide Shipping</h4>
              <p>Easy Global Shipping with us!</p>
            </div>
            <div className="sm:h-6 sm:border-gray-500 sm:border-l-2 m-2"></div>
            <div className="text-center">
              <h4 className="text-lg font-semibold">Best Service</h4>
              <p>Easy Global Shipping with us!</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-500 mt-8 mx-4 h-[40vh]">
          Hello
        </div>

        <div className="flex flex-col sm:flex-row justify-center mt-8 mx-4 sm:justify-around">
          <button className="bg-gray-900 hover:bg-white hover:text-black hover:border-2 hover:border-black text-white py-2 px-4 rounded-lg w-full sm:w-1/3 h-24 text-2xl font-bold my-2">
            Track your order
          </button>
          <button className="bg-gray-900 hover:bg-white hover:text-black hover:border-2 hover:border-black text-white  py-2 px-4 rounded-lg w-full sm:w-1/3 h-24 text-2xl font-bold my-2">
            Login
          </button>
        </div>
      </div>

      <div className='h-screen'>
        <div className='mx-4'>
          <h1 className='head_text mb-4'>Find Your Companion!</h1>
          <p className='mt-2 font-semibold text-xl'>Search through various categories!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {bookCategories.slice(0, 6).map((book, index) => (
            <div
              key={index}
              className='bg-white p-4 m-4 rounded-lg border-2 border-gray-400 flex flex-col items-center hover:bg-black hover:text-white cursor-pointer'
            >
              <div className='text-2xl mb-2 hover:text-white'>{<book.icon />}</div>
              <h2 className='text-lg font-semibold hover:text-white'>{book.label}</h2>
              <p className='text-sm text-gray-600 hover:text-white'>{book.description}</p>
            </div>
          ))}
        </div>

        <div className='mx-4 mt-6'>
          <p className='mt-2 font-semibold text-xl'>Search through various Authors!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {AuthorsList.slice(0, 6).map((author, index) => (
            <div
              key={index}
              className="bg-white p-4 m-4 rounded-lg border-2 border-gray-400 flex flex-col hover:bg-black hover:text-white cursor-pointer"
            >
              <div className="text-xl mb-2 font-bold hover:text-white">{author.name}</div>
              <p className="text-gray-600 mb-2 hover:text-white">{author.genres.join(", ")}</p>
              <p className="text-sm text-gray-600 hover:text-white">{author.criteria}</p>
            </div>
          ))}
        </div>

        <div className='mx-4 mt-6'>
          <p className='mt-2 font-semibold text-xl'>Select a book based on rating!</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {rating.map((rat, index) => (
            <div key={index} className="bg-white p-4 m-4 rounded-lg border-2 border-gray-400 flex flex-col hover:bg-black hover:text-white cursor-pointer">
              <div className="text-lg mb-2 font-semibold">{rat.ratings}</div>
            </div>
          ))}
        </div>
      </div>


      <div className=''>
        <div className='mx-4'>
          <h1 className='head_text mb-4'>Our Top Selling!</h1>
        </div>

        <div className="border-2 border-gray-500 mt-8 mx-4 flex-grow h-[25vh]">
          Hello
        </div>

        <div className="mt-8 mx-4 border-2 p-4 rounded-xl border-gray-400 mb-8">
          <h2 className="text-xl mb-2">Subscribe to Newsletter</h2>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full border border-gray-900 rounded-l focus:outline-none"
            />
            <button className="bg-gray-900 text-white px-4 rounded-r-xl">Subscribe</button>
          </div>
        </div>
        <div className="bg-gray-900 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center h-24">
            <p>&copy; 2023 ReadersRealm. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-gray-400"><FaInstagram /></Link>
              <Link href="#" className="hover:text-gray-400"><FaSnapchat /></Link>
              <Link href="#" className="hover:text-gray-400"><FaFacebook /></Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
