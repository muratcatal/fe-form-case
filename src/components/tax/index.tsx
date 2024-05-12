import { Autocomplete, Button, TextField } from "@mui/material";

import { useRef } from "react";
import { toast } from "react-hot-toast";
import { Form } from "../../core/form";
import { FormField } from "../../core/form/field";
import { useTaskSave } from "../../services/use-tax-save";
import { COUNTRIES } from "./constants/countries";
import { TaxInput } from "./tax-input";
import { validate } from "./validations";

export const Tax = () => {
  const { mutateAsync: saveTask } = useTaskSave();

  const formRef = useRef<any>(null);

  const onSubmit = async (values: any) => {
    try {
      await saveTask(values);
      formRef?.current?.reset();
      toast.success("Task saved successfully");
    } catch (error) {
      toast.error("An error occurred while saving the task");
    }
  };

  return (
    <Form ref={formRef} onSubmit={onSubmit} validate={validate}>
      <FormField
        label="Username"
        name="username"
        component={<TextField size="medium" placeholder="Your username" />}
      />

      <FormField
        label="Countries"
        name="country"
        isAutocomplete
        component={
          <Autocomplete
            disablePortal
            id="countries-autocomplete"
            options={COUNTRIES}
            getOptionLabel={(option) => {
              return option.name ?? "";
            }}
            getOptionKey={(option) => option.code}
            renderInput={(params) => (
              <TextField {...params} label="Choose your country" />
            )}
          />
        }
        placeholder="Countries"
      />

      <TaxInput />

      <Button type="submit" variant="contained">
        Save
      </Button>
    </Form>
  );
};
