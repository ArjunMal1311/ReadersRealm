import React from 'react'
import { getCurrentUser } from '../actions/getCurrentUser'
import Book from './Book';

const page = async () => {
    const user = await getCurrentUser();

    return (
        <div>
            <Book user={user} />
        </div>
    )
}

export default page