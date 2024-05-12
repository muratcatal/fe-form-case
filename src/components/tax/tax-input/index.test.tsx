import { render, screen } from "@testing-library/react";
import { useFormState } from "react-final-form";
import { TAX_EXPRESSION } from "../constants/tax-expression";
import { TaxInput } from "./index";

jest.mock("react-final-form", () => ({
  useFormState: jest.fn(),
}));

const mockUseFormState = useFormState as jest.Mock;

describe("TaxInput", () => {
  beforeEach(() => {
    mockUseFormState.mockReturnValue({ values: {} });
  });

  it("renders without crashing", () => {
    render(<TaxInput />);
    expect(screen.getByLabelText("Tax")).toBeInTheDocument();
  });

  it("renders MaskedInput with correct props", () => {
    mockUseFormState.mockReturnValue({
      values: { country: { code: "US" } },
    });
    render(<TaxInput />);
    expect(screen.getByLabelText("Tax")).toHaveAttribute(
      "mask",
      TAX_EXPRESSION.US
    );
  });

  it("calculates taxMaskValues correctly", () => {
    mockUseFormState.mockReturnValue({
      values: { country: { code: "UNKNOWN" } },
    });
    render(<TaxInput />);
    expect(screen.getByLabelText("Tax")).toHaveAttribute(
      "mask",
      TAX_EXPRESSION.NO_EXPRESSION
    );
  });

  it("disables MaskedInput when there is no country code", () => {
    render(<TaxInput />);
    expect(screen.getByLabelText("Tax")).toBeDisabled();
  });
});
