import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Navbar/Navbar.scss";
const Navbar = () => {
  const [countries, setCountries] = useState([]);
  const [currentWeather, setCurrentWeather] = useState({});

  const getCurrentWeather = (lat, lon) => {
    const apiKey = "f9f93450e1dde06077e16331ddb37383";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
      .then((res) => {
        setCurrentWeather(res.data.data);
      });
  };

  const getListCountries = async () => {
    const data = await fetch(
      "https://countriesnow.space/api/v0.1/countries/positions"
    ).then((res) => res.json());
    setCountries(data.data);
    getCurrentWeather(data.data[0].lat, data.data[0].long);
  };

  useEffect(() => {
    getListCountries();
  }, []);

  const handleOnChange = (event) => {
    const country = countries.find((i) => i.iso2 === event);
    if (country) {
      getCurrentWeather(country.lat, country.long);
    }
  };

  return (
    <div className="Navbar">
      <FontAwesomeIcon size="xl" icon={faBars} />
      <div className="Navbar__Location">
        <span>myENV</span>
        <select id="countries" onChange={(e) => handleOnChange(e.target.value)}>
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
