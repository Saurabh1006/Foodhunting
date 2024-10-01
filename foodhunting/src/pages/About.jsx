import React from 'react'

const About = () => {
  return (
    <div>
       <div className='container-max py-16  text-center min-h-[80vh]'>
        <img
          src='https://www.shopurfood.com/blogs/wp-content/uploads/2022/06/How-to-Retain-in-the-Future-of-Online-Food-Delivery-industry.jpg'
          alt=''
          className='w-full max-w-[480px] mx-auto rounded-lg'
        />

        <div className='w-[90%] max-w-[480px] mx-auto'>
          <h1 className='text-3xl my-4'>Foody 🍔</h1>

          <p>
            Foody is a food ordering web application built with React.js ⚛ and
            Swiggy's API.
          </p>
          <p>
            This project was built 🔧 during the coursework of{' '}
            <a
              className='text-orange-600'
              href='https://namastedev.com/namaste-react/'
            >
              Namaste React
            </a>{' '}
            taught by{' '}
            <a
              className='text-orange-600'
              href='https://www.linkedin.com/in/akshaymarch7/'
            >
              Akshay Saini
            </a>
          </p>

          {/* <p>count1 : {this.state.count}</p>
          <p>count2 : {this.state.count2}</p> */}
          <button
            className='border my-2 bg-gray-50 p-2 px-4 rounded-md'
            // onClick={() => {
            //   this.setState({
            //     count: this.state.count + 1,
            //   });
            // }}
          >
            click me
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
