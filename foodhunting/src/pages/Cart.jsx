import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice'; // Adjust the import path as necessary
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart); // Get cart items from Redux

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item)); // Dispatch remove action
    console.log(`${item.name} has been removed from the cart!`);
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity(item)); // Dispatch increase quantity action
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(decreaseQuantity(item)); // Dispatch decrease quantity action
    } else {
      handleRemoveFromCart(item); // Remove item if quantity is 1
    }
  };

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const salesTax = subtotal * 0.08; // Example: 8% sales tax
  const total = subtotal + salesTax;

  return (
    <div className="min-h-screen bg-gray-100">
    <header className="bg-blue-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Solo Stove</div>
          <nav className="hidden md:flex space-x-4">
            {/* <a href="#" className="hover:underline">Fire Pits</a>
            <a href="#" className="hover:underline">Pizza Oven</a>
            <a href="#" className="hover:underline">Grill</a>
            <a href="#" className="hover:underline">Camp Stoves</a>
            <a href="#" className="hover:underline">Corporate Sales</a> */}
          </nav>
          <div className="flex items-center space-x-4">
            <input type="text" placeholder="Search" className="p-2 rounded text-black" />
            <FaUser className="h-6 w-6" />
            <MdOutlineShoppingCart className="h-6 w-6" />
          </div>
        </div>
      </header>
    <main className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart ({cart.length} items)</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cart.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-600">No items in the cart.</td>
              </tr>
            ) : (
              cart.map(item => (
                <tr key={item.itemId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-20 w-20 rounded-full bg-gray-200  ">
                        <img className="h-full w-full object-cover " src={item.image} alt={item.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <button onClick={() => handleDecreaseQuantity(item)} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <FaMinus className="h-5 w-5" />
                      </button>
                      <span className="mx-2 text-gray-800">{item.quantity}</span>
                      <button onClick={() => handleIncreaseQuantity(item)} className="text-gray-500 hover:text-gray-700 transition-colors">
                        <FaPlus className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Subtotal:</span>
          <span className="text-gray-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Sales Tax:</span>
          <span className="text-gray-800">${salesTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold mt-4">
          <span className="text-gray-800">Grand total:</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
          Check out
        </button>
      </div>
    </main>
    </div>
  );
};

export default Cart;
