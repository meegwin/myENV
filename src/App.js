import Navbar from "./components/Navbar";
import "./App.scss";
import Weather from "./components/Weather";
import ChartWave from "./components/ChartWave";
import { useEffect, useState } from "react";
import { getListCountries, getWeatherByCountry } from "./Services";
function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [currentWeather, setCurrentWeather] = useState({});

  useEffect(() => {
    getListCountries().then((res) => {
      const data = res?.data;
      if (data) setSelectedCountry(data[0]);
      return setCountries(data || []);
    });
  }, []);

  useEffect(() => {
    const country = countries.find(
      (item) => item.iso2 === selectedCountry.iso2
    );
    if (country) {
      getWeatherByCountry(country.lat, country.long).then((res) => {
        let weather;
        if (res) {
          weather = { ...res, weatherDetail: res.weather[0] };
        }
        return setCurrentWeather(weather || {});
      });
    }
  }, [selectedCountry, countries]);

  const handleOnChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="app">
      <Navbar onChange={handleOnChange} countries={countries}></Navbar>
      <div className="home__screen">
        <div className="home__screen__top">
          <Weather weather={currentWeather} />
        </div>
      </div>
      <div className="home__screen__bottom">
        <ChartWave />
      </div>
    </div>
  );
}

export default App;
