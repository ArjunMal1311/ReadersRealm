import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getOrderById from "@/app/actions/getOrder";
import OrderInformation from "@/app/components/OrderInformation";
import Link from "next/link";

interface Params {
    orderId?: string;
}

const ordersPage = async ({ params }: { params: Params }) => {
    const order = await getOrderById(params)
    const user = await getCurrentUser()

    return (
        <div>
            {user ? <>
                {order ? <div>
                    <OrderInformation order={order} user={user} />
                </div> : <div>
                    <h4 className="text-4xl purple_gradient m-2">No Order Found!</h4>
                </div>}</> : <>
                <div>
                    <div className='m-6'>
                        <h2 className='text-xl purple_gradient font-bold mb-8'>Unauthorized Access!</h2>
                        <h2 className='text-4xl purple_gradient font-bold mb-8'>Login to view your orders!</h2>
                        <Link href="/login" className='mt-8 border-2 p-4 rounded-lg'>Login</Link>
                    </div>
                </div>
            </>}

        </div>
    );
}

export default ordersPage;


