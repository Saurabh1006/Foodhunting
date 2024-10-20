import React from 'react'
import { MdCheckCircle } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const handleDone = () => {
        navigate('/');
    }
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-2xl">
      {/* Background shape */}
      <div className="absolute inset-0 bg-white rounded-3xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-5xl"></div>

      {/* Content */}
      <div className="relative bg-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="flex flex-col items-center">
          <MdCheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">Your Order Is Confirmed!</h1>
          <p className="text-gray-600 text-center mb-8">Thanks For Your Order</p>
          <button className="bg-blue-100 text-blue-700 px-8 py-2 rounded-full font-semibold hover:bg-blue-200 transition-colors" onClick={handleDone}>
            DONE
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 -ml-16 -mt-12 hidden sm:block">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="8" fill="#E6EFFF" />
          <rect x="16" y="16" width="48" height="48" rx="4" fill="#CCE0FF" />
          <rect x="24" y="24" width="32" height="32" rx="2" fill="#B3D1FF" />
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 -mr-16 -mb-12 hidden sm:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60Z" fill="#E6EFFF" />
          <path d="M100 60C100 82.0914 82.0914 100 60 100C37.9086 100 20 82.0914 20 60C20 37.9086 37.9086 20 60 20C82.0914 20 100 37.9086 100 60Z" fill="#CCE0FF" />
          <path d="M80 60C80 71.0457 71.0457 80 60 80C48.9543 80 40 71.0457 40 60C40 48.9543 48.9543 40 60 40C71.0457 40 80 48.9543 80 60Z" fill="#B3D1FF" />
        </svg>
      </div>

      {/* Person illustration */}
      <div className="absolute right-0 bottom-0 mr-4 mb-4 hidden sm:block">
        <svg width="120" height="160" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 85C74.9117 85 87 72.9117 87 58C87 43.0883 74.9117 31 60 31C45.0883 31 33 43.0883 33 58C33 72.9117 45.0883 85 60 85Z" fill="#4B5563" />
          <path d="M60 160C93.1371 160 120 133.137 120 100H0C0 133.137 26.8629 160 60 160Z" fill="#4B5563" />
          <rect x="44" y="110" width="32" height="50" rx="4" fill="#E5E7EB" />
          <rect x="50" y="118" width="20" height="30" rx="2" fill="#9CA3AF" />
        </svg>
      </div>
    </div>
  </div>
  )
}

export default OrderConfirmation
