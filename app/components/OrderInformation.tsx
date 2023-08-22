import React from 'react';

const OrderDetails = ({ order, user }: any) => {
    return (
        <div className="bg-white shadow-md p-6 rounded-lg max-w-md mx-auto mt-8 border-gray-300 border-2">
            {user.id === order.userId ? <><h2 className="text-4xl font-bold mb-4">Order Details</h2>
                <div className="mb-4">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                    <p><strong>Shipping Info:</strong> {order.shippingInfo}</p>
                </div>
                <div className="mb-4 border-2 border-gray-300 p-4 rounded-xl">
                    <h3 className="text-2xl font-bold mb-2">Items</h3>
                    <p className="text-lg font-semibold">Book Information:</p>
                    {order.orderItems.map((item: any) => (
                        <div className='border-b-2 border-gray-200 py-2'>
                            <p>Title: {item.bookName.title}</p>
                            <p>Author: {item.bookName.author}</p>
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <p><strong>Payment Info:</strong> {order.paymentInfo}</p>
                    <p><strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}</p>
                </div>
                <div className="mb-4">
                    <p><strong>Items Price:</strong> ${order.itemsPrice}</p>
                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                </div>
                <div className="mb-4">
                    <p><strong>User ID:</strong> {order.userId}</p>
                </div></> : <div>
                You are not allowed to access this resource
            </div>}

        </div>
    );
};

export default OrderDetails;
