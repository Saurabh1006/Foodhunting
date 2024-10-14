import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported
import dessertsData from '../../assets/JsonData/dessert.json';
import ShimmerCard from './ShimmerCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import necessary hooks
import { addToCart } from '../../redux/cartSlice';
const desserts = () => {
    // Access the correct array from the imported data
    const [data, setData] = useState(dessertsData.desserts[0].items || []); // Access items array
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (data.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [data]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAllProduct = () => {
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
                    Desserts
                </h1>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-4'>
  {isLoading ? (
    Array.from({ length: 9 }).map((_, i) => <ShimmerCard key={i} />)
  ) : displayedData.length !== 0 ? (
    displayedData.map((dessert, i) => (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={i}>
        {/* Link to the dessert detail page */}
        <Link
          to={`/dessert/${dessert.itemId}`}
          className='hover:scale-95 transition ease-in-out duration-300 relative z-10'
        >
          <img src={dessert.imageUrl} alt={dessert.name} className="w-full h-32 object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-lg">{dessert.name}</h3>
            <p className="text-sm text-gray-600">{dessert.description}</p>
            <p className="text-sm text-green-600 font-semibold">Price: ${dessert.price.toFixed(2)}</p>
            <p className="text-sm text-yellow-500">Rating: {dessert.rating} ★</p>
          </div>
        </Link>

        {/* Add to Cart button outside the Link but still inside the card */}
        <div className="p-4">
          <button
            onClick={() => handleAddToCart(dessert)} // Make sure to pass 'dessert' object to the handler
            className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))
  ) : (
    <p>No desserts found!</p>
  )}
</div>

                <div className="mt-4 bg-orange-100 p-2 rounded text-center hover:bg-orange-400 transition ease-in-out duration-500 cursor-pointer mt-4" onClick={handleAllProduct}>
                    <h1 className='my-2 font-bold text-2xl text-zinc-700'>
                        See All
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default desserts;
