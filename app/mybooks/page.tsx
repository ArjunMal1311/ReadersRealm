import React from 'react'
import { getCurrentUser } from '../actions/getCurrentUser'
import Link from 'next/link'
import getBooks from '../actions/getBooks'
import MyBooks from './MyBooks'

const page = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className='m-6'>
        <h2 className='text-4xl purple_gradient font-bold mb-8'>Login to view your Books!</h2>
        <Link href="/login" className='mt-8 border-2 p-4 rounded-lg'>Login</Link>
      </div>
    )
  }

  const Books = await getBooks();

  return (
    <>

      {!Books ? <div className='m-6'>
        <h2 className='text-4xl purple_gradient font-bold mb-8'>No Books found!</h2>
        <Link href="/" className='mt-8 border-2 p-4 rounded-lg'>Add a Book!</Link>
      </div> : <div className='m-3'>
        <MyBooks books={Books} currentUser={user} />
      </div>}
    </>
  )
}

export default page