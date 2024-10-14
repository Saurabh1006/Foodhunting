import React from "react";
import {
  Bars3Icon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  PhoneIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../../redux/cartSlice";
import { useEffect } from "react";


const Index = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLoginClick = () => {
    // Add your login logic here
    navigate("/login");
  };
  // Access the cart item
  const cartItems = useSelector(selectTotalItems);
  console.log("cartItems", cartItems);

  // Check if user is logged in (exists in localStorage)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      setIsUserLoggedIn(true); // User found, hide login button
    }
  }, []);


  //   Calculate total item in the cart
  // const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  //  open drawer
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen); // Toggle drawer state
  };
  const handleAboutClicked = () => {
    navigate("/about");
  };

  return (
    <header className="flex items-center sticky w-full top-0 bg-white z-20  border-b shadow-sm border-gray-100 h-[60px] px-4">
      <div className="container-max flex justify-between items-center flex-wrap w-full">
        <div className="flex items-center gap-2 md:gap-4">
          <div>{/* Logo can go here */}</div>
          <button className="text-xs md:text-sm flex items-center gap-1">
            <MapPinIcon className="w-4 h-4 text-gray-700" />
            <ChevronDownIcon className="w-4 h-4 text-orange-500" />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="text-zinc-700 ml-auto gap-2 md:gap-4 items-center hidden md:flex">
          {/* <li>
            <Link
              to="/search"
              className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <MagnifyingGlassIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Search</p>
            </Link>
          </li> */}
          <li>
            <Link
              to="/"
              className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <HomeIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Home</p>
            </Link>
          </li>
          <li>
            <div
              onClick={handleAboutClicked}
              className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <BuildingOfficeIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">About</p>
            </div>
          </li>
          <li>
            <NavLink
              to="/contact_us"
              className="p-2 md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <PhoneIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Contact</p>
            </NavLink>
          </li>
          <li>
            <Link
              to="/cart"
              className="p-2 relative md:px-4 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
              <ShoppingBagIcon className="w-4 h-4 text-gray-700" />
              <p className="hidden md:block">Cart</p>
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cartItems}
                </span>
              )}
            </Link>
          </li>
          <li>
            <button className="ml-4 bg-orange-400 text-white p-2 px-4 rounded-md items-center gap-2 hidden md:flex">
               more
            </button>
          </li>
        </ul>

        {/* Login Button */}
        {!isUserLoggedIn && (
        <button
          onClick={handleLoginClick}
          className="ml-4 bg-orange-400 text-white p-2 px-4 rounded-md items-center gap-2 hidden md:flex"
        >
          Login
        </button>
      )}

        {/* Mobile Menu Button */}
        <button className="block md:hidden" onClick={toggleDrawer}>
          <Bars3Icon className="w-6 h-6" />
        </button>
        {/*  mobile Drawer */}
        <div
          className={`fixed top-0 left-0 w-64 h-full bg-white z-50  transition-transform duration-300  transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            } shadow-lg`}
        >
          <div className=" flex flex-row">
            <h1 className="absolute top-4 left-4 text-orange-600">FoodHunting</h1>
            <button
              onClick={toggleDrawer}
              className="absolute top-4 right-4 text-gray-400"
            >
              <MdCancel className="w-6 h-6" />
            </button>

          </div>
          {/* Close Button */}

          {/* Drawer Links */}
          <ul className="flex flex-col mt-20 space-y-4">
            <li>
              <Link
                to="/"
                onClick={toggleDrawer} // Close the drawer when clicked
                className="p-4 hover:bg-gray-100 flex items-center gap-2"
              >
                <HomeIcon className="w-5 h-5 text-gray-700" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <div
                onClick={() => {
                  handleAboutClicked();
                  toggleDrawer(); // Close drawer on click
                }}
                className="p-4 hover:bg-gray-100 flex items-center gap-2"
              >
                <BuildingOfficeIcon className="w-5 h-5 text-gray-700" />
                <span>About</span>
              </div>
            </li>
            <li>
              <NavLink
                to="/contact_us"
                onClick={toggleDrawer} // Close the drawer when clicked
                className="p-4 hover:bg-gray-100 flex items-center gap-2"
              >
                <PhoneIcon className="w-5 h-5 text-gray-700" />
                <span>Contact</span>
              </NavLink>
            </li>
            <li>
              <Link
                to="/cart"
                onClick={toggleDrawer} // Close the drawer when clicked
                className="relative p-4 hover:bg-gray-100 flex items-center gap-2"
              >
                <ShoppingBagIcon className="w-5 h-5 text-gray-700" />
                <span>Cart</span>

                {/* Badge for total cart items */}
                {cartItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItems}
                  </span>
                )}
              </Link>

            </li>
            <li>
              <NavLink className="relative p-4 hover:bg-gray-100 flex items-center gap-2">
              <span>more</span>
              </NavLink>
            </li>
          </ul>
        </div>


      </div>
    </header>
  );
};

export default Index;
