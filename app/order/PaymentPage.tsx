"use client"
import { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const PaymentForm = ({ cartItems }: any) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const router = useRouter();
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [shippingInfo, setShippingInfo] = useState('');

    const handleShippingInfoChange = (event: any) => {
        setShippingInfo(event.target.value);
    };

    const handlePayment = async (event: any) => {
        event.preventDefault();

        setIsProcessing(true);
        setPaymentError(null);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const randomSuccess = Math.random() > 0.5;


        var price = 0;
        {
            cartItems.map((item: any) => (
                price = price + item.bookName.price * item.quantity
            ))
        }

        if (randomSuccess) {
            setPaymentSuccess(true);
            axios.post('/api/order', { shippingInfo, orderItems: cartItems, paymentInfo: 'Card', itemsPrice: price, orderStatus: 'pending' }).then(() => {
                toast.success('Order placed Successfully!')
                router.push("/")
            }).catch(() => {
                toast.error('Something went wrong.');
            })

        } else {
            setPaymentError('Payment failed. Please try again.');
        }

        setIsProcessing(false);
    };

    return (
        <div>
            <form onSubmit={handlePayment} className="w-[35vw]  border-2 p-4 rounded-2xl">
                <div className='mb-8'>
                    <div className="mb-2 font-bold text-xl">Shipping Information</div>
                    <input
                        type="text"
                        id="shippingInfo"
                        name="shippingInfo"
                        placeholder='Add your Shipping Information'
                        value={shippingInfo}
                        onChange={handleShippingInfoChange}
                        className="p-2 border rounded mb-2 w-full"
                    />
                </div>

                <div className="mb-4 ">
                    <label htmlFor="card-element" className="mb-8 head_text block font-bold">
                        Card details
                    </label>
                    <div id="card-element" className="p-2 border rounded mb-8">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                    },
                                },
                            }}
                        />
                    </div>
                </div>

                {paymentError && <div className="text-red-500">{paymentError}</div>}
                {paymentSuccess && <div className="text-green-500">Payment successful!</div>}

                <button type="submit" disabled={isProcessing} className="btn border-2 px-2 py-1 rounded-lg hover:bg-gray-200 flex justify-center items-center w-full">
                    {isProcessing ? 'Processing...' : 'Pay'}
                </button>
            </form>
        </div>
    );
};

const PaymentPage = ({ cartItems }: any) => {
    const stripePromise = loadStripe(process.env.STRIPE_KEY as string);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Elements stripe={stripePromise}>
                <PaymentForm cartItems={cartItems} />
            </Elements>
        </div>
    );
};

export default PaymentPage;
