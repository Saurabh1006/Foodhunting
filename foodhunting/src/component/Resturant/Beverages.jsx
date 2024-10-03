import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import BeveragesJsonData from '../../assets/JsonData/Beverages.json'; // Import JSON data
import ShimmerCard from './ShimmerCard';
import { useNavigate } from 'react-router-dom';
const Beverages = () => {
  const [data, setData] = useState(BeveragesJsonData.beverages); // Access 'beverages' array from the JSON
  const [isLoading, setLoading] = useState(true);

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
              <Link
                to={`/Beverages/${beverage.itemId}`} // Use beverage.itemId for routing
                className="hover:scale-95 transition ease-in-out duration-300 relative z-10"
                key={i}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img src={beverage.imageUrl} alt={beverage.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{beverage.name}</h3>
                    <p className="text-sm text-gray-600">{beverage.description}</p>
                    <p className="text-sm text-green-600 font-semibold">${beverage.price}</p>
                    <p className="text-sm text-yellow-500">Rating: {beverage.rating} ★</p>
                  </div>
                </div>
              </Link>
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
