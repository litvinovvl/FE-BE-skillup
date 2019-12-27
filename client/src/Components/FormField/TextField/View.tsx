import React from "react";

import { TextField as MUITextField } from "@material-ui/core";
import { FieldProps } from "formik";

import { IAuthor, IGenre, ILabel } from "../../../types";

interface ITextFieldProps extends FieldProps {
  refetch: (fieldName: string, value: IAuthor | IGenre | ILabel | string) => void
}

const TextField: React.SFC<ITextFieldProps> = ({
  field: { value, ...field},
  form: { touched, errors, setFieldValue },
  refetch,
  ...props
}): JSX.Element => {
  const toShowError = touched[field.name];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFieldValue(field.name, event.target.value);
    refetch(field.name, event.target.value);
  }
  
  return (
    <MUITextField
      value={value || ""}
      margin="normal"
      error={Boolean(toShowError && errors[field.name])}
      helperText={toShowError ? errors[field.name] : undefined}
      fullWidth
      {...field}
      {...props}
      onChange={handleChange}
    />
  )
};

export default TextField;
