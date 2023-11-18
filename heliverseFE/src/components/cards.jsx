import { useState, useEffect } from 'react';
import axios from 'axios';

// Your functional component
function Cards() {
  
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/');
      const result = response.data
      console.log(result)
      setUserData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
  fetchData();
  }, []); 

  return (
    <>
    <div>
      <h1>User Data</h1>
       <ul>
        {Object.values(userData).map((userArray, id) => (
        <li key={id}>
        <ul>
          {Object.values(userArray).map((user, index) => (
            <li key={index}>{user.first_name}
            </li>
          ))}
        </ul>
      </li>
    ))}
  </ul>
    </div>
    </>
  );
}
export default Cards;