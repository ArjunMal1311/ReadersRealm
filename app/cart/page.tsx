import getBookbyId from '../actions/getBookbyID';
import getCart from '../actions/getCart';
import CartItems from '../components/CartItems';

const CartPage = async () => {
  const data = await getCart();


  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="mx-4 bg-white p-8 rounded border-2 border-black">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>

        <CartItems cartItems={data} />

      </div>
    </div>
  );
};

export default CartPage;
