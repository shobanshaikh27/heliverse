import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FlipCardList from './FLipCardList';

function Cards({ queryString }) {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [findUser, setFindUser] = useState('');
  const visiblePages = 10;
  const usersPerPage = 20;
  const fetchData = async (page) => {
    try {
      const response = await axios.get(`https://heliverse-internship.onrender.com/api/users/?page=${page}&finduser=${findUser}&${queryString}`);
      // console.log("cards query",queryString)
      const result = response.data;
      setUserData(result.user);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const totalPages = Math.ceil(userData.length / usersPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return userData.slice(startIndex, endIndex);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, findUser, queryString]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfVisible = Math.floor(visiblePages / 2);
    let start = currentPage - halfVisible;
    let end = currentPage + halfVisible;

    if (start < 1) {
      start = 1;
      end = Math.min(visiblePages, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 border rounded focus:outline-none ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center space-x-4 mb-4 p-2 bg-slate-500">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/4 px-4 py-2 rounded-md focus:outline-none focus:shadow-outline-gray"
            value={findUser}
            onChange={(e) => setFindUser(e.target.value)}
          />
          <button
            onClick={() => fetchData(currentPage)}
            className="bg-slate-900 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">User Data</h1>

        {userData.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <FlipCardList userData={getCurrentPageData()} />
        )}

        <div className="mt-4 flex space-x-2 justify-center items-center mb-4">{renderPageNumbers()}</div>
      </div>
    </>
  );
}

export default Cards;
