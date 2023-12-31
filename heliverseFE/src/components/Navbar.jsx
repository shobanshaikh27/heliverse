import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [findUser, setFindUser] = useState('');

  const searchUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://heliverse-internship.onrender.com/api/users/?first_name=${findUser}`);
      const result = response.data;
      setUserData(result.user);
      console.log(result.user)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async (page) => {
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-bold">HELIVERSE</div>
     
        <div className="md:justify-center sm:justify-center lg:flex flex-grow mx-12 justify-end">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-white hover:text-gray-300  focus:text-gray-300 focus:outline-none"
            >
              Users
            </Link>
            <Link
              to="/teams"
              className="text-white hover:text-gray-300 focus:text-gray-300 focus:outline-none"
            >
              Teams
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
