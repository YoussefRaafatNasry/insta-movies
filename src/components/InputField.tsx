import React from "react";

import { useField } from "formik";
import { FormControl, IInputProps, Input } from "native-base";

interface IInputFieldProps extends IInputProps {
  name: string;
}

export const InputField: React.FC<IInputFieldProps> = (props) => {
  const [field, { error, touched }, { setValue, setTouched }] = useField(props.name);

  return (
    <FormControl {...props} isInvalid={touched && !!error}>
      <Input
        {...props}
        value={field.value}
        onChangeText={setValue}
        onBlur={() => setTouched(true)}
      />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
