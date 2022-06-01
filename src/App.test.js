import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Navbar", () => {
  it("renders PSI", () => {
    render(<App />);
    const linkElement = screen.getByText(/PSI/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render 1 chart wave day", () => {
    const { container } = render(<App />);
    expect(container.getElementsByClassName("Chart__Wave__Day").length).toBe(1);
  });
});
