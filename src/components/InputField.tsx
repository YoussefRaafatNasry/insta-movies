import React from "react";

import { useField } from "formik";
import { FormControl, IInputProps, Input } from "native-base";

interface IInputFieldProps extends IInputProps {
  name: string;
}

export const InputField: React.FC<IInputFieldProps> = (props) => {
  const [{ value }, { error }, { setValue }] = useField(props.name);

  return (
    <FormControl {...props} isInvalid={!!error}>
      <Input {...props} value={value} onChangeText={setValue} />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
