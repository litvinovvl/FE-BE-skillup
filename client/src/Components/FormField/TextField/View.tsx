import React from 'react';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default ({
  field: { value = "", ...field},
  form: { touched, errors },
  displayedValue,
  ...props
}: any) => {
  const toShowError = touched[field.name];
  
  return (
    <TextField
      value={displayedValue ? displayedValue(value) : value}
      margin="normal"
      error={Boolean(toShowError && errors[field.name])}
      helperText={toShowError ? errors[field.name] : undefined}
      fullWidth
      {...field}
      {...props}
    />
  )
};
