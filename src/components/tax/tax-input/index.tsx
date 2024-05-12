import { useMemo } from "react";
import { useFormState } from "react-final-form";
import { FormField } from "../../../core/form/field";
import { MaskedInput } from "../../../core/inputs/masked-input";
import { TAX_EXPRESSION } from "../constants/tax-expression";

export const TaxInput = () => {
  const { values } = useFormState();

  const taxMaskValues = useMemo(() => {
    if (!values?.country?.code) return TAX_EXPRESSION.NO_EXPRESSION;

    return (
      (TAX_EXPRESSION as any)[values.country.code] ??
      TAX_EXPRESSION.NO_EXPRESSION
    );
  }, [values]);

  return (
    <FormField
      label="Tax"
      name="tax"
      component={
        <MaskedInput mask={taxMaskValues} disabled={!values?.country?.code} />
      }
    />
  );
};
