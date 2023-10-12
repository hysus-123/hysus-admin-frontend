import React, { useState, useEffect } from 'react';

function CascadingDropdown() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Create an array of selected countries.
    const selectedCountries = ['India', 'Canada']; // Add the countries you want here.

    fetch('https://restcountries.com/v3.1/all')
      .then((response) => 
      
          response.json()
        // console.log(response.json().data);
        
        )
      .then((data) => {
        console.log(data);
        const filteredCountries = data.filter((country) =>
          selectedCountries.includes(country.name.common)
        );
        setCountries(filteredCountries);
      })
      .catch((error) => {
        console.error('Error fetching country data: ', error);
      });
  }, []);

  useEffect(() => {

    if (selectedCountry) {

      const dataForSelectedCountry = {
        USA: {
          states: ['New York', 'California'],
          cities: ['New York City', 'Los Angeles'],
        },
        Canada: {
          states: ['Ontario', 'Quebec'],
          cities: ['Toronto', 'Montreal'],
        },
        India: {
          states: ['Delhi', 'Haryana'],
          cities: ['New Delhi', 'Gurgaon'],
        },
        // Add more countries and their states/cities as needed.
      };

      setStates(dataForSelectedCountry[selectedCountry].states || []);
    } else {
      setStates([]); // Clear the states when no country is selected.
    }
  }, [selectedCountry]);

  useEffect(() => {

    if (selectedState) {
      const dataForSelectedState = {
        Ontario: ['Toronto', 'Ottawa'],
        Quebec: ['Montreal', 'Quebec City'],
        Delhi: ['New Delhi', 'Gurugram'],
        Haryana: ['Faridabad', 'Panipat'],
      };

      setCities(dataForSelectedState[selectedState] || []);
    } else {
      setCities([]); 
    }
  }, [selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState('');
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
    <div>
      <select onChange={handleCountryChange} value={selectedCountry}>
        <option value="">Select a Country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.name.common}>
            {<img src={country.flags.png} alt={country.name} width="16" height="16" />} {country.name.common}
          </option>
        ))}
      </select>

      <select onChange={handleStateChange} value={selectedState}>
        <option value="">Select a State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select>
        <option value="">Select a City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CascadingDropdown;
