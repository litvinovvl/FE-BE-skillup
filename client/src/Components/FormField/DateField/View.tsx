import React from "react";

import { DatePicker } from "@material-ui/pickers";
import { FieldProps } from "formik";

const DateField: React.SFC<FieldProps> = ({ field, form }): JSX.Element => {
  const setDate = (date: Date) => form.setFieldValue(field.name, date, true);

  return (
    <DatePicker
      {...field as any}
      format="DD MM YYYY"
      onChange={setDate}
      fullWidth
    />
  )
};

export default DateField;
