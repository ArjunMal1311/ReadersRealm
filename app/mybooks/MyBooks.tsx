"use client"

import Card from "../components/Card"
import { SafeListing, SafeUser } from "../components/types"

interface BooksProps {
    books: SafeListing[]
    currentUser?: SafeUser | null
}

const MyBooks: React.FC<BooksProps> = ({ books, currentUser }) => {
    return (
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
    )
}

export default MyBooks