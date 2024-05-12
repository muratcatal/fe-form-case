import { fireEvent, render, screen } from "@testing-library/react";
import { Field } from "react-final-form";
import { FormField } from ".";

jest.mock("react-final-form", () => ({
  Field: jest
    .fn()
    .mockImplementation(({ render }) => render({ input: {}, meta: {} })),
}));

describe("FormField", () => {
  const mockComponent = <input data-testid="mockComponent" />;
  const mockProps = {
    name: "testName",
    label: "testLabel",
    component: mockComponent,
    placeholder: "testPlaceholder",
    isAutocomplete: false,
  };

  it("renders without crashing", () => {
    render(<FormField {...mockProps} />);
    expect(screen.getByTestId("mockComponent")).toBeInTheDocument();
  });

  it("renders the correct label", () => {
    render(<FormField {...mockProps} />);
    expect(screen.getByText("testLabel")).toBeInTheDocument();
  });

  it("renders the correct component", () => {
    render(<FormField {...mockProps} />);
    expect(screen.getByTestId("mockComponent")).toBeInTheDocument();
  });

  it("renders the error message when submitFailed and error are true", () => {
    (Field as jest.Mock).mockImplementationOnce(({ render }) =>
      render({ input: {}, meta: { submitFailed: true, error: "testError" } })
    );
    render(<FormField {...mockProps} />);
    expect(screen.getByText("testError")).toBeInTheDocument();
  });

  it("handles onChange event when isAutocomplete is false", () => {
    const mockOnChange = jest.fn();
    (Field as jest.Mock).mockImplementationOnce(({ render }) =>
      render({ input: { onChange: mockOnChange }, meta: {} })
    );
    render(<FormField {...mockProps} />);
    fireEvent.change(screen.getByTestId("mockComponent"), {
      target: { value: "test" },
    });
    expect(mockOnChange).toHaveBeenCalledWith("test");
  });
});
