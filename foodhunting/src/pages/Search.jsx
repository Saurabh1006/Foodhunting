import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Search = () => {
  const [query, setQuery] = useState(''); // State for search input
  const [filteredResults, setFilteredResults] = useState([]); // State for filtered results
  const [allData, setAllData] = useState([]); // State to store all the combined JSON data

  // Asynchronous function to import JSON data
  const fetchJsonData = async () => {
    try {
      const mainCourseData = await import('../assets/JsonData/Main_Course.json');
      const beveragesData = await import('../assets/JsonData/Beverages.json');
      const dessertsData = await import('../assets/JsonData/dessert.json');

      const mainCourseItems = mainCourseData.menu.flatMap((category) => category.items);
      const beveragesItems = beveragesData.beverages;
      const dessertsItems = dessertsData.desserts.flatMap((category) => category.items);

      const combinedData = [...mainCourseItems, ...beveragesItems, ...dessertsItems];
      setAllData(combinedData); // Store combined data in state
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  };

  // Fetch JSON data when the component mounts
  useEffect(() => {
    fetchJsonData();
  }, []);

  // Function to search through the JSON data
  const handleSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setQuery(inputValue);

    if (inputValue === '') {
      // Clear search results if input is empty
      setFilteredResults([]);
    } else {
      // Filter data based on the search input
      const results = allData.filter(item =>
        item.name.toLowerCase().includes(inputValue)
      );
      setFilteredResults(results); // Update the filtered results
    }
  };

  // Function to clear the search input and results
  const clearSearch = () => {
    setQuery(''); // Clear the input
    setFilteredResults([]); // Clear the search results
  };

  return (
    <div className='w-full max-w-md mx-auto p-4 bg-gray-50 rounded-lg shadow-md"'>
      {/* Search Form */}
      <form className='flex gap-2 md:gap-4 max-w-[560px] w-[90%] mx-auto mt-6 relative'>
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search for Chicken Biriyani'
          value={query} // Bind input value to state
          onChange={handleSearch} // Call handleSearch when input changes
          className='p-2 px-4 rounded-md border outline-none focus-within:border-orange-400 border-gray-200 grow w-full'
        />
        {/* Clear Button (only visible when there's input) */}
        {query && (
          <button
            type='button'
            onClick={clearSearch} // Call clearSearch when clicked
            className='absolute right-12 top-2.5 text-gray-400 hover:text-gray-600'
          >
          
          </button>
        )}
        <button
          type='submit'
          className='bg-orange-400 basis-2/12 text-center text-white p-2 flex justify-center gap-2 items-center md:px-8 rounded-md text-sm md:text-base'
        >
          <MagnifyingGlassIcon className='w-4 h-4' />
          <span className='hidden md:block'>Search</span>
        </button>
      </form>

      {/* Search Results */}
      <div className='mt-4 max-w-[560px] w-[90%] mx-auto'>
        {filteredResults.length > 0 ? (
          <div className="flex flex-col items-center p-2 bg-white rounded-md shadow-sm">
            {filteredResults.map((item) => (
              <div key={item.itemId} className='p-2 hover:bg-gray-100 rounded-md'>
             
                {item.name}
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          query && <p>No results found for "{query}".</p> // Show this message if no results
        )}
      </div>
    </div>
  );
};

export default Search;
