import { forwardRef } from "react";
import {
  Form as RFinalForm,
  FormProps as RFinalFormProps,
} from "react-final-form";
import { FormWrapper } from "./styled";

type FormProps = Omit<RFinalFormProps, "render"> & {
  children: React.ReactNode;
};

export const Form = forwardRef(({ children, ...props }: FormProps, ref) => {
  return (
    <RFinalForm
      // since we are using forwardRef, we need to cast props to any
      {...(props as any)}
      render={({ handleSubmit, form }) => {
        if (ref) {
          (ref as any).current = form;
        }
        return <FormWrapper onSubmit={handleSubmit}>{children}</FormWrapper>;
      }}
    />
  );
});
