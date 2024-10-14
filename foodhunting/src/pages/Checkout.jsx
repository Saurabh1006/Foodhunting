// src/components/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { 
  FaCheck, 
  FaEdit, 
  FaHome, 
  FaBriefcase, 
  FaPlusCircle, 
  FaShieldAlt, 
  FaChevronDown, 
  FaChevronUp,
  FaTimes
} from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Checkout() {
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [conversionRate, setConversionRate] = useState(1); // Added state for conversion rate
  const [loading, setLoading] = useState(true); // State for loading status

  // Access cart items from Redux store
  const cart = useSelector((state) => state.cart);

  // Calculate total number of items and subtotal
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Dynamic Delivery Charge Calculation
  const calculateDeliveryCharges = (subtotal) => {
    if (subtotal > 1000) {
      return 0; // Free delivery for orders above ₹1000
    } else if (subtotal > 500) {
      return 49; // ₹49 delivery fee for orders between ₹500 and ₹1000
    } else {
      return 99; // ₹99 delivery fee for orders below ₹500
    }
  };

  // Define additional charges (these can be dynamic based on your requirements)
  const deliveryCharges = calculateDeliveryCharges(subtotal);
  const platformFee = 3; // Fixed platform fee
  const salesTax = subtotal * 0.08; // 8% sales tax
  const grandTotal = (subtotal + deliveryCharges + platformFee + salesTax) * conversionRate;

  // Example savings calculation (customize as needed)
  const totalSavings = 2117; // You can make this dynamic based on discounts applied

  // Load addresses from localStorage and fetch conversion rate on component mount
  useEffect(() => {
    const storedAddresses = localStorage.getItem('addresses');
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }

   // Fetch the conversion rate from the API
   fetch('https://api.exchangerate-api.com/v4/latest/USD') // Replace with your API URL
   .then(response => response.json())
   .then(data => {
     console.log(data); // Log the entire response to inspect its structure
     if (data.rates && data.rates.INR) { // Check if rates and INR exist
       setConversionRate(data.rates.INR); // Correctly access INR conversion rate
     } else {
       console.error("INR conversion rate not found in the response");
     }
     setLoading(false); // Set loading to false once the data is fetched
   })
   .catch(error => {
     console.error("Error fetching conversion rate:", error);
     setLoading(false);
   });

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new address to the addresses array
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    
    // Store the updated addresses in localStorage
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    
    // Reset form and close it
    setNewAddress({ name: '', phone: '', address: '', city: '', state: '', pincode: '' });
    setShowNewAddressForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans"
    
    >
     <header className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-orange-200 p-4 rounded-lg shadow">
        <div className="flex items-center mb-4 sm:mb-0">
          <svg className="w-8 h-8 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-xl font-bold text-blue-600">FoodHunting</span>
        </div>
        <nav>
          <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
        </nav>
      </header>
      {loading ? (
        <p>Loading...</p> // Loading state
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Login Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-blue-600 font-bold mr-2">1</span>
                  <span className="font-semibold">LOGIN</span>
                  <span className="text-green-600 ml-2"><FaCheck /></span>
                </div>
                <button className="text-blue-600">CHANGE</button>
              </div>
              <div className="mt-2">
                <p className="font-semibold">Saurabh Verma</p>
                <p className="text-gray-600">+916386621006</p>
              </div>
            </div>

            {/* Delivery Address Section */}
            <div className="bg-blue-600 p-4 rounded-lg text-white">
              <div className="flex items-center">
                <span className="font-bold mr-2">2</span>
                <span className="font-semibold">DELIVERY ADDRESS</span>
              </div>
            </div>

            {/* Address List */}
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              {addresses.slice(0, showAllAddresses ? addresses.length : 2).map((addr, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <input type="radio" name="address" className="mt-1" defaultChecked={index === 0} />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <p className="font-semibold">{addr.name} <span className="text-gray-600">{addr.phone}</span></p>
                      {index === 0 && <button className="text-blue-600"><FaEdit /></button>}
                    </div>
                    <p className="text-sm text-gray-600">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    {index === 0 && (
                      <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded">
                        DELIVER HERE
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {!showAllAddresses && addresses.length > 2 && (
                <button 
                  className="text-blue-600 flex items-center"
                  onClick={() => setShowAllAddresses(true)}
                >
                  View all {addresses.length} addresses <FaChevronDown className="w-4 h-4 ml-1" />
                </button>
              )}
              {showAllAddresses && (
                <button 
                  className="text-blue-600 flex items-center"
                  onClick={() => setShowAllAddresses(false)}
                >
                  Hide addresses <FaChevronUp className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>

            {/* Add New Address */}
            {!showNewAddressForm ? (
              <button 
                className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg flex items-center justify-center"
                onClick={() => setShowNewAddressForm(true)}
              >
                <FaPlusCircle className="w-5 h-5 mr-2" />
                Add a new address
              </button>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Add New Address</h3>
                  <button onClick={() => setShowNewAddressForm(false)} className="text-gray-500">
                    <FaTimes />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={newAddress.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    value={newAddress.address}
                    onChange={handleInputChange}
                    placeholder="Address (House No, Building, Street, Area)"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full p-2 border rounded"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="pincode"
                    value={newAddress.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className="w-full p-2 border rounded"
                    required
                  />
                  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Save Address
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="mt-4">
              <p className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{(subtotal * conversionRate).toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery Charges</span>
                <span>₹{deliveryCharges}</span>
              </p>
              <p className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹{platformFee}</span>
              </p>
              <p className="flex justify-between">
                <span>Sales Tax (8%)</span>
                <span>₹{salesTax.toFixed(2)}</span>
              </p>
              <hr className="my-2" />
              <p className="flex justify-between font-bold">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
