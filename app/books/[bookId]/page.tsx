import getBookbyId from "@/app/actions/getBookbyID";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getReviews from "@/app/actions/getReviews";
import BookInformation from "@/app/components/BookInformation";

interface Params {
    bookId?: string;
}

const ListingPage = async ({ params }: { params: Params }) => {

    const book = await getBookbyId(params);
    const currentUser = await getCurrentUser();
    const review = await getReviews(params)

    return (
        <div>
            {book ? <div>
                <BookInformation user={currentUser} book={book} review={review} />
            </div> : <div>
                <h4 className="text-4xl purple_gradient m-2">No Book Found!</h4>
            </div>}
        </div>
    );
}

export default ListingPage;


