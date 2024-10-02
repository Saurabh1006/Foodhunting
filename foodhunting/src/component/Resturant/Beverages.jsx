import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import BeveragesJsonData from '../../assets/JsonData/Beverages.json'; // Import JSON data
import ShimmerCard from './ShimmerCard';

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
                to={`/beverages/${beverage.itemId}`} // Use beverage.itemId for routing
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
        <h1 className='my-4 mt-8 font-bold text-2xl text-zinc-700 flex justify-center items-center'>
        See All
        </h1>
      </div>
    </div>
  );
};

export default Beverages;
