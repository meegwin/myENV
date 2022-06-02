import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getListCountries, getWeatherByCountry } from "../../Services";
import "../Navbar/Navbar.scss";
const Navbar = () => {
  const [countries, setCountries] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    const country = countries.find(
      (item) => item.iso2 === selectedCountry.iso2
    );
    if (country) {
      getWeatherByCountry(selectedCountry.lat, selectedCountry.long).then(
        (res) => setCurrentWeather(res?.data || {})
      );
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    getListCountries().then((res) => {
      const data = res?.data;
      if (data) setSelectedCountry(data[0]);
      return setCountries(data || []);
    });
  }, []);

  const handleOnChange = (event) => {
    const country = countries.find((i) => i.iso2 === event);
    if (country) setSelectedCountry(country);
  };

  return (
    <div className="navbar">
      <FontAwesomeIcon size="xl" icon={faBars} />
      <div className="navbar__location">
        <span>myENV</span>
        <select className="navbar__location__select" id="countries" onChange={(e) => handleOnChange(e.target.value)}>
          {countries.map((country, i) => {
            return (
              <option
                data-testid={`country-${i + 1}`}
                key={country.iso2}
                value={country.iso2}
              >
                {country.name}
              </option>
            );
          })}
        </select>
      </div>
      <FontAwesomeIcon size="xl" icon={faBell} />
    </div>
  );
};

export default Navbar;
