import React from 'react';
import {
    Bars3Icon,
    BuildingOfficeIcon,
    ChevronDownIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PhoneIcon,
    ShoppingBagIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const Index = () => {
    const handleLoginClick = () => {
        // Add your login logic here
        loginWithRedirect();
    };

    return (
        <div>
            <header className='sticky w-full top-0 bg-white z-20 py-4 border-b shadow-sm border-gray-100 h-[60px]'>
                <div className='container-max flex justify-between items-center'>
                    <div className='flex items-center gap-2 md:gap-4'>
                        <div>
                        
                        </div>
                        {/* <Logo /> */}
                        <button className='text-xs md:text-sm flex items-center gap-1'>
                            <MapPinIcon className='w-4 h-4 text-gray-700' />
                            {/* {address?.city} */}
                            <ChevronDownIcon className='w-4 h-4 text-orange-500' />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <ul className='text-zinc-700 ml-auto gap-2 md:gap-4 items-center hidden md:flex'>
                        <li>
                            <Link
                                to='/search'
                                className='p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2'
                            >
                                <MagnifyingGlassIcon className='w-4 h-4 text-gray-700' />
                                <p className='hidden md:block'>Search</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/'
                                className='p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2'
                            >
                                <HomeIcon className='w-4 h-4 text-gray-700' />
                                <p className='hidden md:block'>Home</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/about'
                                className='p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2'
                            >
                                <BuildingOfficeIcon className='w-4 h-4 text-gray-700' />
                                <p className='hidden md:block'>About</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/contact'
                                className='p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2'
                            >
                                <PhoneIcon className='w-4 h-4 text-gray-700' />
                                <p className='hidden md:block'>Contact</p>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/cart'
                                className='p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2'
                            >
                                <ShoppingBagIcon className='w-4 h-4 text-gray-700' />
                                <p className='hidden md:block'>Cart</p>
                                {/* Uncomment below to display items count */}
                                {/* <p className='absolute -top-1 -right-1 bg-orange-500 text-white flex justify-center items-center w-5 h-5 text-xs rounded-full'>
                                    {items.length}
                                </p> */}
                            </Link>
                        </li>
                    </ul>

                    {/* Login Button */}
                    <button
                        onClick={handleLoginClick}
                        className='ml-4 bg-orange-400 text-white p-2 px-4 rounded-md items-center gap-2 hidden md:flex'
                    >
                        Login
                    </button>

                    {/* Mobile Menu Button */}
                    <button className='block md:hidden'>
                        <Bars3Icon className='w-6 h-6' />
                    </button>
                </div>
            </header>
        </div>
    );
};

export default Index;
