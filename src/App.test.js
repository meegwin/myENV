import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Navbar from "./components/Navbar";

describe("Navbar", () => {
  it("renders PSI", () => {
    render(<App />);
    const linkElement = screen.getByText(/PSI/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render 1 chart wave day", () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName("chart__wave__p--day").length).toBe(
      1
    );
  });

  it("should call onChange prop when changed", () => {
    const countries = [
      {
        name: "Afghanistan",
        iso2: "AF",
        long: 65,
        lat: 33,
      },
      {
        name: "Albania",
        iso2: "AL",
        long: 20,
        lat: 41,
      },
    ];
    const handleChange = jest.fn();
    render(<Navbar onChange={handleChange} countries={countries}></Navbar>);
    fireEvent.change(screen.getByTestId("navbar"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
