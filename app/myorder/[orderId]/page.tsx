import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getOrderById from "@/app/actions/getOrder";
import OrderInformation from "@/app/components/OrderInformation";

interface Params {
    orderId?: string;
}

const ordersPage = async ({ params }: { params: Params }) => {
    const order = await getOrderById(params)
    const user = await getCurrentUser()

    return (
        <div>
            {order ? <div>
                <OrderInformation order={order} user={user} />
            </div> : <div>
                <h4 className="text-4xl purple_gradient m-2">No Order Found!</h4>
            </div>}
        </div>
    );
}

export default ordersPage;


