import { render, screen } from "@testing-library/react";
import Navbar from "../index";

describe("Navbar", () => {
  it("renders myEnv link", () => {
    render(<Navbar />);
    const linkElement = screen.getByText(/myEnv/i);
    expect(linkElement).toBeInTheDocument();
  });
});
