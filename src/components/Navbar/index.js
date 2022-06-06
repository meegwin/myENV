import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../Navbar/Navbar.scss";
const Navbar = ({ countries, onChange }) => {
  const handleOnChange = (event) => {
    const country = countries.find((i) => i.iso2 === event);
    if (country) onChange(country);
  };

  return (
    <div className="navbar">
      <FontAwesomeIcon size="xl" icon={faBars} />
      <div className="navbar__location">
        <span>myENV</span>
        <select
        data-testid="navbar"
          className="navbar__location__select"
          id="countries"
          onChange={(e) => handleOnChange(e.target.value)}
        >
          {countries?.map((country, i) => {
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
