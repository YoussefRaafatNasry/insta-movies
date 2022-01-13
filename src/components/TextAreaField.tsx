import React from "react";

import { useField } from "formik";
import { FormControl, ITextAreaProps, TextArea } from "native-base";

interface ITextAreaFieldProps extends ITextAreaProps {
  name: string;
}

export const TextAreaField: React.FC<ITextAreaFieldProps> = (props) => {
  const [{ value }, { error }, { setValue }] = useField(props.name);

  return (
    <FormControl {...props} isInvalid={!!error}>
      <TextArea {...props} value={value} onChangeText={setValue} />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
