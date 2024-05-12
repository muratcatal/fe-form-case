import { render, screen } from "@testing-library/react";
import { Form as RFinalForm } from "react-final-form";
import { Form } from "./index";

jest.mock("react-final-form", () => ({
  Form: jest
    .fn()
    .mockImplementation(({ render }) =>
      render({ handleSubmit: jest.fn(), form: {} })
    ),
}));

jest.mock("./styled", () => ({
  FormWrapper: jest.fn(({ children, onSubmit }) => (
    <form onSubmit={onSubmit}>{children}</form>
  )),
}));

describe("Form", () => {
  it("renders without crashing", () => {
    render(<Form>{null}</Form>);
    expect(RFinalForm).toHaveBeenCalled();
  });

  it("renders its children", () => {
    render(
      <Form>
        <div>Child</div>
      </Form>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("assigns the form instance to the ref if a ref is provided", () => {
    const ref = { current: null };
    render(<Form ref={ref}>{null}</Form>);
    expect(ref.current).not.toBeNull();
  });
});
