import React, { ReactNode, SyntheticEvent, isValidElement } from "react";
import { Field } from "react-final-form";
import { FieldWrapper } from "./styled";

type FormFieldProps = {
  name: string;
  label: string;
  component: ReactNode;
  placeholder?: string;
  isAutocomplete?: boolean;
};

export const FormField = ({
  name,
  component,
  placeholder,
  label,
  isAutocomplete,
}: FormFieldProps) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => {
        return (
          <FieldWrapper>
            <label>{label}</label>
            {isValidElement(component) &&
              React.cloneElement(component, {
                ...input,
                onChange: isAutocomplete
                  ? (e: SyntheticEvent<Element, Event>, v: any) => {
                      input.onChange(v);
                    }
                  : (v: any) => input.onChange(v.target.value),
              } as any)}
            {meta.submitFailed && meta.error && (
              <span>
                {typeof meta.error === "string"
                  ? meta.error
                  : Object.keys(meta.error)
                      .map((key) => meta.error[key])
                      .join("\n")}
              </span>
            )}
          </FieldWrapper>
        );
      }}
      placeholder={placeholder}
    />
  );
};
