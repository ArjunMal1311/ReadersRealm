"use client"

import axios from "axios"
import Card from "../components/Card"
import { SafeListing, SafeUser } from "../components/types"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

interface BooksProps {
    books: SafeListing[]
    currentUser?: SafeUser | null
}


const MyBooks: React.FC<BooksProps> = ({ books, currentUser }) => {
    const router = useRouter();
    const deleteItem = (id: string) => {
        axios.delete(`/api/book/${id}`).then(() => {
            router.refresh();
        }).catch((error) => toast.error("Error"))
        .finally(() => toast.success("Deleted Successfully"));
    }
    return (
        <div className='mx-auto md:px-6 sm:px-2 mt-10'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {books.map((book: SafeListing) => (
                    <div className='flex-col' key={book.id}>
                        <Card
                            data={book}
                            actionId={book.id}
                        />
                        <button className="text-orange-400 flex justify-center w-full mt-2 border-2 rounded-b-lg hover:bg-gray-400" onClick={() => deleteItem(book.id)}>Delete</button>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default MyBooks