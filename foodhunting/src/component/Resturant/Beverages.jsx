import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import BeveragesJsonData from '../../assets/JsonData/Beverages.json'; // Import JSON data
import ShimmerCard from './ShimmerCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import necessary hooks
import { addToCart } from '../../redux/cartSlice';
const Beverages = () => {
  const [data, setData] = useState(BeveragesJsonData.beverages); // Access 'beverages' array from the JSON
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart); 

  useEffect(() => {
    if (data.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [data]);
  const navigate = useNavigate();
    const handleAllProduct=()=>{
        navigate('/allproduct');
      }

  const displayedData = data.slice(0, 9); // Display first 9 items
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the action to add to cart
    // Get the existing cart from localStorage or initialize an empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the new product to the cart
    cart.push(product);
  
    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(`${product.name} has been added to the cart!`);
  };

  return (
    <div>
      <div className="container-max flex flex-col">
      <h1 className='my-4 mt-8 font-bold text-2xl text-zinc-700 flex justify-start items-start'>
          Beverages
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-4">
  {isLoading ? (
    Array.from({ length: 9 }).map((_, i) => <ShimmerCard key={i} />) // Adjust shimmer count to 9
  ) : displayedData.length !== 0 ? (
    displayedData.map((beverage, i) => (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={i}>
        {/* Link for the beverage details */}
        <Link
          to={`/Beverages/${beverage.itemId}`}
          className="hover:scale-95 transition ease-in-out duration-300 relative z-10"
        >
          <img src={beverage.imageUrl} alt={beverage.name} className="w-full h-32 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-lg">{beverage.name}</h3>
            <p className="text-sm text-gray-600">{beverage.description}</p>
            <p className="text-sm text-green-600 font-semibold">${beverage.price}</p>
            <p className="text-sm text-yellow-500">Rating: {beverage.rating} ★</p>
          </div>
        </Link>

        {/* "Add to Cart" button outside the Link but inside the card */}
        <div className="p-4">
          <button
            onClick={() => handleAddToCart(beverage)} // Pass the correct beverage object
            className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No beverages found!</p>
  )}
</div>

        <div className="mt-4 bg-orange-100 p-2 rounded text-center hover:bg-orange-400 transition ease-in-out duration-500 cursor-pointer mt-4"
        onClick={handleAllProduct}
        >
  <h1 className='my-2 font-bold text-2xl text-zinc-700'>
    See All
  </h1>
</div>


      </div>
    </div>
  );
};

export default Beverages;
