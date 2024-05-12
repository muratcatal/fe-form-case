import Input from "@mui/material/Input";
import React from "react";
import { IMaskInput } from "react-imask";

type Mask = {
  mask: string;
  definitions: Record<string, RegExp>;
};

type OnChange = (event: { target: { name: string; value: string } }) => void;

type CustomProps = {
  onChange: OnChange;
  name: string;
  mask?: Mask;
};

type MaskedInputProps = {
  name?: string;
  value?: string;
  onChange?: OnChange;
  disabled?: boolean;
  mask?: Mask & { example: string };
};

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, mask, ...other } = props;

    return (
      <IMaskInput
        {...other}
        {...mask}
        unmask={true}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export const MaskedInput = (props: MaskedInputProps) => {
  return (
    <Input
      {...props}
      disabled={props.disabled}
      inputComponent={TextMaskCustom as any}
      inputProps={{
        mask: props.mask,
      }}
      placeholder={props.mask?.example}
    />
  );
};
