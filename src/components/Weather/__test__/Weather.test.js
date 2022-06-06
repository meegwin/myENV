import { render, screen } from "@testing-library/react";
import Weather from "..";

describe("Weather component", () => {
  it("should binding weather to UI", () => {
    const weather = {
      coord: {
        lon: 65,
        lat: 33,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      base: "stations",
      main: {
        temp: 303.55,
        feels_like: 301.65,
        temp_min: 303.55,
        temp_max: 303.55,
        pressure: 1004,
        humidity: 8,
        sea_level: 1004,
        grnd_level: 837,
      },
      visibility: 10000,
      wind: {
        speed: 3.47,
        deg: 242,
        gust: 2.5,
      },
      clouds: {
        all: 0,
      },
      dt: 1654501648,
      sys: {
        country: "AF",
        sunrise: 1654475488,
        sunset: 1654526763,
      },
      timezone: 16200,
      id: 1138714,
      name: "Kajrān",
      cod: 200,
    };
    render(<Weather weather={weather} />);
    const psiElement = screen.getByText("301.65");
    expect(psiElement).toBeInTheDocument();
  });

  it("should render 4 weather info detail columns", () => {
    const { container } = render(<Weather />);
    expect(
      container.getElementsByClassName("weather__info__detail__column").length
    ).toBe(4);
  });
});
