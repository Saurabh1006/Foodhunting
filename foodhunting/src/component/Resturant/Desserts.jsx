import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Ensure this is imported
import dessertsData from '../../assets/JsonData/dessert.json';
import ShimmerCard from './ShimmerCard';

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
                            <Link
                                to={`/desserts/${dessert.itemId}`} // Use dessert.itemId for unique IDs
                                className='hover:scale-95 transition ease-in-out duration-300 relative z-10'
                                key={i}
                            >
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <img src={dessert.imageUrl} alt={dessert.name} className="w-full h-32 object-cover" />
                                    <div className="p-4">
                                    <h3 className="font-bold text-lg">{dessert.name}</h3>
                                    <p className="text-sm text-gray-600">{dessert.description}</p>
                                    <p className="text-sm text-green-600 font-semibold">Price: ${dessert.price.toFixed(2)}</p>
                                    <p className="text-sm text-yellow-500">Rating: {dessert.rating} ★</p>

                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No desserts found!</p>
                    )}
                </div>
                <h1 className='my-4 mt-8 font-bold text-2xl text-zinc-700 flex justify-center items-center'>
        See All
        </h1>
            </div>
        </div>
    );
};

export default desserts;
