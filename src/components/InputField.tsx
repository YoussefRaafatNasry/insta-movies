import React from "react";

import { useField } from "formik";
import { FormControl, IInputProps, Input } from "native-base";

interface IInputFieldProps extends IInputProps {
  name: string;
}

export const InputField: React.FC<IInputFieldProps> = (props) => {
  const [field, { error, touched }, { setValue }] = useField(props.name);

  return (
    <FormControl {...props} isInvalid={touched && !!error}>
      <Input {...props} {...field} onChangeText={setValue} />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
