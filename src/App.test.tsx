import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { Tax } from "./components/tax";

jest.mock("@tanstack/react-query", () => ({
  QueryClient: jest.fn(),
  QueryClientProvider: ({ children }: { children: ReactNode }) => children,
}));

jest.mock("react-hot-toast", () => ({
  Toaster: jest.fn().mockReturnValue(null),
}));

jest.mock("./components/tax", () => ({
  Tax: jest.fn().mockReturnValue(null),
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("renders Toaster with correct props", () => {
    render(<App />);
    expect(Toaster).toHaveBeenCalledWith({ position: "bottom-center" }, {});
  });

  it("renders Tax component", () => {
    render(<App />);
    expect(Tax).toHaveBeenCalled();
  });
});
