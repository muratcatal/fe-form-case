import { setIn } from "final-form";
import { validateFormValues } from ".";

jest.mock("final-form", () => ({
  setIn: jest.fn(),
}));

describe("validateFormValues", () => {
  // any is used here because the schema object is a complex object
  // would be find a better way to type this
  let schema: any;

  beforeEach(() => {
    schema = {
      validateSync: jest.fn(),
    };
  });

  it("should return no errors when schema validation passes", async () => {
    const values = {};
    const validate = validateFormValues(schema);
    const errors = await validate(values);

    expect(schema.validateSync).toHaveBeenCalledWith(values, {
      abortEarly: false,
    });
    expect(errors).toEqual(undefined);
  });

  it("should return the correct error when schema validation fails", async () => {
    const values = {};
    const error = { inner: [{ path: "path", message: "error message" }] };
    schema.validateSync.mockImplementation(() => {
      throw error;
    });

    const validate = validateFormValues(schema);
    const errors = await validate(values);

    expect(schema.validateSync).toHaveBeenCalledWith(values, {
      abortEarly: false,
    });
    expect(setIn).toHaveBeenCalledWith({}, "path", "error message");
    expect(errors).toEqual(undefined);
  });
});
