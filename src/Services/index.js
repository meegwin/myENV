export const getListCountries = async () => {
  const res = await fetch(
    "https://countriesnow.space/api/v0.1/countries/positions"
  );
  return res.json();
};

export const getWeatherByCountry = async (lat, lon) => {
  const apiKey = "f9f93450e1dde06077e16331ddb37383";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );
  return res.json();
};
