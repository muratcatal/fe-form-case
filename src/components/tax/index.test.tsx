import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Tax } from ".";
import { useTaskSave } from "../../services/use-tax-save";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock("../../services/use-tax-save", () => ({
  useTaskSave: jest.fn(),
}));

describe("Tax", () => {
  beforeEach(() => {
    (useTaskSave as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue("Task saved successfully"),
    });
  });

  it("renders without crashing", () => {
    render(<Tax />);
    expect(screen.getByText(/username/i)).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", {
        name: /countries/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/tax/i)).toBeInTheDocument();
  });

  it("should not submit form for empty values", async () => {
    render(<Tax />);
    fireEvent.click(
      screen.getByRole("button", {
        name: /save/i,
      })
    );
    await waitFor(() => {
      expect(useTaskSave().mutateAsync).not.toHaveBeenCalled();
    });
  });
});
