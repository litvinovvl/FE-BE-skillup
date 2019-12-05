import React from 'react';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default ({
  field: { value, ...field},
  form: { touched, errors, setFieldValue },
  displayedValue,
  refetch,
  ...props
}: any) => {
  const toShowError = touched[field.name];

  const handleChange = (event: any) => {
    setFieldValue(field.name, event.target.value);
    refetch(field.name, event.target.value);
  }
  
  return (
    <TextField
      value={displayedValue ? displayedValue(value) : value}
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
