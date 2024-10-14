import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import necessary hooks
import { addToCart } from '../../redux/cartSlice';

const AllProductList = () => {
  const [products, setProducts] = useState({
    dessert: [],
    Beverages: [],
    Main_Course: [],
  });
  const [isLoading, setLoading] = useState(true);
  
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const cart = useSelector(state => state.cart); // Get the cart state from Redux

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate loading time

      try {
        const menuData = await import('../../assets/JsonData/Main_Course.json');
        const beveragesData = await import('../../assets/JsonData/Beverages.json');
        const dessertsData = await import('../../assets/JsonData/dessert.json');

        // Set products in the state
        setProducts({
          dessert: dessertsData.desserts.flatMap(category => category.items),
          Beverages: beveragesData.beverages,
          Main_Course: menuData.menu.flatMap(category => category.items),
        });
      } catch (error) {
        console.error("Error loading JSON data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to add product to cart
  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); // Dispatch the action to add to cart
    console.log(`${product.name} has been added to the cart!`);
  };
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container-max flex flex-col">
      <h1 className="my-4 mt-8 font-bold text-2xl text-zinc-700">All Products</h1>

      {Object.entries(products).map(([category, items]) => (
        <div key={category} className="mt-8 flex">
          <h2 className="font-bold text-xl text-zinc-700 justify-self-start items-start">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-10">
            {items.length > 0 ? (
              items.map(product => (
                <div key={product.itemId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <Link to={`/${category}/${product.itemId}`} className="hover:scale-95 transition ease-in-out duration-300">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <p className="text-sm text-green-600 font-semibold">${product.price}</p>
                      <p className="text-sm text-yellow-500">Rating: {product.rating} ★</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      ))}

      {/* Display cart items or total count */}
      {/* <div className="mt-8">
        <h3 className="font-bold text-lg">Cart Items: {cart.length}</h3>
        {cart.map(item => (
          <div key={item.itemId} className="p-2 border-b">
            {item.name} - ${item.price}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default AllProductList;
