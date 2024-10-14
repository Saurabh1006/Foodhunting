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

  // Load addresses from localStorage on component mount
  useEffect(() => {
    const storedAddresses = localStorage.getItem('addresses');
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
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
    <div className="max-w-4xl mx-auto p-4 font-sans">
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

        {/* Price Details Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">PRICE DETAILS</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price (1 item)</span>
              <span>₹979</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-green-600">₹49 FREE</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹3</span>
            </div>
            <div className="border-t pt-2 font-semibold flex justify-between">
              <span>Total Payable</span>
              <span>₹982</span>
            </div>
          </div>
          <p className="text-green-600 mt-4">Your Total Savings on this order ₹2,117</p>
          <div className="mt-4 flex items-start space-x-2 text-gray-600">
            <FaShieldAlt className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
