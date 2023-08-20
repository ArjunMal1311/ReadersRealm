import React from 'react'
import getAllBooks from '../actions/getAllBooks';
import Card from '../components/Card';

const page = async () => {
    const book = await getAllBooks();

    return (
        <div className='mx-auto md:px-6 sm:px-2 mt-10'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {book.map((book: any) => (
                    <div className='flex-col' key={book.id}>
                        <Card
                            data={book}
                            actionId={book.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page