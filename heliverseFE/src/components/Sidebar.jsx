import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './cards';

const Sidebar = () => {
  const [uniqueDomains, setUniqueDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [isAvailable, setIsAvailable] = useState(null);
  const [queryString, setQueryString] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users`);
      const result = response.data;

      // Extract unique domains
      const domains = result.user.map((user) => user.domain);
      const fetchedDomains = [...new Set(domains)];
      setUniqueDomains(fetchedDomains);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update queryString when selected options change
    const options = [];
    if (selectedDomains.length > 0) {
      options.push(`domain=${selectedDomains.join(',')}`);
    }
    if (selectedGenders.length > 0) {
      options.push(`gender=${selectedGenders.join(',')}`);
    }
    if (isAvailable !== null) {
      options.push(`available=${isAvailable}`);
    }

    setQueryString(options.join('&'));
  }, [selectedDomains, selectedGenders, isAvailable]);

  const handleCheckboxChange = (domain) => {
    const updatedDomains = [...selectedDomains];

    // Toggle the domain in the selected domains list
    if (updatedDomains.includes(domain)) {
      updatedDomains.splice(updatedDomains.indexOf(domain), 1);
    } else {
      updatedDomains.push(domain);
    }

    setSelectedDomains(updatedDomains);
  };

  const handleGenderChange = (gender) => {
    const updatedGenders = [...selectedGenders];

    // Toggle the gender in the selected genders list
    if (updatedGenders.includes(gender)) {
      updatedGenders.splice(updatedGenders.indexOf(gender), 1);
    } else {
      updatedGenders.push(gender);
    }

    setSelectedGenders(updatedGenders);
  };

  const handleTrueAvailabilityChange = () => {
    setIsAvailable((prev) => (prev === true ? null : true));
  };
  
  const handleFalseAvailabilityChange = () => {
    setIsAvailable((prev) => (prev === false ? null : false));
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="bg-slate-600 text-white w-1/6 h-screen p-4 sticky top-0">
        <h1 className="text-3xl font-bold mb-4">Filters</h1>
        <h2 className="text-lg font-bold mb-4">Domains</h2>
        {uniqueDomains.map((domain, index) => (
          <div className="mb-4" key={index}>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-200"
                onChange={() => handleCheckboxChange(domain)}
                checked={selectedDomains.includes(domain)}
              />
              <span className="ml-2">{domain}</span>
            </label>
          </div>
        ))}
        <h2 className="text-lg font-bold mb-4">Genders</h2>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-200"
              onChange={() => handleGenderChange('Male')}
              checked={selectedGenders.includes('Male')}
            />
            <span className="ml-2">Male</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-200"
              onChange={() => handleGenderChange('Female')}
              checked={selectedGenders.includes('Female')}
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
        <h2 className="text-lg font-bold mb-4">Availability</h2>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-200"
              onChange={handleTrueAvailabilityChange}
              checked={isAvailable === true}
            />
            <span className="ml-2">True</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-blue-200"
              onChange={handleFalseAvailabilityChange}
              checked={isAvailable === false}
            />
            <span className="ml-2">False</span>
          </label>
        </div>
      </aside>
      <main className="flex-1">
        <Cards queryString={queryString} />
      </main>
    </div>
  );
};

export default Sidebar;
