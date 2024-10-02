import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainData from '../../assets/JsonData/Main_Course.json';
import ShimmerCard from './ShimmerCard';

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
              <Link
                to={`/courses/${item.itemId}`} // Link to the item detail page
                className='hover:scale-95 transition ease-in-out duration-300 relative z-10'
                key={item.itemId} // Use itemId as the key for better uniqueness
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.description}</p>
                   
                    <p className="text-sm text-green-600 font-semibold">${item.price}</p>
                    <p className="text-sm text-yellow-500">Rating: {item.rating}  ★</p>
                  </div>
                  
                </div>
              </Link>
           
            ))
           
          ) : (
            <p>No main courses found!</p>
          )}
        </div>
      </div>
      <h1 className='my-4 mt-8 font-bold text-2xl text-zinc-700 flex justify-center items-center'>
        See All
        </h1>
    </div>
  );
};

export default MainCourse;
