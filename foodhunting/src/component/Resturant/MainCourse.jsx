import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainData from '../../assets/JsonData/Main_Course.json';
import ShimmerCard from './ShimmerCard';
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux'; // Import necessary hooks
import { addToCart } from '../../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
const MainCourse = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Simulating network delay
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1 second delay
      setData(mainData.menu[0].items); // Set the data after the delay
      setLoading(false);
    };

    fetchData();
  }, []);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleAllProduct=()=>{
    navigate('/allproduct');
  }
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

  // Slice the data to show only the first 9 items
  const displayedData = data.slice(0, 9);

  return (
    <div>
      <div className='container-max flex flex-col'>
        <h1 className='my-4 mt-8 font-bold text-2xl text-zinc-700 flex justify-start items-start'>
          Main Courses
        </h1>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-4'>
  {isLoading ? (
    Array.from({ length: 9 }).map((_, i) => <ShimmerCard key={i} />) // Show shimmer effect while loading
  ) : displayedData.length > 0 ? (
    displayedData.map((item) => (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden relative" key={item.itemId}>
        {/* Link to the item detail page */}
        <Link
          to={`/Main_Course/${item.itemId}`}
          className='hover:scale-95 transition ease-in-out duration-300 relative z-10'
        >
          <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm text-green-600 font-semibold">${item.price}</p>
            <p className="text-sm text-yellow-500">Rating: {item.rating} ★</p>
          </div>
        </Link>

        {/* Button outside of the Link */}
        <div className="p-4">
          <button
            onClick={() => handleAddToCart(item)}
            className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No main courses found!</p>
  )}
</div>

      </div>
      <div className="mt-4 bg-orange-100 p-2 rounded text-center hover:bg-orange-400 transition ease-in-out duration-500 cursor-pointer mt-4" onClick={handleAllProduct}>
  <h1 className='my-2 font-bold text-2xl text-zinc-700'>
    See All
  </h1>
</div>
    </div>
  );
};

export default MainCourse;
