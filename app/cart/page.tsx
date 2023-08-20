import getBookbyId from '../actions/getBookbyID';
import getCart from '../actions/getCart';

const CartPage = async () => {
  const cartItems = await getCart();

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="mx-4 bg-white p-8 rounded border-2 border-black">
        <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
        {cartItems ? (
          <div>
            {cartItems.map(async (item) => {
              const book = await getBookbyId({ bookId: item.id });

              return (
                <div key={item.id} className="mb-4 p-4 border border-gray-300 rounded">
                  <p className="text-lg font-semibold">Item ID: {item.id}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  {book ? (
                    <div>
                      <p className="text-lg font-semibold">Book Information:</p>
                      <p>Title: {book.title}</p>
                      <p>Author: {book.author}</p>
                      {/* Display other book information here */}
                    </div>
                  ) : (
                    <p className="text-red-500">Book not found</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-gray-500">No Items found in Cart</div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
