import { object, string } from "yup";
import { validateFormValues } from "../../../core/form/validation";

const validationSchema = object().shape({
  username: string()
    .min(3, "Username must be at least 3 characters")
    .required("Name is required"),
  country: object().shape({
    code: string().required("Country is required"),
  }),
  tax: string().required("Tax is required"),
});

const validate = validateFormValues<{
  username: string;
  country: {
    code: string;
  };
  tax: string;
}>(validationSchema);

export { validate };
