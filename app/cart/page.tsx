import Link from 'next/link';
import getBookbyId from '../actions/getBookbyID';
import getCart from '../actions/getCart';
import { getCurrentUser } from '../actions/getCurrentUser';
import CartItems from '../components/CartItems';

const CartPage = async () => {
  const data = await getCart();
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen py-8">
      {user ? <>
        <div className="mx-4 bg-white p-8 rounded border-2 border-black">
          <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

          <CartItems cartItems={data} />

        </div></> : <>
        <div className='m-6'>
          <h2 className='text-4xl purple_gradient font-bold mb-8'>Login to view your Cart!</h2>
          <Link href="/login" className='mt-8 border-2 p-4 rounded-lg'>Login</Link>
        </div></>}

    </div>
  );
};

export default CartPage;
