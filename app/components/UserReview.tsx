"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { SafeReview } from "./types";

interface UserReview {
    reviews: SafeReview[] | null
}

const UserReview: React.FC<UserReview> = ({ reviews }) => {
    const router = useRouter();
    const deleteReview = (id: string) => {
        axios.delete(`/api/review/${id}`).then(() => {
            router.refresh()
        }).catch((error) => {
            throw new Error(error)
        })
    }


    useEffect(() => {
        console.log(reviews)
    }, [])
    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">User Reviews</h2>
            <div>
                {reviews ? <>{reviews.map((item: SafeReview) => (
                    <div key={item.id} className="mb-2 p-2 border rounded-lg flex justify-between items-center hover:bg-gray-300 cursor-pointer">
                        <div>
                            <p className="text-gray-800">{item.comment}</p>
                            <div className="flex items-center mt-2">
                                <span className="text-gray-600 text-sm">
                                    Rating: {item.rating}
                                </span>
                            </div>
                        </div>

                        <div onClick={() => deleteReview(item.id)}>
                            <AiOutlineDelete size={28} />
                        </div>
                    </div>
                ))}</> : <div className="text-2xl font-bold text-gray-300">No reviews Found</div>}

            </div>
        </div>
    );
};

export default UserReview;
