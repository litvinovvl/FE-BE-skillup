import React from 'react';

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default ({
  field: { value = "", ...field},
  form: { touched, errors, setFieldValue },
  displayedValue,
  ...props
}: any) => {
  const toShowError = touched[field.name];

  const handleFileChange = (event: any) => {
    setFieldValue(field.name, event.currentTarget!.files![0]);
  }

  return (
    <>
      <TextField
        value={value.name || ''}
        margin="normal"
        variant="filled"
        error={Boolean(toShowError && errors[field.name])}
        helperText={toShowError ? errors[field.name] : undefined}
        fullWidth
        {...field}
        {...props}
        type="text"
        disabled
      />
      <input
        {...field}
        {...props}
        onChange={handleFileChange}
        id={field.name}
        style={{ display: "none" }}
      />
      <label htmlFor={field.name}>
        <Button variant="contained" component="span">
          Add thumbnail image
        </Button>
      </label>
    </>
  )
};
