import Link from "next/link"
import { getCurrentUser } from "../actions/getCurrentUser"
import getUserReview from "../actions/getUserReviews"
import UserReview from "../components/UserReview"

const page = async () => {
    const reviews = await getUserReview()
    const user = await getCurrentUser();

    return (
        <div>
            {user ? <><UserReview reviews={reviews} /></> : <><div className='m-6'>
                <h2 className='text-4xl purple_gradient font-bold mb-8'>Login to view your Reviews!</h2>
                <Link href="/login" className='mt-8 border-2 p-4 rounded-lg'>Login</Link>
            </div></>}

        </div>
    )
}

export default page