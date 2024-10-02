import React from 'react';
import Header from '../Header/Index';
import Footer from '../Footer/Footer';
import ResturantList from '../Resturant/ResturantList';
import Search from '../../pages/Search';
import LocationTracter from '../../pages/LocationTracter';

const Home = () => {
  return (
    <div className='flex flex-col min-h-screen'> {/* Ensure full height to allow scrolling */}
      <Header  className=" fixed top-0"/>
      <main className='flex-grow px-4'> {/* Main content area that can grow */}
        <Search />
        <LocationTracter />
        <ResturantList />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
