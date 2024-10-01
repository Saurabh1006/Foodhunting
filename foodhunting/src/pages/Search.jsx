import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
const Search = () => {
  return (
    <div>
       <form
        // onSubmit={handleSearch}
        className='flex gap-2 md:gap-4 max-w-[560px] w-[90%] mx-auto mt-6'
      >
        <input
          type='search'
          name='search'
          id='search'
          placeholder='Search for Chicken Biriyani'
          className='p-2 px-4 rounded-md border outline-none focus-within:border-orange-400 border-gray-200 grow w-full'
        //   ref={serachRef}
        />
        <button
          type='submit'
          className='bg-orange-400 basis-2/12 text-center text-white p-2 flex justify-center gap-2 items-center md:px-8 rounded-md text-sm md:text-base'
        > 
          <MagnifyingGlassIcon className='w-4 h-4' />{' '}
          <span className='hidden md:block'>Search</span>
        </button>
        </form>
    </div>
  )
}

export default Search
