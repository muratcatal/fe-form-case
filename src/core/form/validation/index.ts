import { setIn } from "final-form";
import { AnyObject, ObjectSchema, ValidationError } from "yup";
export const validateFormValues =
  <T>(schema: ObjectSchema<AnyObject, AnyObject, AnyObject, any>) =>
  async (values: T) => {
    try {
      await schema.validateSync(values, { abortEarly: false });
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const errors = err.inner.reduce((formError, innerError) => {
          return setIn(formError, innerError.path ?? "", innerError.message);
        }, {});

        return errors;
      } else {
        throw err;
      }
    }
  };
