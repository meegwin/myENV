import { faDroplet, faPlus, faTemperatureHigh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Weather.scss';

function Weather() {
  return (
    <div className="weather">
    <div className="weather__info">
      <img
        className="weather__info__img--cloud"
        src="https://openweathermap.org/img/wn/04d@2x.png"
        alt="cloud"
      />
      <div>
        <h1>Clouds</h1>
        <div className="d-flex align-items-center flex-row justify-content-between">
          <p>
            <FontAwesomeIcon icon={faTemperatureHigh} />
            123C
          </p>
          <p>
            <FontAwesomeIcon icon={faDroplet} />
            12
          </p>
        </div>
      </div>
    </div>
    <div className="weather__info__detail">
      <div className="weather__info__detail__column">
        <div>PSI</div>
        <div className="weather__info__PSI">312</div>
        <div>Good</div>
      </div>
      <div className="weather__info__detail__column">
        <div>Rain</div>
        <div>89</div>
        <div>mm</div>
      </div>
      <div className="weather__info__detail__column">
        <div>DENGUE</div>
        <div className="weather__info__dengue"></div>
      </div>
      <div className="weather__info__detail__column">
        <div className="mb-2">
          <FontAwesomeIcon icon={faPlus} size="xl" color="#000" />
        </div>
        <div>Add</div>
      </div>
    </div>
  </div>
  )
}

export default Weather