import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import '../Navbar/Navbar.scss';
const Navbar = () => {
    return (
      <div className="Navbar">
        <FontAwesomeIcon size="xl" icon={faBars} />
      <div className="Navbar__Location">
        <span>myENV</span>
        <span>Current location</span>
      </div>
      <FontAwesomeIcon size="xl" icon={faBell} />
      </div>
    )
}

export default Navbar