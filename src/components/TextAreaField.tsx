import React from "react";

import { useField } from "formik";
import { FormControl, ITextAreaProps, TextArea } from "native-base";

interface ITextAreaFieldProps extends ITextAreaProps {
  name: string;
}

export const TextAreaField: React.FC<ITextAreaFieldProps> = (props) => {
  const [field, { error, touched }, { setValue, setTouched }] = useField(props.name);

  return (
    <FormControl {...props} isInvalid={touched && !!error}>
      <TextArea
        {...props}
        value={field.value}
        onChangeText={setValue}
        onBlur={() => setTouched(true)}
      />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
