import Image from 'next/image'
import { bookCategories, rating } from './components/ItemsList/CategoriesList'
import { AuthorsList } from './components/ItemsList/AuthorsList'
import { FaFacebook, FaInstagram, FaSnapchat } from 'react-icons/fa'
import Link from "next/link"
import getAllBooks from './actions/getAllBooks'
import Card from './components/Card'

export default async function Home() {
  const books = await getAllBooks()
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

        <div>
          <div className='mx-auto md:px-6 sm:px-2 mt-10'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {books.map((book: any) => (
                <div className='flex-col' key={book.id}>
                  <Card
                    data={book}
                    actionId={book.id}
                  />
                </div>
              ))}
            </div>
          </div>
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
              <h2 className='text-lg font-semibold '>{book.label}</h2>
              <p className='text-sm'>{book.description}</p>
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
              <div className="text-xl mb-2 font-bold ">{author.name}</div>
              <p className="mb-2 ">{author.genres.join(", ")}</p>
              <p className="text-sm">{author.criteria}</p>
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

      <div className='mx-4'>Hlello</div>
    </div >
  )
}
